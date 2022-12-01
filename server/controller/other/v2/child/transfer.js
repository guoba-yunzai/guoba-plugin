import fs from 'fs'
import path from 'path'
import lodash from 'lodash'
import moment from 'moment'
import child from 'child_process'
import {ACTION_CODE, checkJsCompatibility, examplePath, RES_SET} from './constant.js'
import YamlReader from '../../../../../components/YamlReader.js'
import {_paths, dateDiff, mkdirSync, sleep} from '../../../../../utils/common.js'
import {needPackage} from '../../../../../utils/adapter/check.js'
import {pluginName} from '../../../../../utils/package.js'

/*
 * 迁移子进程。
 * 使用子进程的优点在于父进程可直接kill掉子进程，
 * 实现随时停止迁移。
 */

const childIns = {}
let BotConfig = {}

// 执行redis操作
const RedisCaller = {}

if (typeof process.send === 'function') {
  process.send({type: 'mounted'})
  process.on('message', (e) => {
    if (e.type === 'start') {
      BotConfig = e.BotConfig
      doTransferV2(e.config).finally(selfExit)
    } else if (e.type === 'stop') {
      // kill所有子子进程
      for (let ins of Object.values(childIns)) if (ins?.kill) ins.kill()
      selfExit()
    } else if (e.type === 'redis-callback') {
      let caller = RedisCaller[e.id]
      if (caller?.callback) {
        caller.callback(e.data)
      }
    }
  })
}

async function doTransferV2(config) {
  let beginTime = moment()
  try {
    updatePercent(2)
    updateState(ACTION_CODE.ing)
    log('迁移已开始……')

    await doGitClone(config)
    updatePercent(20)

    await sleep(1000)
    await doMoveData(config)
    updatePercent(50)

    await sleep(1000)
    await doMovePlugin(config)
    updatePercent(70)

    await sleep(1000)
    await doMoveConfig(config)
    updatePercent(70)

    await sleep(1000)
    await doMoveRedis(config)
    updatePercent(80)

    await sleep(1000)
    await doTransferJs(config)
    updatePercent(90)

    await sleep(1000)
    let flag = await doInstallModules(config)
    if (!flag) {
      log('[重要提示] 迁移成功，但依赖安装失败，请自行排查问题并解决……')
      log('一但依赖问题解决，即可直接启动V3云崽。')
    } else {
      log('迁移成功，请先停止当前云崽，再去启动V3云崽！')
    }
    log('V3云崽安装目录：' + path.join(config.installPath))

    // done
    updateState(ACTION_CODE.success)
    updatePercent(100)
    return true
  } catch (e) {
    if (e !== ACTION_CODE.fail) {
      log('[error]' + (e.message || e))
    }
    updateState(ACTION_CODE.fail)
  } finally {
    let endTime = moment()
    let diffs = dateDiff(beginTime, endTime)
    let timeTip = ''
    if (diffs.days) timeTip += diffs.days + '天'
    if (diffs.hours) timeTip += diffs.hours + '小时'
    if (diffs.minutes) timeTip += diffs.minutes + '分钟'
    timeTip += diffs.seconds + '秒'
    setTimeout(() => log('迁移已结束，耗时：' + timeTip), 2)
  }
  return false
}

// 克隆Git仓库
function doGitClone({installMode, gitAddress, installPath}) {
  if (installMode !== 'new') {
    log('使用现有V3目录：' + installPath)
    log('注：如选择的目录并非V3目录，则有可能会报错！')
    return Promise.resolve()
  }
  // 全新下载Yunzai-Bot项目
  return new Promise((resolve, reject) => {
    let repoURL = RES_SET.git[gitAddress]
    if (!repoURL) {
      return reject('gitAddress error')
    }
    log(`正在通过${gitAddress}克隆仓库……`)
    mkdirSync(installPath)
    let cmd = `git clone --depth=1 -b main ${repoURL} "${installPath}"`
    childIns.git = child.exec(cmd, {}, (error, stdout, stderr) => {
      if (error) {
        let tip = '仓库克隆失败，'
        if (/unable to access/.test(error.message)) {
          tip += '可能是因为网络不通畅的原因。'
          if (gitAddress === 'github') {
            setTimeout(() => log('若github多次失败，建议改用gitee'), 1)
          }
        } else if (/already exists and is not an empty directory/.test(error.message)) {
          tip += '选择的目录不是空的'
        } else {
          tip = '未知原因！\n' + error.message
        }
        log(tip, true)
        reject(ACTION_CODE.fail)
      } else {
        log('仓库克隆成功！')
        resolve(ACTION_CODE.success)
      }
    })
  })
}

const dirMapping = {
  // 用户cookie
  userCookie: [
    // v2 path
    path.join('data/NoteCookie'),
    // v3 path
    path.join('data/NoteCookie'),
  ],
  // 用户抽卡数据
  userGacha: [
    path.join('data/html/genshin/gachaJson'),
    path.join('data/gachaJson'),
  ],
  // 用户札记数据
  userNote: [
    path.join('data/NoteData'),
    path.join('data/NoteData'),
  ],
  // 添加的表情
  groupFace: [
    path.join('data/face'),
    path.join('data/face'),
  ],
  groupTextJson: [
    path.join('data/textJson'),
    path.join('data/textJson'),
    // link key
    'groupFace'
  ],
  // 喵喵用户数据
  miao_userData: [
    path.join('data/UserData'),
    path.join('data/UserData'),
  ],
  // 成就用户数据
  ach_userData: [
    path.join('data/achievements-plugin'),
    path.join('data/achievements-plugin'),
  ],
}

// 移动data文件夹
async function doMoveData(config) {
  let {mode, installPath, rubbishClean} = config
  let v3Path = path.join(installPath)
  mkdirSync(v3Path)
  if (mode === 'full') {
    log('开始全量迁移“data”文件夹操作')
  } else {
    log('正在部分迁移“data”文件夹')
  }
  if (rubbishClean) {
    await sleep(1000)
    log('已开启清理垃圾文件')
  }
  await recursiveDir(['data'], ({dirPaths, filePath, fileName}) => {
    if (rubbishClean && !filterJunkFiles(filePath)) {
      return
    }
    try {
      let toPath = path.join(v3Path, ...dirPaths, fileName)
      let fined = false, currKey = ''
      // 特殊处理变更的目录
      for (const [key, mapping] of Object.entries(dirMapping)) {
        let [v2Map, v3Map] = mapping
        if (toPath.includes(v2Map)) {
          currKey = key
          fined = true
          if (v2Map !== v3Map) {
            toPath = toPath.replace(v2Map, v3Map)
          }
          break
        }
      }
      // 非全量迁移模式下，仅迁移指定的目录
      if (mode !== 'full') {
        // 如果是qq文件夹，则无论如何都复制过去
        if (!new RegExp(`data\\${path.sep}[1-9]\\d{4,9}\\${path.sep}`).test(filePath)) {
          if (!fined) {
            return
          }
          let mapping = dirMapping[currKey]
          if (!mapping) {
            return
          }
          if (mapping[2]) {
            currKey = mapping[2]
          }
          if (!config[currKey]) {
            return
          }
        }
      }
      mkdirSync(path.dirname(toPath))
      fs.copyFileSync(filePath, toPath)
    } catch (e) {
      log('复制 ' + filePath + '失败：' + (e.message || e))
    }
  })
}

// 迁移 plugins
async function doMovePlugin({installPath}) {
  log('开始迁移 plugins')
  let v2Path = path.join(_paths.root, 'plugins')
  let v3Path = path.join(installPath, 'plugins')
  let items = fs.readdirSync(v2Path)
  for (const item of items) {
    if (['games-template-plugin-zolay'].includes(item)) {
      continue
    }
    let itemPath = path.join(v2Path, item)
    let stat = fs.statSync(itemPath)
    if (stat.isDirectory()) {
      log('正在迁移' + item)
      let toPath = path.join(v3Path, item)
      fs.cpSync(itemPath, toPath, {recursive: true})
      await sleep(1000)
    }
  }
}

// 迁移配置文件
async function doMoveConfig(config) {
  /** @return YamlReader */
  const gcr = (k) => getConfigRender(k, config)

  let cfg, temp, blackGroup = []

  for (let [gid, groupCfg] of Object.entries(BotConfig.group)) {
    if (/^\d+$/.test(gid)) {
      let disable = groupCfg.disable
      if (Array.isArray(disable) && disable.includes('all')) {
        blackGroup.push(Number(gid))
      }
    }
  }

  // 基础配置，包括：主人QQ号、自动同意加好友、自动退小群、Cookie文档地址、使用用户Cookie、黑名单QQ号
  if (config.cfg_basic) {
    log('正在迁移基础配置')
    // qq
    cfg = gcr('qq')
    cfg.set('qq', Number(BotConfig.account.qq))
    if (BotConfig.account.pwd) {
      cfg.set('pwd', BotConfig.account.pwd)
    }
    cfg.set('platform', Number(BotConfig.account.platform))
    cfg.save()
    // bot
    cfg = gcr('bot')
    cfg.set('log_level', BotConfig.account.log_level)
    if (BotConfig.puppeteer?.executablePath) {
      cfg.set('chromium_path', BotConfig.puppeteer?.executablePath)
    }
    cfg.save()
    // other
    cfg = gcr('other')
    cfg.set('autoFriend', Number(BotConfig.account.autoFriend))
    if (Array.isArray(BotConfig.masterQQ) && BotConfig.masterQQ.length) {
      cfg.set('masterQQ', BotConfig.masterQQ)
    }
    cfg.set('disablePrivate', BotConfig.disablePrivate)
    if (BotConfig.disableMsg) {
      cfg.set('disableMsg', BotConfig.disableMsg)
    }
    if (Array.isArray(BotConfig.balckQQ) && BotConfig.balckQQ.length) {
      cfg.set('blackQQ', BotConfig.balckQQ)
    }
    if (blackGroup.length) {
      cfg.set('blackGroup', blackGroup)
    }
    cfg.save()
    // redis
    cfg = gcr('redis')
    cfg.setData(BotConfig.redis)
    cfg.save()
    // mysSet
    cfg = gcr('redis')
    cfg.set('allowUseCookie', BotConfig.allowUseNoteCookie ? 1 : 0)
    if (BotConfig.cookieDoc) {
      cfg.set('cookieDoc', BotConfig.cookieDoc)
    }
    cfg.save()
  }
  await sleep(1000)
  // mysPubCk
  if (config.commonCookie) {
    log('正在迁移公共Cookie')
    cfg = gcr('mysPubCk')
    temp = cfg.jsonData
    if (!Array.isArray(temp)) {
      temp = [temp]
    }
    cfg.setData([
      ...temp,
      ...(Array.isArray(BotConfig.mysCookies) ? BotConfig.mysCookies : [])
    ])
    cfg.save()
  }
  await sleep(1000)
  // 配置：公告推送
  if (config.cfg_pushNews) {
    let pushNewsPath = path.join(_paths.data, 'PushNews/PushNews.json')
    if (fs.existsSync(pushNewsPath)) {
      log('正在迁移米游社新闻推送群聊配置')
      cfg = gcr('pushNews')
      let pushNews = JSON.parse(fs.readFileSync(pushNewsPath, 'utf8'))
      let gList = []
      for (let [gid, newCfg] of Object.entries(pushNews)) {
        if (newCfg?.isNewsPush) {
          gList.push(Number(gid))
        }
      }
      if (gList.length) {
        cfg.set('announceGroup', gList)
        cfg.set('infoGroup', gList)
        cfg.save()
      }
    }
  }
  await sleep(1000)
  // 迁移群默认配置
  if (config.cfg_groupDefault) {
    log('正在迁移群聊默认配置')
    // group
    cfg = gcr('group')
    temp = BotConfig.group.default
    let defGroup = {
      default: {
        groupCD: temp.groupCD,
        singleCD: temp.singleCD,
        onlyReplyAt: temp.onlyReplyAt,
        botAlias: Array.isArray(temp.botAlias) ? temp.botAlias : !!temp.botAlias ? [temp.botAlias] : [],
        imgAddLimit: temp.imgAddLimit,
        imgMaxSize: temp.imgMaxSize,
      }
    }
    cfg.setData(defGroup)
    cfg.save()
  }
  await sleep(1000)
  // 迁移群单独配置
  if (config.cfg_group) {
    log('正在迁移群单独配置')
    cfg = gcr('group')
    temp = {}
    for (let [gid, groupCfg] of Object.entries(BotConfig.group)) {
      if (/^\d+$/.test(gid)) {
        gid = Number(gid)
        let tempCfg = {}
        if (groupCfg.groupCD) {
          tempCfg.groupCD = groupCfg.groupCD
        }
        if (groupCfg.singleCD) {
          tempCfg.singleCD = groupCfg.singleCD
        }
        if (groupCfg.onlyReplyAt) {
          tempCfg.onlyReplyAt = groupCfg.onlyReplyAt
        }
        if (groupCfg.botAlias) {
          tempCfg.botAlias = Array.isArray(groupCfg.botAlias) ? groupCfg.botAlias : [groupCfg.botAlias]
        }
        if (groupCfg.imgAddLimit) {
          tempCfg.imgAddLimit = groupCfg.imgAddLimit
        }
        if (groupCfg.imgMaxSize) {
          tempCfg.imgMaxSize = groupCfg.imgMaxSize
        }
        temp[gid] = tempCfg
      }
    }
    cfg.setData(temp)
    cfg.save()
  }
}

const configFileMapping = {
  bot: [
    path.join('/config/config/bot.yaml'),
    path.join('/config/default_config/bot.yaml'),
  ],
  qq: [
    path.join('/config/config/qq.yaml'),
    path.join('/config/default_config/qq.yaml'),
  ],
  group: [
    path.join('/config/config/group.yaml'),
    path.join('/config/default_config/group.yaml'),
  ],
  redis: [
    path.join('/config/config/redis.yaml'),
    path.join('/config/default_config/redis.yaml'),
  ],
  other: [
    path.join('/config/config/other.yaml'),
    path.join('/config/default_config/other.yaml'),
  ],
  mysSet: [
    path.join('/plugins/genshin/config/mys.set.yaml'),
    path.join('/plugins/genshin/defSet/mys/set.yaml'),
  ],
  mysPubCk: [
    path.join('/plugins/genshin/config/mys.pubCk.yaml'),
    path.join('/plugins/genshin/defSet/mys/pubCk.yaml'),
  ],
  pushNews: [
    path.join('/plugins/genshin/config/mys.pushNews.yaml'),
    path.join('/plugins/genshin/defSet/mys/pushNews.yaml'),
  ],
}

const configRenders = {}

function getConfigRender(key, {installPath}) {
  let render = configRenders[key]
  if (!render) {
    let [configPath, defaultPath] = configFileMapping[key]
    configPath = path.join(installPath, configPath)
    if (!fs.existsSync(configPath)) {
      defaultPath = path.join(installPath, defaultPath)
      mkdirSync(path.dirname(configPath))
      fs.copyFileSync(defaultPath, configPath)
    }
    render = new YamlReader(configPath, false)
    configRenders[key] = render
  }
  return render
}

// 迁移Redis
async function doMoveRedis({groupBind, redisClean}) {
  if (groupBind) {
    log('正在迁移redis')
    await sleep(1000)
    let keys = await execRedis('keys', 'Yunzai:group_id:*')
    if (Array.isArray(keys) && keys.length > 0) {
      for (let key of keys) {
        let value = await execRedis('get', key)
        let newKey = key.replace('Yunzai:', 'Yz:')
        await execRedis('setEx', newKey, 3600 * 24 * 30, value)
      }
      log('redis迁移完成')
    } else {
      log('redis无需迁移')
    }
    await sleep(1000)
  }
  if (redisClean) {
    log('正在清理redis')
    let cleanKeys = ['Yunzai:*', 'genshin:*']
    for (let cleanKey of cleanKeys) {
      let keys = await execRedis('keys', cleanKey)
      log(`正在清理: ${cleanKey}，共有${keys.length}受影响的key`)
      for (let key of keys) {
        await execRedis('del', key)
      }
      await sleep(1000)
    }
  }
}

// 迁移JS插件
async function doTransferJs({transferJsMode, installPath}) {
  if (transferJsMode !== 'none') {
    log(`正在迁移JS单文件插件`)
    let passed = null
    if (transferJsMode !== 'force') {
      let res = parseCheckRes(checkJsCompatibility(examplePath))
      log(res.text)
      if (res.total === 0) {
        return
      }
      passed = res.passed
    } else {
      log(`未启用兼容性检测，将会迁移所有插件`)
    }
    await sleep(1000)
    let i = 0
    if (fs.existsSync(examplePath)) {
      let toPath = path.join(installPath, 'plugins', pluginName, 'lib/v2-js')
      let fileList = fs.readdirSync(examplePath)
        .filter(i => path.extname(i) === '.js')
        .map((fileName) => ({filePath: path.join(examplePath, fileName), fileName}))
      for (let {fileName, filePath} of fileList) {
        if (passed != null) {
          if (passed.find((i) => i.file === fileName) == null) {
            continue
          }
        }
        i++
        fs.copyFileSync(filePath, path.join(toPath, fileName))
      }
    }
    log(`共迁移了${i}个JS单文件插件`)
  }
}

function parseCheckRes({passed, noPass}) {
  passed = Array.isArray(passed) ? passed : []
  noPass = Array.isArray(noPass) ? noPass : []
  let total = passed.length + noPass.length
  let text = '未检测到JS插件'
  if (total !== 0) {
    text = `检测到 ${total} 个JS插件，`
    if (noPass.length === 0) {
      text += `全部可以迁移。`
    } else if (passed.length === 0) {
      text += `全部不兼容。`
    } else {
      text += `其中 ${noPass.length} 个不兼容， ${passed.length} 个可以迁移。`
    }
  }
  return {total, passed, noPass, text}
}

const tbMirror = 'https://registry.npmmirror.com'
const npmTools = {
  npm: {
    install: 'npm install',
    add: 'npm install $pkg',
  },
  pnpm: {
    install: 'pnpm install',
    add: 'pnpm add $pkg -w',
    registry: 'pnpm config set registry ' + tbMirror
  },
  yarn: {
    install: 'yarn install',
    add: 'yarn add $pkg',
    registry: 'yarn config set registry ' + tbMirror
  },
  cnpm: {
    install: 'cnpm install',
    add: 'cnpm install $pkg',
  }
}

async function doInstallModules({moduleTool, installPath}) {
  let tool = npmTools[moduleTool]
  if (!tool) {
    log(`不支持的npm包管理工具：${moduleTool}`)
    return false
  }
  log(`正在尝试通过 ${moduleTool} 安装依赖`)
  let check = autoInstallNpm(moduleTool)
  if (!check) {
    return false
  }
  const execTo = (cmd) => new Promise((resolve) => {
    childIns.npm = child.exec(cmd, {windowsHide: true, cwd: installPath}, (error) => {
      resolve(error == null)
    })
  })
  // 安装依赖
  let flag = await execTo(tool.install)
  if (!flag) return false
  log(`依赖安装成功！`)
  await sleep(1000)
  // 非pnpm，需要单独安装锅巴的依赖
  if (moduleTool !== 'pnpm') {
    log(`正在安装 Guoba-Plugin 所需依赖`)
    flag = await execTo(tool.add.replace('$pkg', needPackage.join(' ')))
    if (!flag) return false
    log(`Guoba-Plugin 依赖安装成功！`)
    await sleep(1000)
  }
  log(`正在安装 miao-plugin 所需依赖`)
  flag = await execTo(tool.add.replace('$pkg', 'image-size'))
  if (!flag) return false
  log(`miao-plugin 依赖安装成功！`)
  return true
}

/** 检查并按照包管理工具 */
function autoInstallNpm(tool) {
  let v = npmVersion(tool)
  if (v == null) {
    log(`检测到 ${tool} 未安装，正在尝试安装……`)
    installNpmTool(tool)
    v = npmVersion(tool)
    if (v == null) {
      log(`${tool} 未安装或安装失败……`)
    } else {
      log(`${tool} 安装成功，版本：${v}`)
      let registry = npmTools[tool].registry
      if (registry) {
        child.execSync(registry)
        log(`已将 ${tool} 设为国内淘宝镜像`)
      }
    }
  } else {
    log(`检测到 ${tool} 已安装，当前版本：` + v)
  }
  return v != null
}

// 递归遍历目录
async function recursiveDir(dirPaths = [], cb, level = 0) {
  let dirPath = path.join(_paths.root, ...dirPaths)
  if (level <= 1) {
    log('正在迁移目录：' + dirPath)
    await sleep(500)
  }
  let items = fs.readdirSync(dirPath)
  for (let item of items) {
    let itemPath = path.join(dirPath, item)
    let stat = fs.statSync(itemPath)
    if (stat.isDirectory()) {
      await recursiveDir(dirPaths.concat(item), cb, level + 1)
    } else {
      cb({fileName: item, filePath: itemPath, stat, dirPaths})
    }
  }
}

// 过滤垃圾文件
function filterJunkFiles(filePath) {
  let extname = path.extname(filePath)
  if (extname === '.html') {
    return false
  } else if (extname === '.htm') {
    return false
  }
  return true
}

function log(t, reason = false) {
  process.send({type: 'log', text: t, reason})
}

function updateState(state) {
  process.send({type: 'state', state})
}

function updatePercent(percent) {
  process.send({type: 'percent', percent})
}

function selfExit() {
  setTimeout(() => process.exit(), 100)
}

async function execRedis(fn, ...args) {
  return new Promise(resolve => {
    let id = lodash.uniqueId('guoba-transfer-redis-')
    RedisCaller[id] = {
      callback: (ret) => resolve(ret)
    }
    process.send({type: 'redis-execute', id, fn, args})
  })
}

/** 获取包管理工具的版本号 */
function npmVersion(tool = 'npm') {
  try {
    let res = child.execSync(`${tool} -v`, {encoding: 'utf-8', windowsHide: true})
    if (/\d{1,2}\.\d{1,2}(\.\d{1,2})?/) {
      if (tool === 'cnpm') {
        res = res.match(/cnpm@(\d{1,2}\.\d{1,2}(\.\d{1,2})?)/)[1]
      }
      return res.trim()
    }
    return null
  } catch (e) {
    return null
  }
}

/** 安装包管理工具 */
function installNpmTool(tool) {
  let registry = 'https://registry.npmmirror.com'
  let cmd = `npm install ${tool} -g --registry=${registry}`
  return child.execSync(cmd, {encoding: 'utf-8', windowsHide: true})
}

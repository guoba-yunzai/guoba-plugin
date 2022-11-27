import fs from 'fs'
import path from 'path'
import moment from 'moment'
import child from 'child_process'
import {ACTION_CODE, RES_SET} from './constant.js'
import YamlReader from '../../../../../components/YamlReader.js'
import {_paths, dateDiff, mkdirSync, sleep} from '../../../../../utils/common.js'

/*
 * 迁移子进程。
 * 使用子进程的优点在于父进程可直接kill掉子进程，
 * 实现随时停止迁移。
 */

const childIns = {}
let BotConfig = {}

if (typeof process.send === 'function') {
  process.send({type: 'mounted'})
  process.on('message', (e) => {
    if (e.type === 'start') {
      BotConfig = e.BotConfig
      doTransferV2(e.config).finally(selfKill)
    } else if (e.type === 'stop') {
      // kill所有子子进程
      for (let ins of Object.values(childIns)) if (ins?.kill) ins.kill()
      selfKill()
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
    updatePercent(80)

    // TODO 迁移JS插件
    // TODO 安装依赖

    await sleep(1500)
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
function doMovePlugin({installPath}) {
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
    }
  }
}

// 迁移配置文件
function doMoveConfig(config) {
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
    // mysPubCk
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
    path.join('/plugins/genshin/config/mys/set.yaml'),
  ],
  mysPubCk: [
    path.join('/plugins/genshin/config/mys.pubCk.yaml'),
    path.join('/plugins/genshin/config/mys/pubCk.yaml'),
  ],
  pushNews: [
    path.join('/plugins/genshin/config/mys.pushNews.yaml'),
    path.join('/plugins/genshin/config/mys/pushNews.yaml'),
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

function selfKill() {
  setTimeout(() => process.kill(0), 100)
}

import os from 'os'
import fs from 'fs'
import path from 'path'
import lodash from 'lodash'
import fetch from 'node-fetch'

const Service = await Guoba.GID('#/components/Service.js')
const Constant = await Guoba.GID('#/constant/Constant.js')
const {GuobaSupportMap, PluginsMap} = await Guoba.GI('@/utils/common.js')

export default class IPluginService extends Service {
  constructor(app) {
    super(app)
    // 获取插件列表，填充GuobaSupportMap
    this.loadPlugining = this.getPlugins()
  }

  /**
   * 获取所有插件
   * @param force 是否清空缓存强制刷新
   * @return {Promise<*>}
   */
  async getPlugins(force = false) {
    let remotePlugins = await this.getRemotePlugins(force)
    let localPlugins = await this.readLocalPlugins(this.pluginsPath)
    for (let rp of remotePlugins) {
      let idx = localPlugins.findIndex(({name}) => lodash.toLower(name) === lodash.toLower(rp.name))
      if (idx > -1) {
        let lp = localPlugins[idx]
        Object.assign(rp, lp, {installed: true})
        localPlugins.splice(idx, 1)
      }
    }
    if (localPlugins.length > 0) {
      for (let plugin of localPlugins) {
        remotePlugins.push({
          isV2: false, isV3: false, isDeleted: false,
          title: plugin.name, name: plugin.name,
          link: '', author: '未知', authorLink: '', description: '',
          installed: true, ...plugin,
        })
      }
    }
    // 处理config等信息
    for (let plugin of remotePlugins) {
      // 判断是否配置了 iconPath
      if (plugin.iconPath) {
        plugin.iconPath = `/api/plugin/s/${plugin.name}/icon`
      }
      // 判断是否支持guoba
      let supportObject = GuobaSupportMap.get(plugin.name)
      if (!supportObject) {
        continue
      }
      // 判断是否支持配置项
      let {configInfo} = supportObject
      if (configInfo && configInfo.schemas && typeof configInfo.getConfigData === 'function') {
        plugin.hasConfig = true
        plugin.schemas = configInfo.schemas
      }
    }
    // 已安装的插件，排在前面
    return remotePlugins.sort((a, b) => {
      if (a.installed && !b.installed) {
        return -1
      }
      if (!a.installed && b.installed) {
        return 1
      }
      return 0
    })
  }

  /**
   * 读取本地插件信息
   * @param pluginsPath
   * @return {object[]}
   */
  async readLocalPlugins(pluginsPath) {
    let files = fs.readdirSync(pluginsPath)
    let plugins = []
    for (let name of files) {
      if (this.exclude && this.exclude.includes(name)) {
        continue
      }
      let filePath = path.join(pluginsPath, name)
      let stat = fs.statSync(filePath)
      if (stat.isDirectory()) {
        let jsPath = path.join(filePath, 'index.js')
        if (fs.existsSync(jsPath) || fs.existsSync(path.join(filePath, '.git/'))) {
          let plugin = {
            name: name.toLowerCase(),
          }
          jsPath = path.join(filePath, 'guoba.support.js')
          // 判断是否支持锅巴
          if (fs.existsSync(jsPath)) {
            try {
              // 判断是否是windows系统
              if (os.platform() === 'win32') {
                jsPath = 'file:///' + jsPath
              }
              let {supportGuoba} = await import(jsPath)
              if (typeof supportGuoba === 'function') {
                // TODO 传什么参数？待定
                let supportObject = supportGuoba()
                if (supportObject.pluginInfo) {
                  plugin = Object.assign(plugin, supportObject.pluginInfo)
                }
                // 注册进锅巴
                GuobaSupportMap.set(plugin.name, supportObject)
              } else {
                throw 'supportGuoba必须要定义成一个方法！'
              }
            } catch (e) {
              logger.error(`[Guoba] 载入guoba.support.js失败：` + (e.message || e))
            }
          }
          PluginsMap.set(plugin.name, plugin)
          plugins.push(plugin)
        }
      }
    }
    return plugins
  }

  /**
   * 获取远程插件列表
   * @param force 是否清空缓存强制刷新
   * @return {Promise<*>}
   */
  async getRemotePlugins(force = false) {
    let redisKey = Constant.REDIS_PREFIX + 'plugins'
    let remotePlugins = null
    if (!force) {
      remotePlugins = await redis.get(redisKey)
    }
    if (remotePlugins) {
      return JSON.parse(remotePlugins)
    }
    try {
      const remotesMap = await parsePluginsIndex()
      if (!remotesMap) {
        return []
      }
      const {topPlugins = [], plugins = [], gamePlugins = []} = remotesMap;
      remotePlugins = [...topPlugins, ...plugins, ...gamePlugins]
    } catch (e) {
      logger.error(e)
    }
    // 读取失败……
    if (!remotePlugins || remotePlugins.length === 0) {
      return []
    }
    redis.set(redisKey, JSON.stringify(remotePlugins), {EX: 3600 * 12})
    return remotePlugins
  }

  async getReadmeText(link, force = false) {
    let redisKey = Constant.REDIS_PREFIX + 'plugin:readme:' + link
    let text = null
    if (!force) {
      text = await redis.get(redisKey)
    }
    if (text) {
      return text
    }
    let arr = link.split('/')
    let name = (arr.pop() || '').trim().replace(/\.git$/, '')
    let author = arr.pop()
    let url = ''
    if (/github\.com/i.test(link)) {
      url = `https://raw.githubusercontent.com/${author}/${name}/{branch}`
    } else if (/gitee\.com/i.test(link)) {
      url = `https://gitee.com/${author}/${name}/raw/{branch}`
    }
    if (url) {
      let baseUrl = ''
      let branches = ['master', 'main']
      for (let branch of branches) {
        baseUrl = url.replace('{branch}', branch)
        let response = await fetch(`${baseUrl}/README.md`)
        if (response.status === 200) {
          text = await response.text()
          break
        }
      }
      if (text) {
        text = parseReadmeLink(text, baseUrl)
        redis.set(redisKey, text, {EX: 3600 * 12})
        return text
      }
    }
    return ''
  }

}

const parseConfig = {
  topPlugins: {
    identifyReg: /##\s*置顶(（plugin）)?.*/,
    beginReg: /(\|\s*-{3,}\s*){5}\|/,
    itemReg: /\|(.*)\|(.*)\|(.*)\|(.*)\|(.*)\|/,
    linkReg: /\[(.*)]\((.*)\)/,
  },
  plugins: {
    identifyReg: /##\s*功能插件(（plugin）)?.*/,
    beginReg: /(\|\s*-{3,}\s*){5}\|/,
    itemReg: /\|(.*)\|(.*)\|(.*)\|(.*)\|(.*)\|/,
    linkReg: /\[(.*)]\((.*)\)/,
  },
  gamePlugins: {
    identifyReg: /##\s*游戏插件(（plugin）)?.*/,
    beginReg: /(\|\s*-{3,}\s*){5}\|/,
    itemReg: /\|(.*)\|(.*)\|(.*)\|(.*)\|(.*)\|/,
    linkReg: /\[(.*)]\((.*)\)/,
  },
}

/**
 * 解析远程插件列表
 */
async function parsePluginsIndex() {
  let urls = [
    // gitee 主地址
    'https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index/raw/main/README.md',
    // github 备用地址
    'https://raw.githubusercontent.com/yhArcadia/Yunzai-Bot-plugins-index/main/README.md',
    // oss 备用地址（不定时同步）
    'https://zolay.oss-cn-beijing.aliyuncs.com/github/yhArcadia/Yunzai-Bot-plugins-index/README.md',
  ]
  let response, text
  for (let i = 0; i < urls.length; i++) {
    let url = urls[i]
    try {
      response = await fetch(url)
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      text = await response.text()
      if (/The\scontent\smay\scontain\sviolation\sinformation/i.test(text)) {
        throw new Error('内容违规')
      }
      if (i > 0) {
        logger.info('[Guoba] 通过备用地址获取插件列表成功~')
      }
      break
    } catch (e) {
      // 获取失败
      if (i === 0) {
        logger.warn(`[Guoba] 远程插件列表获取失败（${e.message}），尝试使用第${i + 1}个备用地址获取……`)
      } else if (i === url.length - 1) {
        logger.error(`[Guoba] 远程插件列表获取失败，所有备用地址均已失效……`)
        return {}
      } else {
        logger.warn(`[Guoba] 第${i}个备用地址获取失败（${e.message}），尝试使用第${i + 1}个备用地址获取……`)
      }
    }
  }
  let lines = text.split(/\n/)
  let parseState = {current: '', idx: 0}
  let parseResult = {}
  let parseEntries = Object.entries(parseConfig)
  for (let line of lines) {
    for (const [parseKey, parseItem] of parseEntries) {
      let result = parseResult[parseKey]
      if (parseState.current === parseKey) {
        if (result) {
          // 忽略空行，不认为是结束
          if (!line.trim().length) {
            continue
          }
          if (parseItem.itemReg.test(line)) {
            // 解析5列
            let [, col1, col2, col3, col4, col5] = line.match(parseItem.itemReg)
            // 解析插件标题和插件链接
            let title = col1.trim(), link = null
            if (parseItem.linkReg.test(title)) {
              let nameMatch = col1.match(parseItem.linkReg)
              title = nameMatch[1]
              link = nameMatch[2]
            }
            // 解析插件真实名称（放在plugins目录下的目录名）
            let name = null
            if (link) {
              name = link.split('/').filter(i => i != null && i !== '').pop().trim()
              name = name.replace(/\.git$/, '')
            }
            // // 如果不包含插件名称，则认为是无效的插件，直接跳过
            // if (!name) {
            //   continue
            // }
            // 解析插件作者和插件作者链接
            let author = col2, authorLink = null
            if (parseItem.linkReg.test(author)) {
              // 作者可能有多个 multi
              let multiReg = /\[([^\]]+)]\(([^)]+)\)/g
              let authorList = col2.match(multiReg)
              author = []
              authorLink = []
              for (let authorItem of authorList) {
                let match = authorItem.match(parseItem.linkReg)
                let temp = match[1] ? match[1].trim() : ''
                if (temp) {
                  author.push(temp)
                  authorLink.push(match[2] ? match[2].trim() : '')
                }
              }
              if (author.length === 0) {
                author = '佚名'
              }
            }
            // 判断云崽版本兼容情况
            let supportReg = /[✔√]/
            let isV2 = supportReg.test(col3)
            let isV3 = supportReg.test(col4)
            // 判断是否是已删除的插件
            title = title ? title.trim() : '未知'
            let deletedReg = /^~~(.+)~~$/
            let isDeleted = deletedReg.test(title)
            title = title.replace(deletedReg, '$1')
            result.push({
              isV2, isV3, title, isDeleted,
              name: (name ? name.trim() : '').toLowerCase(),
              link: link ? link.trim() : '',
              author: author,
              authorLink: authorLink,
              description: col5 ? col5.trim() : null,
            })
          } else {
            // 如果匹配失败，则认为是结束
            parseState.idx++
            parseState.current = ''
          }
        } else if (parseItem.beginReg.test(line)) {
          // 开始解析
          parseResult[parseKey] = []
        }
      } else if (parseItem.identifyReg.test(line)) {
        // 标识匹配成功，开始进入内容解析
        parseState.current = parseKey
      }
    }
    // 解析完成
    if (parseState.idx === parseEntries.length) {
      break
    }
  }
  return parseResult
}

/**
 * 解析readme里的链接，如果是相对地址，就替换成绝对地址
 */
function parseReadmeLink(text, baseUrl) {
  let linkReg = /\[.*]\((.*)\)/g
  let imgReg = /<img.*src="([^"]*)".*>/g
  let checkUrl = (url) => {
    // 因为gitee的防盗链机制，所以只有gitee的链接才需要替换
    if (/gitee\.com/i.test(url)) {
      return /\.(png|jpeg|jpg|gif|bmp|svg|ico|icon|webp|webm|mp4)$/i.test(url)
    }
    return false
  }
  let fn = ($0, $1) => {
    let url = ''
    if (checkUrl($1)) {
      url = `/api/helper/transit?url=${encodeURIComponent($1)}`
      return $0.replace($1, url)
    }
    if (/^https?/i.test($1)) {
      return $0
    }
    url = `${baseUrl}/${$1.replace(/^\//, '')}`
    if (checkUrl(url)) {
      url = `/api/helper/transit?url=${encodeURIComponent(url)}`
    }
    return $0.replace($1, url)
  }
  text = text.replace(linkReg, fn)
  return text.replace(imgReg, fn)
}

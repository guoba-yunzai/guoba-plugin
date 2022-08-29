import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

const Service = await Guoba.GID('#/components/Service.js')
const Constant = await Guoba.GID('#/constant/Constant.js')

export default class IPluginService extends Service {
  constructor(app) {
    super(app)
  }

  /**
   * 获取所有插件
   * @param force 是否清空缓存强制刷新
   * @return {Promise<*>}
   */
  async getPlugins(force = false) {
    let remotePlugins = await this.getRemotePlugins(force)
    let localPlugins = this.readLocalPlugins(this.pluginsPath)
    for (let rp of remotePlugins) {
      if (localPlugins.includes(rp.name.toLowerCase())) {
        rp.installed = true
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
   * @param callback
   */
  readLocalPlugins(pluginsPath, callback) {
    let files = fs.readdirSync(pluginsPath)
    let plugins = []
    for (let file of files) {
      if (this.exclude && this.exclude.includes(file)) {
        continue
      }
      let filePath = path.join(pluginsPath, file)
      let stat = fs.statSync(filePath)
      if (stat.isDirectory()) {
        let indexPath = path.join(filePath, 'index.js')
        if (fs.existsSync(indexPath)) {
          plugins.push(file.toLowerCase())
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
    remotePlugins = (await parsePluginsIndex()).plugins
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
  plugins: {
    identifyReg: /##\s*插件包.*/,
    beginReg: /\|\s*-{3,}\s*\|\s*-{3,}\s*\|\s*-{3,}\s*\|/,
    itemReg: /\|(.*)\|(.*)\|(.*)\|/,
    linkReg: /\[(.*)]\((.*)\)/,
  },
}

/**
 * 解析远程插件列表
 */
async function parsePluginsIndex() {
  let url = 'https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index/raw/main/README.md'
  let response = await fetch(url)
  let lines = (await response.text()).split(/\n/)

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
            // 解析三列
            let [, col1, col2, col3] = line.match(parseItem.itemReg)
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
              name = (link.split('/').pop() || '').trim().replace(/\.git$/, '')
            }
            // // 如果不包含插件名称，则认为是无效的插件，直接跳过
            // if (!name) {
            //   continue
            // }
            // 解析插件作者和插件作者链接
            let author = col2, authorLink = null
            if (parseItem.linkReg.test(author)) {
              let authorMatch = col2.match(parseItem.linkReg)
              author = authorMatch[1]
              authorLink = authorMatch[2]
            }
            // 判断是否是v3版本的插件
            let v2Reg = /[（(][Vv]2[）)]/
            let v3Reg = /[（(][Vv]3[）)]/
            let deletedReg = /^~~(.+)~~$/
            let isV3 = v3Reg.test(title)
            title = title.replace(v2Reg, '')
            title = title.replace(v3Reg, '')
            title = title ? title.trim() : '未知'
            let isDeleted = deletedReg.test(title)
            title = title.replace(deletedReg, '$1')
            result.push({
              isV3,
              title,
              isDeleted,
              name: name ? name.trim() : '',
              link: link ? link.trim() : '',
              author: author ? author.trim() : '佚名',
              authorLink: authorLink ? authorLink.trim() : '',
              description: col3 ? col3.trim() : '',
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

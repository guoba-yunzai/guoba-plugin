import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import {GitUtils} from '#guoba.utils'
import {_paths} from '#guoba.platform'

/**
 * 通过本地仓库解析插件列表
 */
export async function parsePluginsIndexByLocal() {
  const pluginMaps = {}
  const repo = await GitUtils.getPluginsIndex()
  if (!repo) {
    logger.error('[Guoba] 获取本地插件列表仓库失败，请删除`' + GitUtils.repoPath + '`目录后重启 -1')
    return pluginMaps
  }
  if (!fs.existsSync(repo.directory)) {
    logger.error('[Guoba] 获取本地插件列表仓库失败，请删除`' + GitUtils.repoPath + '`目录后重启 -2')
    return pluginMaps
  }
  // 重置并拉取最新插件列表
  await repo.reset()
  await repo.pull()
  // 读取插件列表
  const mdNames = ['README.md', 'Function-Plugin.md', 'Game-Plugin.md']
  for (let mdName of mdNames) {
    const mdPath = path.join(repo.directory, mdName)
    if (!fs.existsSync(repo.directory)) {
      logger.error(`[Guoba] ${mdName}不存在，如遇此问题请提交issue请求适配`)
      continue
    }
    const text = fs.readFileSync(mdPath, 'UTF-8')
    const parseResult = parsePluginList(text)
    Object.assign(pluginMaps, parseResult)
  }
  return pluginMaps
}

/**
 * 通过raw链接解析远程插件列表
 */
export async function parsePluginsIndexByRaw() {
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
  return parsePluginList(text)
}

/**
 * 解析插件列表
 */
function parsePluginList(text) {
  const commonRegs = {
    beginReg: /(\|\s*-{3,}\s*){3}\|/,
    endReg: /^#/,
    itemReg: /\|(.*)\|(.*)\|(.*)\|/,
    linkReg: /\[(.*)]\((.*)\)/,
  }
  const parseConfig = {
    topPlugins: {
      ...commonRegs,
      identifyReg: /^##\s*⭐️ 推荐插件\s*$/,
    },
    plugins: {
      ...commonRegs,
      identifyReg: /^##\s*功能类插件索引\s*$/,
    },
    gamePlugins: {
      ...commonRegs,
      identifyReg: /^##\s*游戏类插件索引\s*$/,
    },
  }
  const lines = text.split(/\n/)
  const parseState = {current: '', idx: 0}
  const parseResult = {}
  const parseEntries = Object.entries(parseConfig)
  for1:
    for (let line of lines) {
      for (const [parseKey, parseItem] of parseEntries) {
        let result = parseResult[parseKey]
        if (parseState.current === parseKey) {
          if (result) {
            // 忽略空行，不认为是结束
            if (!line.trim().length) {
              continue for1;
            }
            if (parseItem.itemReg.test(line)) {
              // 解析3列
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
              // let supportReg = /[✔√]/
              // let isV2 = supportReg.test(col3)
              // let isV3 = supportReg.test(col4)
              let isV2 = false, isV3 = true;
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
                description: col3 ? col3.trim() : null,
              })
            } else {
              // 如果匹配失败，则认为是结束
              parseState.idx++
              parseState.current = ''
            }
          } else if (parseItem.beginReg.test(line)) {
            // 开始解析
            parseResult[parseKey] = []
          } else if (parseItem.endReg.test(line)) {
            // 未遇到开始标识，但是遇到了结束标识，认为是结束
            parseState.idx++
            parseState.current = ''
            continue for1;
          }
        } else if (parseItem.identifyReg.test(line)) {
          // 标识匹配成功，开始进入内容解析
          parseState.current = parseKey
        }
      }
      // 解析完成
      if (parseState.idx >= parseEntries.length) {
        break
      }
    }
  return parseResult
}

/**
 * 解析readme里的链接，如果是相对地址，就替换成绝对地址
 */
export function parseReadmeLink(text, baseUrl) {
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
      url = `${_paths.server.realMountPrefix}/api/helper/transit?url=${encodeURIComponent($1)}`
      return $0.replace($1, url)
    }
    if (/^https?/i.test($1)) {
      return $0
    }
    url = `${baseUrl}/${$1.replace(/^\//, '')}`
    if (checkUrl(url)) {
      url = `${_paths.server.realMountPrefix}/api/helper/transit?url=${encodeURIComponent(url)}`
    }
    return $0.replace($1, url)
  }
  text = text.replace(linkReg, fn)
  return text.replace(imgReg, fn)
}

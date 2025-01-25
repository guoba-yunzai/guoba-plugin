import os from 'os'
import path from 'path'
import lodash from 'lodash'
import {fileURLToPath} from 'url'
import {_paths} from '#guoba.platform'

let instanceVersion = ''

export function incrVersion() {
  instanceVersion = lodash.uniqueId('guoba-instance-version-')
}

incrVersion()

const pathPrefix = [
  {
    reg: /^\//,
    real: _paths.root,
  },
  {
    reg: /^@\//,
    real: _paths.pluginRoot,
  },
  {
    reg: /^#\//,
    real: path.join(_paths.pluginRoot, 'server'),
  },
  {
    reg: {
      test(str) {
        if (os.platform() !== 'win32') {
          return false
        }
        return /^[a-zA-Z]:[\\/]/.test(str)
      },
    },
    replace: (url) => 'file:///' + url,
  }
]

/**
 * 导入模块
 * @param u
 * @param [relative] 相对路径的起始绝对路径
 * @param {*} [version] 文件版本号
 * @returns {Promise<*>}
 * @constructor
 */
export async function GI(u, relative, version = instanceVersion) {
  let url = u
  // . 开头的路径，是相对路径
  if (/^\./.test(u) && relative) {
    url = path.join(relative, u)
  } else {
    url = replacePrefix(url)
  }
  // 判断是否是windows系统
  if (os.platform() === 'win32' && !url.startsWith('file:///')) {
    url = 'file:///' + url
  }
  if (url) {
    // console.log('[GI]', url)
    return await import(url + '?' + version)
  }
  throw '[GI] url is null'
}

/**
 * 引入默认导出
 * @param u
 * @param [relative] 相对路径的起始绝对路径
 * @param [version] 文件版本号
 * @returns {Promise<*>}
 * @constructor
 */
export async function GID(u, relative, version) {
  let file = await GI(u, relative, version)
  if (file && file.default) {
    return file.default
  }
  throw '[GID] file no default export'
}

export function createImport(metaUrl) {
  metaUrl = fileURLToPath(metaUrl)
  metaUrl = path.dirname(metaUrl)
  return {
    GI: (u, version) => GI(u, metaUrl, version),
    GID: (u, version) => GID(u, metaUrl, version),
  }
}

function replacePrefix(url) {
  if (!url) {
    return ''
  }
  for (const prefix of pathPrefix) {
    if (prefix.reg.test(url)) {
      if (prefix.replace) {
        return prefix.replace(url)
      }
      url = url.replace(prefix.reg, prefix.real + '/')
      break
    }
  }
  return url
}

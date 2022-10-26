/*
* 更改此文件需要重启
*/
import os from 'os'
import path from 'path'
import lodash from 'lodash'
import {_paths} from './paths.js'

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
]

/**
 * 导入模块
 * @param u
 * @param [relative] 相对路径的起始绝对路径
 * @returns {Promise<*>}
 * @constructor
 */
export async function GI(u, relative) {
  let url = u
  if (/^cfg$/.test(u)) {
    return await import('./cfg.js')
  }
  // . 开头的路径，是相对路径
  if (/^\./.test(u) && relative) {
    url = path.join(relative, u)
  } else {
    url = replacePrefix(url)
  }
  if (url) {
    // console.log('[GI]', url)
    return await import(url + '?' + instanceVersion)
  }
  throw '[GI] url is null'
}

/**
 * 引入默认导出
 * @param u
 * @param [relative] 相对路径的起始绝对路径
 * @returns {Promise<*>}
 * @constructor
 */
export async function GID(u, relative) {
  let file = await GI(u, relative)
  if (file && file.default) {
    return file.default
  }
  throw '[GID] file no default export'
}

export function createImport(metaUrl) {
  metaUrl = path.dirname(metaUrl)
  return {
    GI: (u) => GI(u, metaUrl),
    GID: (u) => GID(u, metaUrl),
  }
}

function replacePrefix(url) {
  if (!url) {
    return ''
  }
  for (const prefix of pathPrefix) {
    if (prefix.reg.test(url)) {
      url = url.replace(prefix.reg, prefix.real + '/')
      // 判断是否是windows系统
      if (os.platform() === 'win32') {
        url = 'file:///' + url
      }
      break
    }
  }
  return url
}

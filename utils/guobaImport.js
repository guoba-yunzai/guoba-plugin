/*
* 更改此文件需要重启
*/
import lodash from 'lodash'
import {_paths} from './common.js'
import path from 'path'

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

export async function GI(u) {
  let url = u
  if (/^cfg$/.test(u)) {
    url = '@/utils/cfg.js'
  }
  url = replacePrefix(url)
  if (url) {
    // console.log('[GI]', url)
    return await import(url + '?' + instanceVersion)
  }
  throw '[GI] url is null'
}

export async function GID(u) {
  let file = await GI(u)
  if (file && file.default) {
    return file.default
  }
  throw '[GID] file no default export'
}

function replacePrefix(url) {
  if (!url) {
    return ''
  }
  for (const prefix of pathPrefix) {
    if (prefix.reg.test(url)) {
      url = 'file://' + url.replace(prefix.reg, prefix.real + '/')
      break
    }
  }
  return url
}

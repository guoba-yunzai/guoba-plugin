/*
* 更改此文件需要重启
*/
import path from 'path'
import {pluginName} from './package.js'

const _path = process.cwd()
export const _paths = initPaths()

function initPaths() {
  // BotData目录
  let data = path.join(_path, 'data')
  // Bot资源目录
  let resources = path.join(_path, 'resources')
  // 插件根目录
  let pluginRoot = path.join(_path, 'plugins', pluginName)
  // 插件资源目录
  let pluginResources = path.join(pluginRoot, 'resources')
  return {
    root: _path,
    data, resources,
    pluginRoot, pluginResources,
  }
}

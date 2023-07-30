/*
* 更改此文件需要重启
*/
import path from 'path'
import {pluginName} from './package.js'

const _path = process.cwd()
export const _paths = initPaths()

function initPaths() {
  // BotData目录
  const data = path.join(_path, 'data')
  // Bot资源目录
  const resources = path.join(_path, 'resources')
  // Guoba插件根目录
  const pluginRoot = path.join(_path, 'plugins', pluginName)
  // Guoba静态资源路径
  const staticPath = path.join(pluginRoot, 'server/static')
  // 插件资源目录
  const pluginResources = path.join(pluginRoot, 'resources')
  return {
    root: _path,
    data,
    resources,
    pluginRoot,
    staticPath,
    pluginResources,
  }
}

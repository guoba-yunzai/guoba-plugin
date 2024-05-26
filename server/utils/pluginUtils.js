import {_paths} from '#guoba.platform'

/**
 * 判断插件是否显示在菜单中
 * @param supportObject
 * @return {boolean}
 */
export function parseShowInMenu(supportObject) {
  let showInMenu = supportObject.pluginInfo?.showInMenu ?? 'auto'
  if (showInMenu === false || showInMenu === 'false') {
    return false
  }
  if (showInMenu === true || showInMenu === 'true') {
    return true
  }
  if (showInMenu === 'auto') {
    return supportObject.configInfo?.schemas?.length >= 3
      && typeof supportObject.configInfo?.getConfigData === 'function'
  }
  return false
}

/**
 * 获取插件图标路径
 * @param pluginInfo
 * @return {string|*}
 */
export function getPluginIconPath(pluginInfo) {
  return pluginInfo?.iconPath ? `${_paths.server.realMountPrefix}/api/plugin/s/${pluginInfo.name}/icon` : void 0
}

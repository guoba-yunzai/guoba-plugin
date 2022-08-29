import path from 'path'
import lodash from 'lodash'

const {instancesMap} = await Guoba.GI('#/loader/injection.js')
const Preload = await Guoba.GID('#/components/Preload.js')
const {_paths, loadClasses} = await Guoba.GI('@/utils/common.js')

const preloadPath = path.join(_paths.pluginRoot, 'server/preload')
export const preloads = await loadClasses(preloadPath, Preload, {})

/**
 * 依次创建页面预加载
 */
export function usePreload(app) {
  let entries = Object.entries(preloads).sort((a, b) => a[1].priority - b[1].priority)
  for (const [name, PreloadItem] of entries) {
    instancesMap.set(lodash.camelCase(name), new PreloadItem(app))
  }
}

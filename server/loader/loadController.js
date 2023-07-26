import path from 'path'
import lodash from 'lodash'
import {Controller, instancesMap} from "#guoba.framework";

const {_paths, loadClasses} = await Guoba.GI('@/utils/common.js')

const controllerPath = path.join(_paths.pluginRoot, 'server/controller')
export const controllers = await loadClasses(controllerPath, Controller, {})

/**
 * 依次注册控制器
 */
export function useController(app) {
  let entries = Object.entries(controllers).sort((a, b) => a[1].priority - b[1].priority)
  for (const [name, ControllerItem] of entries) {
    instancesMap.set(lodash.camelCase(name), new ControllerItem(app))
  }
}

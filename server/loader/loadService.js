import path from 'path'
import lodash from 'lodash'
import {isV3} from '../../utils/adapter.js'

const Service = await Guoba.GID('#/components/Service.js')
const {instancesMap} = await Guoba.GI('#/loader/injection.js')
const {_paths, loadClasses} = await Guoba.GI('@/utils/common.js')

const adapter = isV3 ? 'v3' : 'v2'
const servicePath = path.join(_paths.pluginRoot, 'server/service')

export const services = {}

await loadClasses(path.join(servicePath, 'both'), Service, services)
await loadClasses(path.join(servicePath, adapter), Service, services)

/**
 * 依次注册服务
 */
export function useService(app) {
  let entries = Object.entries(services).sort((a, b) => a[1].priority - b[1].priority)
  for (const [name, ServiceItem] of entries) {
    instancesMap.set(lodash.camelCase(name), new ServiceItem(app))
  }
}

import path from 'path'
import lodash from 'lodash'

const {instancesMap} = await Guoba.GI('#/loader/injection.js')
const Interceptor = await Guoba.GID('#/components/Interceptor.js')
const {_paths, loadClasses} = await Guoba.GI('@/utils/common.js')

const interceptorPath = path.join(_paths.pluginRoot, 'server/interceptor')
export const interceptors = await loadClasses(interceptorPath, Interceptor, {})

/**
 * 依次注册拦截器
 */
export function useInterceptor(app) {
  let entries = Object.entries(interceptors).sort((a, b) => a[1].priority - b[1].priority)
  for (const [name, InterceptorItem] of entries) {
    instancesMap.set(lodash.camelCase(name), new InterceptorItem(app))
  }
}

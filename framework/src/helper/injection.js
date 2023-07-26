export const instancesMap = new Map()

const proxyMap = new Map()

/**
 * 自动注入
 * @param instanceName
 */
export function autowired(instanceName) {
  if (!instanceName) {
    throw new Error('instanceName is required')
  }
  if (!proxyMap.has(instanceName)) {
    proxyMap.set(instanceName, createProxy(instanceName))
  }
  return proxyMap.get(instanceName)
}

/**
 * 创建只读代理对象
 * @param instanceName
 */
function createProxy(instanceName) {
  return new Proxy({}, {
    get(target, propKey) {
      let instance = instancesMap.get(instanceName)
      if (instance) {
        let prop = instance[propKey]
        if (typeof prop === 'function') {
          return prop.bind(instance)
        }
        return prop
      }
      throw new Error(`${instanceName} is not found`)
    },
  })
}

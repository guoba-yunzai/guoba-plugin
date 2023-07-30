import lodash from 'lodash'
import {Interceptor, Service, Controller, GuobaUtils, instancesMap} from "../../index.js";

/**
 * 加载所有组件
 * @param app
 * @param {GuobaAppArgs} args
 * @return {Promise<void>}
 */
export async function useComponents(app, args) {
  const {componentPaths} = args
  if (!Array.isArray(componentPaths) && componentPaths.length === 0) {
    return
  }
  // 加载所有class
  const classes = {}
  for (const componentPath of componentPaths) {
    await GuobaUtils.loadClasses(componentPath, Object, classes);
  }
  const entries = Object.entries(classes).sort((a, b) => a[1].priority - b[1].priority)
  // 数组顺序即为加载优先级
  const componentsTypes = [
    // 拦截器
    Interceptor,
    // 服务
    Service,
    // 控制器
    Controller
  ];
  for (const type of componentsTypes) {
    let i = 0
    while (i < entries.length) {
      const [name, clazz] = entries[i];
      if (GuobaUtils.instanceOf(clazz, type)) {
        instancesMap.set(lodash.camelCase(name), new clazz(app))
        entries.splice(i, 1);
      } else {
        i++
      }
    }
  }
}
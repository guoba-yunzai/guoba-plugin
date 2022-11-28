import path from 'path'
import {_paths} from '../paths.js'
import {_version, loadClasses} from '../common.js'
import {isDev} from '../adapter.js'
import {createHotLoad} from '../hotLoad.js'
import {reload} from './common.js'
import {loadV2Apps} from './loadV2.js'

export async function init(apps) {
  let appsPath = path.join(_paths.pluginRoot, 'apps')
  // 加载 apps 下的所有类
  await loadClasses(appsPath, plugin, apps)
  // 加载 v2 插件
  await loadV2Apps()
  // dev 模式下，监听文件变化，自动重启服务器
  if (isDev) {
    let skip = true
    let staticPath = path.join(_paths.pluginRoot, 'server/static')
    createHotLoad(path.join(_paths.pluginRoot, 'server'), {
      wait: 100,
      immediate: true,
      filter: (type, p) => {
        if (type === 'immediate') {
          return true
        }
        if (skip) return false
        if (p.startsWith(staticPath)) {
          return false
        }
        return /\.c?js$/.test(p)
      },
      handler: () => reload().then(() => setTimeout(() => skip = false, 1000)),
    })
  } else {
    await reload()
  }
  logger.mark(`[Guoba] 欢迎使用锅巴插件，当前版本：${_version}`)
}

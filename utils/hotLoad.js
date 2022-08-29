/*
* 更改此文件需要重启
*/
import lodash from 'lodash'
import chokidar from 'chokidar'

const hotLoadMap = new Map()

/**
 * 热加载
 * @param paths 路径
 * @param options 选项
 * @param options.filter
 * @param options.handler
 * @param options.wait 防抖时间， 0 = 不防抖
 * @param options.watchOptions 监听选项
 * @returns {*}
 */
export function createHotLoad(paths, options) {
  let {wait = 100, immediate = false, watchOptions} = options
  let id = lodash.uniqueId('guoba-hot-load-')
  let handler = wait === 0 ? watchHandler : lodash.debounce(watchHandler, wait)
  let bindHandler = handler.bind(options)
  if (immediate) watchHandler.call(options, 'immediate', paths)
  let watcher = chokidar.watch(paths, watchOptions).on('all', bindHandler)
  hotLoadMap.set(id, {watcher})
  return {
    id,
    destroy: destroyHotLoad.bind(null, id),
  }
}

// 取消热加载
function destroyHotLoad(id) {
  let instance = hotLoadMap.get(id)
  if (instance) {
    instance.watcher.close()
    hotLoadMap.delete(id)
  }
}

function watchHandler(eventName, path, stats) {
  if (this.filter && !this.filter(eventName, path, stats)) {
    return
  }
  this.handler(eventName, path, stats)
}

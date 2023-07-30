import path from "path";
import {cfg, _paths} from '#guoba.platform';
import {GuobaApplication} from "#guoba.framework";

import {listen} from './helper/listen.js'
import {getWebAddress} from '../utils/common.js'

const {useInterceptor} = await Guoba.GI('#/loader/loadInterceptor.js')
const {useController} = await Guoba.GI('#/loader/loadController.js')
const {useService} = await Guoba.GI('#/loader/loadService.js')

export async function createServer({isInit}) {
  const begin = Date.now()
  const {port} = cfg.get('server')
  const staticPath = path.join(_paths.pluginRoot, 'server/static')
  // 启动服务
  const application = await GuobaApplication.run({
    port, staticPath,
    componentPaths: [
      path.join(_paths.pluginRoot, 'server/interceptor'),
      path.join(_paths.pluginRoot, 'server/service'),
      path.join(_paths.pluginRoot, 'server/controller'),
    ],
    preloads: [
      {
        code: `PRELOAD_JS`,
        hook: (req) => req.path === '/' || req.path === '/index.html',
        path: path.join(_paths.pluginRoot, 'server/preload/ConfigPreload.js'),
        staticPath: path.join(staticPath, 'index.html'),
      }
    ],
    overrides: {
      listen: listen,
    }
  })
  const app = application.app
  const server = application.server

  // 拦截器
  useInterceptor(app)
  // 服务
  useService(app)
  // 控制器
  useController(app)
  // 首次启动输出提示信息
  if (isInit) {
    logger.mark(`--------- >_< ---------`)
    logger.mark(`锅巴服务启动成功~ 耗时:${Date.now() - begin}ms`)
    const hosts = getWebAddress(true)
    for (let host of hosts) {
      logger.mark(host)
    }
    logger.mark(`-----------------------`)
  }
  return {app, server}
}

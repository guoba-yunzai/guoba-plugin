import path from "path";
import {cfg, _paths} from '#guoba.platform';
import {GuobaApplication} from "#guoba.framework";

import {isV3} from "../utils/adapter.js";
import {listen} from './helper/listen.js'
import {getWebAddress} from '../utils/common.js'

export async function createServer({isInit}) {
  const begin = Date.now()
  // 启动服务
  const application = await GuobaApplication.run({
    port: cfg.get('server.port'),
    staticPath: _paths.staticPath,
    componentPaths: [
      path.join(_paths.pluginRoot, 'server/interceptor'),
      path.join(_paths.pluginRoot, 'server/service', 'both'),
      path.join(_paths.pluginRoot, 'server/service', isV3 ? 'v3' : 'v2'),
      path.join(_paths.pluginRoot, 'server/controller'),
    ],
    preloads: [
      {
        code: `PRELOAD_JS`,
        hook: (req) => req.path === '/' || req.path === '/index.html',
        path: path.join(_paths.pluginRoot, 'server/preload/ConfigPreload.js'),
        staticPath: path.join(_paths.staticPath, 'index.html'),
      }
    ],
    overrides: {
      listen: listen,
    }
  })
  const app = application.app
  const server = application.server
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

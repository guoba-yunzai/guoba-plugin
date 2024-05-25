import path from "path";
import {GuobaApplication} from "#guoba.framework";
import {_paths, cfg, GuobaSupportMap, PluginsMap} from '#guoba.platform';
import {getWebAddress, isV3} from "#guoba.utils";
import {listen} from './helper/listen.js'
import chalk from 'chalk'

const {mountRoot, mountRootWithSlash} = cfg.serverMountPath
const realRoot = _paths.server.realMountPrefix + '/'

export async function createServer({isInit}) {
  const begin = Date.now()
  // 初始化
  PluginsMap.clear()
  GuobaSupportMap.clear()
  // 启动服务
  const application = await GuobaApplication.run({
    port: cfg.get('server.port'),
    prefix: _paths.server.realMountPrefix,
    staticPath: _paths.staticPath,
    created: appCreated,
    componentPaths: [
      path.join(_paths.pluginRoot, 'server/interceptor'),
      path.join(_paths.pluginRoot, 'server/service', 'both'),
      path.join(_paths.pluginRoot, 'server/service', isV3 ? 'v3' : 'v2'),
      path.join(_paths.pluginRoot, 'server/controller'),
    ],
    preloads: [
      {
        code: `PRELOAD_JS`,
        hook: (req) => req.path === realRoot || req.path === realRoot + 'index.html',
        path: path.join(_paths.pluginRoot, 'server/preload/ConfigPreload.js'),
        staticPath: path.join(_paths.staticPath, 'index.html'),
      }
    ],
    decorators: [
      {
        path: path.join(_paths.pluginRoot, 'server/decorator/ReqDecorator.js'),
        args: [],
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
    const tipText = `[Guoba] 启动成功 >_< 耗时: ${Date.now() - begin}ms`
    const hosts = getWebAddress(true)
    const maxLength = Math.max(30, ...hosts.map(host => host.length), tipText.length + 6) + 4;
    logger.mark('#'.repeat(maxLength))
    logger.mark(`# ${chalk.green(tipText)} #`)
    logger.info('# ' + chalk.green('登录地址：') + ' '.repeat(maxLength - 14) + ' #')
    for (let host of hosts) {
      logger.info('# ' + chalk.cyan(host) + ' '.repeat(maxLength - host.length - 4) + ' #')
    }
    logger.info('# ' + chalk.magenta('请妥善保管登陆地址，避免泄露！') + ' '.repeat(maxLength - 34) + ' #')
    logger.mark('#'.repeat(maxLength))
  }
  return {app, server}
}

function appCreated(guobaApp) {
  const {app} = guobaApp
  // 重定向根路径，用于自定义挂载路径路径
  app.use((req, res, next) => {
    // 1. 请求的是挂载根路径
    if (req.path === mountRoot) {
      if (req.path !== '/') {
        // 替换保留参数并重定向
        const url = req.originalUrl.replace(mountRoot, mountRootWithSlash)
        res.redirect(url)
        return
      }
    }
    // 2. 请求的是以挂载根路径开头的
    if (req.originalUrl.startsWith(mountRootWithSlash)) {
      // 替换为真实根路径，并继续
      req.url = req.originalUrl.replace(mountRootWithSlash, realRoot)
    }
    next()
  })
}

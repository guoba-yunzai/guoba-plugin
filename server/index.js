import express from 'express'
import bodyParser from 'body-parser'
import { getWebAddress } from '../utils/common.js';
const cfg = await Guoba.GID('cfg')
const {useStatic} = await Guoba.GI('#/loader/loadStatic.js')
const {usePreload} = await Guoba.GI('#/loader/loadPreload.js')
const {useInterceptor} = await Guoba.GI('#/loader/loadInterceptor.js')
const {useController} = await Guoba.GI('#/loader/loadController.js')
const {useService} = await Guoba.GI('#/loader/loadService.js')

export function createServer({isInit}) {
  const begin = Date.now()
  const app = express()
  // 静态资源
  useStatic(app)
  // 预加载
  usePreload(app)
  // parse application/json
  app.use(bodyParser.json())
  // 拦截器
  useInterceptor(app)
  // 控制器
  useController(app)
  // 服务
  useService(app)
  // 启动服务监听
  let {port} = cfg.get('server')
  let server = app.listen(port, () => {
    if (isInit) {
      logger.mark(`--------- >_< ---------`)
      logger.mark(`锅巴服务启动成功~ 耗时:${Date.now() - begin}ms`)
      let hosts = getWebAddress(true)
      for (let host of hosts) {
        logger.mark(host)
      }
      logger.mark(`-----------------------`)
    }
  })
  return {app, server}
}

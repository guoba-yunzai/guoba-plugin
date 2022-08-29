import express from 'express'
import bodyParser from 'body-parser'

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
  const port = cfg.get('server.port')
  const server = app.listen(port, () => {
    if (isInit) {
      logger.mark(`--------------------------`)
      logger.mark(`锅巴服务启动成功~ 耗时:${Date.now() - begin}ms`)
      logger.mark(`http://127.0.0.1:${port}`)
      logger.mark(`--------------------------`)
    }
  })
  return {app, server}
}

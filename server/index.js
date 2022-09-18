import express from 'express'
import {listen} from './helper/listen.js'
import {getWebAddress} from '../utils/common.js'

const cfg = await Guoba.GID('cfg')
const {useStatic} = await Guoba.GI('#/loader/loadStatic.js')
const {useHelper} = await Guoba.GI('#/loader/loadHelper.js')
const {usePreload} = await Guoba.GI('#/loader/loadPreload.js')
const {useInterceptor} = await Guoba.GI('#/loader/loadInterceptor.js')
const {useController} = await Guoba.GI('#/loader/loadController.js')
const {useService} = await Guoba.GI('#/loader/loadService.js')

export async function createServer({isInit}) {
  const begin = Date.now()
  const app = express()
  // 启动服务监听
  let {port} = cfg.get('server')
  let server = await listen(app, port)
  // 静态资源
  useStatic(app)
  // 预加载
  usePreload(app)
  // 辅助工具
  useHelper(app)
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
    let hosts = getWebAddress(true)
    for (let host of hosts) {
      logger.mark(host)
    }
    logger.mark(`-----------------------`)
  }
  return {app, server}
}

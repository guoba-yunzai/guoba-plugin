import express from 'express'
import bodyParser from 'body-parser'

import os from 'os'

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
  let {host, port, splicePort} = cfg.get('server')
  let server = app.listen(port, () => {
    if (isInit) {
      logger.mark(`--------------------------`)
      logger.mark(`锅巴服务启动成功~ 耗时:${Date.now() - begin}ms`)

      const wlan = os.networkInterfaces()
      let msg=[]
      
      for (let nw in wlan) {
        let objArr = wlan[nw];
        objArr.forEach((obj,idx,arr)=>{
          if((nw!="lo"&&nw!="docker0")&&obj.netmask!="ffff:ffff:ffff:ffff::"){
              //console.log(`${obj.family}`);
            if(obj.family=="IPv6"){
              if (splicePort && port != 80) {
                  msg=`${host}`+`[${obj.address}]:${port}`
                  logger.mark(`${msg}`)
                  return
              }
              msg=`${host}`+`[${obj.address}]`
              logger.mark(`${msg}`)
              return
            }
            if (splicePort && port != 80) {
                  msg=`${host}`+`${obj.address}:${port}`
                  logger.mark(`${msg}`)
                  return
              }
              msg=`${host}`+`${obj.address}`
              logger.mark(`${msg}`)
              return
          }
        });
      }

      // host = /^http/.test(host) ? host : `http://${host}`
      // let joinPort = ''
      // if (splicePort) {
      //   // noinspection EqualityComparisonWithCoercionJS
      //   joinPort = port == 80 ? '' : `:${port}`
      // }

      
      logger.mark(`--------------------------`)
    }
  })
  return {app, server}
}

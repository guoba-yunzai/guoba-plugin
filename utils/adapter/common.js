import {GI, incrVersion} from '../guobaImport.js'
import {packageTips} from './check.js'

let isInit = true

export async function reload() {
  if (!isInit) {
    incrVersion()
  }
  let flag = await new Promise((resolve) => {
    if (!Guoba.server) {
      resolve(true)
      return
    }
    Guoba.server.close(err => {
      if (err) {
        logger.error('[Guoba] 重载失败', err)
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
  if (flag) {
    delete Guoba.app
    delete Guoba.server
    // 创建服务器
    let newServer
    try {
      let {createServer} = await GI('#/index.js')
      newServer = await createServer({isInit})
    } catch (error) {
      if (error?.stack && error.stack.includes('Cannot find package')) {
        packageTips(error)
      } else {
        if (error.stack) {
          logger.error(`[Guoba] 服务锅巴启动失败`)
          logger.error(decodeURI(error.stack))
        } else {
          logger.error(error)
        }
      }
      return
    }
    let {app, server} = newServer
    Guoba.app = app
    Guoba.server = server
    Guoba.reload = reload
    if (!isInit) {
      logger.mark('[Guoba] 服务重载成功~')
    }
    isInit = false
  }
}

/** 退出事件 */
process.on('exit', async (code) => {
  if (Guoba && Guoba.server) {
    Guoba.server.close()
  }
})

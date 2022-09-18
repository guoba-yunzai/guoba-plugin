import fetch from 'node-fetch'
import {sleep} from '../../utils/common.js'

const cfg = await Guoba.GID('cfg')

export function listen(app, port) {
  return new Promise((resolve, reject) => {
    let server = app.listen(port)
    // 重试次数
    let left = 3, num = 1
    // 重试间隔
    let duration = 1000
    server.on('listening', () => {
      resolve(server)
    })
    server.on('error', async (error) => {
      // 系统非监听端口操作报错
      if (error.code !== 'EADDRINUSE') {
        throw error
      }
      if (num <= left) {
        logger.mark(`[Guoba] 端口号 ${port} 已被占用，正在进行第 ${num++} 次重试…`)
        try {
          await Promise.race([
            fetch(`http://localhost:${port}/api/helper/release_port`, {method: 'DELETE'}),
            sleep(8000),
          ]).catch(() => 0)
          await sleep(duration)
        } finally {
          server.listen(port)
        }
      } else {
        reject(`[Guoba] 启动失败，端口号 ${port} 被占用，请尝试关闭该端口或更换锅巴的端口号`)
      }
    })
  })
}

import { cfg, _paths } from "#guoba.platform"
import { releasePath, requestLocalRelease } from "./localRelease.js"

export function listen(app, port) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port)
    let attempts = 0
    server.on("listening", () => resolve(server))
    server.on("error", async error => {
      // 系统非监听端口操作报错
      if (error.code !== "EADDRINUSE") return reject(error)
      if (attempts >= 3) {
        return reject(
          new Error(`[Guoba] 启动失败，端口号 ${port} 被占用，请手动停止原进程或更换锅巴的端口号`),
        )
      }
      logger.mark(`[Guoba] 端口号 ${port} 已被占用，正在进行第 ${++attempts} 次重试…`)
      try {
        await requestLocalRelease(
          port,
          releasePath(_paths.server.realMountPrefix),
          cfg.getJwtSecret(),
        )
        await new Promise(resolve => setTimeout(resolve, 1000))
        server.listen(port)
      } catch (error) {
        reject(error)
      }
    })
  })
}

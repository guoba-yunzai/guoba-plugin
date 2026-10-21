import jwt from "jsonwebtoken"
import { autowired, Interceptor, Result } from "#guoba.framework"
import { _paths, cfg, Constant } from "#guoba.platform"

// 弱令牌仅供前端 <img> 读取这两个图片接口。
const liteInclude = /^\/api\/plugin\/miao\/help\/theme\/(?:bg|main)\/?$/
const publicLogin = /^\/api\/login(?:\/quick|\/code\/(?:request|check))?\/?$/
const publicIcon = /^\/api\/plugin\/s\/[^/]+\/icon\/?$/
const localRelease = /^\/api\/helper\/release_port\/?$/

/**
 * Token校验拦截器
 * @param app
 */
export default class TokenInterceptor extends Interceptor {
  systemService = autowired("systemService")

  async handler(req, res, next) {
    if (
      !this.check(/^\/api(?:\/|$)/, req) ||
      (req.method === "POST" && this.check(publicLogin, req)) ||
      (req.method === "GET" && this.check(publicIcon, req)) ||
      // 释放端口由接口自身校验本机凭据，供另一 Bot 实例启动时调用。
      (req.method === "DELETE" && this.check(localRelease, req))
    ) {
      return next()
    }

    // 保留插件现有的 query 令牌调用方式，弱令牌仍严格限定用途。
    const token = req.query?.token || req.headers[Constant.TOKEN_KEY]
    if (typeof token === "string" && token.length <= 4096) {
      // 判断是否是弱令牌
      if (token.length === 8 && token === this.systemService.getLiteToken()) {
        if (req.method === "GET" && this.check(liteInclude, req)) {
          return next()
        }
      } else if ((await redis.get(`${Constant.REDIS_PREFIX}access-token:${token}`)) === token) {
        try {
          jwt.verify(token, cfg.getJwtSecret(), { algorithms: ["HS256"] })
          return next()
        } catch {}
      }
    }
    let result = Result.noLogin()
    res.status(result.httpStatus).json(result.toJSON())
  }

  /**
   * 检查是否reg是否通过校验，兼容自定义前缀
   * @param {RegExp} reg
   * @param {Request} req
   */
  check(reg, req) {
    // Express 默认不区分大小写，鉴权及挂载前缀必须使用相同匹配语义。
    let path = req.path.toLowerCase()
    const prefix = _paths.server.realMountPrefix.toLowerCase().replace(/\/$/, "")
    if (prefix && (path === prefix || path.startsWith(prefix + "/"))) {
      path = path.substring(prefix.length)
    }
    return reg.test(path)
  }

  static priority = 100
}

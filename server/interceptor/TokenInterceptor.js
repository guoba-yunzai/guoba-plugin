import jwt from 'jsonwebtoken'
import {autowired, Interceptor, Result} from "#guoba.framework";
import {_paths, cfg, Constant} from "#guoba.platform";

// 弱令牌（只能用来访问静态资源等）
const liteInclude = [
  new RegExp('^/api/plugin/miao/help/theme/.+'),
]

// 需要拦截的路径
const include = [
  new RegExp('^/api/.*'),
  ...liteInclude,
]

// 不需要拦截的路径
const exclude = [
  new RegExp('^/api/login'),
  new RegExp('^/api/helper/transit'),
  new RegExp('^/api/helper/release_port'),
  new RegExp('^/api/plugin/s/.+/icon'),
]

/**
 * Token校验拦截器
 * @param app
 */
export default class TokenInterceptor extends Interceptor {

  systemService = autowired('systemService')

  constructor(app) {
    super(app)
  }

  async handler(req, res, next) {
    if (!include.find(reg => this.check(reg, req))) {
      next()
    } else if (exclude.find(reg => this.check(reg, req))) {
      next()
    } else {
      // 从query里获取token
      let token = req.query?.token
      if (!token) {
        token = req.headers[Constant.TOKEN_KEY]
      }
      if (token) {
        // 判断是否是弱令牌
        if (token.length === 8 && token === this.systemService.getLiteToken()) {
          if (liteInclude.find(reg => this.check(reg, req))) {
            next()
            return
          }
        } else {
          let redisKey = Constant.REDIS_PREFIX + 'access-token:' + token
          let redisToken = await redis.get(redisKey)
          if (redisToken) {
            try {
              jwt.verify(redisToken, cfg.getJwtSecret())
              next()
              return
            } catch {
            }
          }
        }
      }
      let result = Result.noLogin()
      res.status(result.httpStatus).json(result.toJSON())
    }
  }

  /**
   * 检查是否reg是否通过校验，兼容自定义前缀
   * @param {RegExp} reg
   * @param {Request} req
   */
  check(reg, req) {
    const {realMountPrefix} = _paths.server
    let {path} = req
    if (path.startsWith(realMountPrefix)) {
      path = path.substring(realMountPrefix.length)
    }
    return reg.test(path)
  }

  static priority = 100
}

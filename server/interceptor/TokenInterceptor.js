import jwt from 'jsonwebtoken'

const cfg = await Guoba.GID('cfg')
const Result = await Guoba.GID('#/components/Result.js')
const Constant = await Guoba.GID('#/constant/Constant.js')
const {autowired} = await Guoba.GI('#/loader/injection.js')
const Interceptor = await Guoba.GID('#/components/Interceptor.js')

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
    if (!include.find(reg => reg.test(req.path))) {
      next()
    } else if (exclude.find(reg => reg.test(req.path))) {
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
          if (liteInclude.find(reg => reg.test(req.path))) {
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

  static priority = 100
}

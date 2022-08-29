import jwt from 'jsonwebtoken'

const cfg = await Guoba.GID('cfg')
const Result = await Guoba.GID('#/components/Result.js')
const Constant = await Guoba.GID('#/constant/Constant.js')
const Interceptor = await Guoba.GID('#/components/Interceptor.js')

// 需要拦截的路径
const include = [
  new RegExp('^/api/.*'),
]

// 不需要拦截的路径
const exclude = [
  new RegExp('^/api/login'),
  new RegExp('^/api/helper/transit'),
]

/**
 * Token校验拦截器
 * @param app
 */
export default class TokenInterceptor extends Interceptor {
  constructor(app) {
    super(app)
    this.secret = cfg.get('jwt.secret')
  }

  async handler(req, res, next) {
    if (!include.find(reg => reg.test(req.path))) {
      next()
    } else if (exclude.find(reg => reg.test(req.path))) {
      next()
    } else {
      let token = req.headers[Constant.TOKEN_KEY]
      if (token) {
        let redisKey = Constant.REDIS_PREFIX + 'access-token:' + token
        let redisToken = await redis.get(redisKey)
        if (redisToken) {
          try {
            jwt.verify(redisToken, this.secret)
            next()
            return
          } catch {
          }
        }
      }
      let result = Result.noLogin()
      res.status(result.httpStatus).json(result.toJSON())
    }
  }

  static priority = 100
}

import jwt from 'jsonwebtoken'

const cfg = await Guoba.GID('cfg')
const Service = await Guoba.GID('#/components/Service.js')
const Constant = await Guoba.GID('#/constant/Constant.js')
const {randomString} = await Guoba.GI('@/utils/common.js')
const GuobaError = await Guoba.GID('@/components/GuobaError.js')

export class LoginService extends Service {
  constructor(app) {
    super(app)
    this.secret = cfg.get('jwt.secret')
  }

  /** 注册并保存Token */
  signToken(username) {
    let token = jwt.sign({username}, this.secret)
    // 将token存入redis
    let redisKey = this.getRedisKey(token)
    redis.set(redisKey, token, {EX: 3600 * 24})
    return token
  }

  logout(token) {
    if (token) {
      let redisKey = this.getRedisKey(token)
      redis.del(redisKey)
    }
  }

  setQuickLogin(username) {
    let {redisKey, code} = this.getQuickLoginRedisKey(null)
    let token = this.signToken(username)
    redis.set(redisKey, token, {EX: 180})
    let {host, port} = cfg.get('server')
    // noinspection EqualityComparisonWithCoercionJS
    if (port != 80) {
      host += `:${port}`
    }
    host += `/#/ml/${code}`
    return host
  }

  async getQuickLogin(code) {
    if (!code) {
      throw new GuobaError('登录失败')
    }
    let {redisKey} = this.getQuickLoginRedisKey(code)
    let token = await redis.get(redisKey)
    if (token) {
      redis.del(redisKey)
      return {token}
    }
    throw new GuobaError('登录失败')
  }

  getQuickLoginRedisKey(code) {
    if (!code) {
      code = randomString(6)
    }
    return {
      code,
      redisKey: `${Constant.REDIS_PREFIX}login-quick:${code}`,
    }
  }

  getRedisKey(token) {
    return `${Constant.REDIS_PREFIX}access-token:${token}`
  }
}

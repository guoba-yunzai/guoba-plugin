import jwt from 'jsonwebtoken'

const cfg = await Guoba.GID('cfg')
const Service = await Guoba.GID('#/components/Service.js')
const Constant = await Guoba.GID('#/constant/Constant.js')
const {randomString, getAllWebAddress} = await Guoba.GI('@/utils/common.js')
const GuobaError = await Guoba.GID('@/components/GuobaError.js')

export class LoginService extends Service {
  constructor(app) {
    super(app)
  }

  /** 注册并保存Token */
  signToken(username) {
    let token = jwt.sign({username}, cfg.getJwtSecret())
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

  async setQuickLogin(username) {
    let {redisKey, code} = this.getQuickLoginRedisKey(null)
    let token = this.signToken(username)
    redis.set(redisKey, token, {EX: 180})
    let webAddress = await getAllWebAddress()
    for (let [key, address] of Object.entries(webAddress)) {
      webAddress[key] = address.map(h => `${h}/#/ml/${code}`)
    }
    return webAddress
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

const Decorator = await Guoba.GID('#/components/Decorator.js')
const Result = await Guoba.GID('#/components/Result.js')
const Constant = await Guoba.GID('#/constant/Constant.js')

export default class RedisDecorator extends Decorator {
  constructor(cacheKey, config) {
    super(config)
    this.cacheKey = cacheKey
  }

  // TODO 待完善
  async execute(pjp, req, res) {
    // 装饰器
    if (!this.cacheKey) {
      return
    }
    let redisKey = Constant.REDIS_PREFIX + this.cacheKey
    redisKey = redisKey.replace(/\${([^}]+)}/g, ($0, $1) => {
      let code = `(query, params, body) => ${$1}`
      return new Function(`return ${code}`)()(req.query, req.params, req.body)
    })
    let data = await redis.get(redisKey)
    if (data) {
      data = JSON.parse(data)
      return new Result(data.code, data.result, data.message, data.httpStatus)
    }
    let ret = await pjp.proceed()
    redis.set(redisKey, JSON.stringify(ret), {...this.config})
  }
}

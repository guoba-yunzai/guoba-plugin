import jwt from "jsonwebtoken"
import { createHash, randomUUID } from "node:crypto"
import { GuobaError, Service } from "#guoba.framework"
import { cfg, Constant } from "#guoba.platform"
import { getAllWebAddress, randomString } from "#guoba.utils"

const codeKey = `${Constant.REDIS_PREFIX}login-code`
const attemptsKey = `${codeKey}:attempts`
const lockKey = `${codeKey}:locked`
const codeLifetime = 300
const maxCodeAttempts = 5

const normalizeLoginCode = code => (typeof code === "string" ? code.trim().toLowerCase() : code)
const hashCode = code => createHash("sha256").update(code).digest("hex")

// 兼容只提供 get/set/del 的 Redis 适配器，串行化同一 Bot 进程内的登录操作。
// 共享 Redis 的多个 Bot 进程仍各自维护队列，不提供跨进程事务保证。
let loginQueue = Promise.resolve()
function serializeLogin(action) {
  const result = loginQueue.then(action)
  loginQueue = result.catch(() => {})
  return result
}

export class LoginService extends Service {
  #tokenWrites = new Map()

  /**
   * 注册并保存Token，保持同步返回字符串，兼容已有插件调用。
   * @returns {string} 登录令牌
   */
  signToken(username) {
    let token = jwt.sign({ username }, cfg.getJwtSecret(), {
      algorithm: "HS256",
      expiresIn: 3600 * 24,
      jwtid: randomUUID(),
    })
    // 将token存入redis
    let redisKey = this.getRedisKey(token)
    const write = Promise.resolve(redis.set(redisKey, token, { EX: 3600 * 24 }))
    this.#tokenWrites.set(token, write)
    write
      .finally(() => this.#tokenWrites.delete(token))
      .catch(error => globalThis.logger?.error("[Guoba] 保存登录令牌失败", error))
      .catch(() => {})
    return token
  }

  async logout(token) {
    if (typeof token === "string") await redis.del(this.getRedisKey(token))
  }

  async setQuickLogin(username) {
    let { redisKey, code } = this.getQuickLoginRedisKey(null)
    let token = this.signToken(username)
    await this.#tokenWrites.get(token)
    await redis.set(redisKey, token, { EX: 180 })
    let webAddress = await getAllWebAddress()
    for (let [key, address] of Object.entries(webAddress)) {
      webAddress[key] = address.map(h => `${h}/#/ml/${code}`)
    }
    return webAddress
  }

  async getQuickLogin(code) {
    code = normalizeLoginCode(code)
    if (typeof code !== "string" || !/^(?:[0-9a-z]{6}|[0-9a-z]{32})$/.test(code)) {
      throw new GuobaError("登录失败")
    }
    return serializeLogin(async () => {
      let { redisKey } = this.getQuickLoginRedisKey(code)
      let token = await redis.get(redisKey)
      if (!token) {
        throw new GuobaError("登录失败")
      }
      await redis.del(redisKey)
      return { token }
    })
  }

  getQuickLoginRedisKey(code) {
    code = normalizeLoginCode(code)
    code ||= randomString(6)
    return {
      code,
      redisKey: `${Constant.REDIS_PREFIX}login-quick:${code}`,
    }
  }

  async codeLoginRequest() {
    return serializeLogin(async () => {
      if (await redis.get(lockKey)) {
        throw new GuobaError("验证码错误次数过多，请五分钟后再试")
      }
      if (await redis.get(codeKey)) {
        throw new GuobaError("当前验证码还未失效，请稍后再试")
      }
      const code = randomString(16)
      await redis.del(attemptsKey)
      await redis.set(codeKey, hashCode(code), { EX: codeLifetime })
      return code
    })
  }

  async codeLoginCheck(code) {
    code = normalizeLoginCode(code)
    if (typeof code !== "string" || !/^[0-9a-z]{16}$/.test(code)) {
      return false
    }
    return serializeLogin(async () => {
      if (await redis.get(lockKey)) return false
      const redisCode = await redis.get(codeKey)
      if (!redisCode) return false
      // 兼容升级前已经发出的验证码，其明文缓存最多再存续五分钟。
      const storedDigest = /^[0-9a-z]{16}$/i.test(redisCode)
        ? hashCode(normalizeLoginCode(redisCode))
        : redisCode
      if (storedDigest === hashCode(code)) {
        await redis.del(codeKey)
        await redis.del(attemptsKey)
        const token = this.signToken("admin")
        await this.#tokenWrites.get(token)
        return token
      }
      const attempts = (Number(await redis.get(attemptsKey)) || 0) + 1
      if (attempts >= maxCodeAttempts) {
        await redis.set(lockKey, "1", { EX: codeLifetime })
        await redis.del(codeKey)
        await redis.del(attemptsKey)
      } else {
        await redis.set(attemptsKey, String(attempts), { EX: codeLifetime })
      }
      return false
    })
  }

  getRedisKey(token) {
    return `${Constant.REDIS_PREFIX}access-token:${token}`
  }
}

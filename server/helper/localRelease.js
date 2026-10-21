import { createHmac, randomBytes, timingSafeEqual } from "node:crypto"
import http from "node:http"
import { isIP } from "node:net"

export const releaseHeader = "x-guoba-local-release"
const validity = 15000
const consumed = new Map()

export function releasePath(prefix = "") {
  return `${prefix.replace(/\/$/, "")}/api/helper/release_port`
}

function signature(secret, port, path, timestamp, nonce) {
  if (typeof secret !== "string" || !secret) throw new Error("本地端口释放凭据不可用")
  return createHmac("sha256", secret)
    .update(`guoba-release-port:v1\nDELETE\n${port}\n${path}\n${timestamp}\n${nonce}`)
    .digest("hex")
}

/** 新旧实例共用本地配置密钥；签名仅用于当前端口和挂载路径的一次交接。 */
export function signLocalRelease(secret, port, path, timestamp = Date.now()) {
  const nonce = randomBytes(16).toString("hex")
  return `${timestamp}.${nonce}.${signature(secret, port, path, timestamp, nonce)}`
}

function isLoopback(address) {
  const family = isIP(address)
  if (family === 4) return address.startsWith("127.")
  if (family !== 6) return false
  const normalized = new URL(`http://[${address}]/`).hostname.slice(1, -1)
  return normalized === "::1" || /^::ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}$/.test(normalized)
}

/** 必须同时具有真实回环连接、有效 HMAC 和未使用的短时 nonce。 */
export function verifyLocalRelease(req, secret, path, now = Date.now()) {
  try {
    if (req.method !== "DELETE" || !isLoopback(req.socket?.remoteAddress)) return false
    const header = req.headers?.[releaseHeader]
    if (typeof header !== "string") return false
    const parts = /^(\d{13})\.([0-9a-f]{32})\.([0-9a-f]{64})$/.exec(header)
    if (!parts) return false
    const [, timestamp, nonce, mac] = parts
    if (Math.abs(now - Number(timestamp)) > validity) return false
    const port = req.socket.localPort
    if (!Number.isInteger(port) || port < 1 || port > 65535) return false
    const expected = signature(secret, port, path, timestamp, nonce)
    if (!timingSafeEqual(Buffer.from(mac, "hex"), Buffer.from(expected, "hex"))) return false
    for (const [key, expires] of consumed) {
      if (expires < now) consumed.delete(key)
    }
    if (consumed.has(header) || consumed.size >= 1024) return false
    consumed.set(header, Number(timestamp) + validity)
    return true
  } catch {
    return false
  }
}

/** 固定回环 TCP 连接，不使用代理、不跟随重定向，也不向日志或响应输出凭据。 */
export function requestLocalRelease(port, path, secret) {
  return new Promise(resolve => {
    let timer
    const finish = (success = false) => {
      clearTimeout(timer)
      resolve(success)
    }
    try {
      const req = http.request(
        {
          hostname: "127.0.0.1",
          port,
          path,
          method: "DELETE",
          agent: false,
          headers: {
            // 兼容旧版本仅检查 req.hostname 的交接流程。
            host: `localhost:${port}`,
            connection: "close",
            [releaseHeader]: signLocalRelease(secret, port, path),
          },
        },
        response => {
          response.resume()
          response.on("end", () => finish(response.statusCode === 200))
          response.on("error", () => finish())
        },
      )
      timer = setTimeout(() => req.destroy(new Error("本地端口释放请求超时")), 2000)
      req.on("error", () => finish())
      req.end()
    } catch {
      finish()
    }
  })
}

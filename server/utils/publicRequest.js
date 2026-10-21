import { lookup as dnsLookup } from "node:dns/promises"
import http from "node:http"
import https from "node:https"
import { isIP } from "node:net"

const redirectStatuses = new Set([301, 302, 303, 307, 308])
const maxResponseSize = 20 * 1024 * 1024
const requestTimeout = 15000

function requestError(message, status = 403) {
  return Object.assign(new Error(message), { status })
}

/** 仅允许可公开路由的 IP，排除回环、私网、链路本地、映射及保留地址。 */
export function isPublicAddress(address) {
  const family = isIP(address)
  if (family === 4) {
    const [a, b, c] = address.split(".").map(Number)
    return !(
      a === 0 ||
      a === 10 ||
      a === 127 ||
      a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && (b === 168 || (b === 0 && (c === 0 || c === 2)) || (b === 88 && c === 99))) ||
      (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100))) ||
      (a === 203 && b === 0 && c === 113)
    )
  }
  if (family === 6) {
    const normalized = new URL(`http://[${address}]/`).hostname.slice(1, -1)
    const [first, second = "0"] = normalized.split(":")
    const prefix = parseInt(first, 16)
    const subnet = parseInt(second || "0", 16)
    // 全球单播范围 2000::/3；额外排除协议分配、文档及 6to4 地址。
    return (
      prefix >= 0x2000 &&
      prefix <= 0x3fff &&
      prefix !== 0x2002 &&
      prefix !== 0x3fff &&
      !(prefix === 0x2001 && (subnet <= 0x1ff || subnet === 0xdb8))
    )
  }
  return false
}

/** 校验 URL 及全部 DNS 结果，后续连接必须使用返回的固定地址。 */
export async function resolvePublicTarget(input, lookup = dnsLookup) {
  let url
  try {
    url = new URL(input)
  } catch {
    throw requestError("无效的URL", 400)
  }
  if (!["http:", "https:"].includes(url.protocol)) {
    throw requestError("仅支持 http/https 协议", 400)
  }
  if (url.username || url.password) {
    throw requestError("中转地址不能包含身份凭据", 400)
  }
  const hostname = url.hostname
    .replace(/^\[|\]$/g, "")
    .replace(/\.$/, "")
    .toLowerCase()
  if (hostname === "localhost" || hostname.endsWith(".localhost") || hostname.endsWith(".local")) {
    throw requestError("禁止访问内部地址")
  }
  const family = isIP(hostname)
  let addresses
  try {
    addresses = family
      ? [{ address: hostname, family }]
      : await lookup(hostname, { all: true, verbatim: true })
  } catch {
    throw requestError("中转地址解析失败", 502)
  }
  if (!addresses.length || addresses.some(item => !isPublicAddress(item.address))) {
    throw requestError("禁止访问内部地址")
  }
  return { url, address: addresses[0].address, family: isIP(addresses[0].address) }
}

function withTimeout(promise, duration) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(requestError("中转请求超时", 504)), duration)
    promise.then(resolve, reject).finally(() => clearTimeout(timer))
  })
}

function requestOnce({ url, address, family }, method, duration, request, body) {
  return new Promise((resolve, reject) => {
    let timer
    let payload
    const finish = (error, response) => {
      clearTimeout(timer)
      error ? reject(error) : resolve(response)
    }
    const headers = { accept: "*/*" }
    if (method !== "GET" && method !== "HEAD" && body != null) {
      if (Buffer.isBuffer(body) || typeof body === "string") {
        payload = body
      } else {
        payload = JSON.stringify(body)
        headers["content-type"] = "application/json"
      }
      headers["content-length"] = Buffer.byteLength(payload)
    }
    const req = request(
      url,
      {
        method,
        // TRSS 的 node-fetch 实际为 global.fetch，不支持 agent；使用原生请求固定 DNS。
        agent: false,
        family,
        lookup(hostname, options, callback) {
          if (options?.all) {
            callback(null, [{ address, family }])
          } else {
            callback(null, address, family)
          }
        },
        headers,
        maxHeaderSize: 16 * 1024,
      },
      response => {
        const { statusCode: status, headers } = response
        if (status < 200 || status >= 300) {
          response.destroy()
          return finish(null, { status, headers, body: Buffer.alloc(0) })
        }
        let size = 0
        const chunks = []
        response.on("data", chunk => {
          size += chunk.length
          if (size > maxResponseSize) {
            req.destroy(requestError("中转响应超过大小限制", 502))
            return
          }
          chunks.push(chunk)
        })
        response.on("end", () => finish(null, { status, headers, body: Buffer.concat(chunks) }))
        response.on("error", finish)
        response.on("aborted", () => finish(requestError("中转响应中断", 502)))
      },
    )
    timer = setTimeout(() => req.destroy(requestError("中转请求超时", 504)), duration)
    req.on("error", finish)
    req.end(payload)
  })
}

/** 保留原有中转方法及请求体，逐跳固定公网地址，不转发面板凭据。 */
export async function requestPublicResource(input, method = "GET", dependencies = {}) {
  if (typeof method !== "string" || !/^[A-Z]+$/.test(method)) {
    throw requestError("无效的请求方法", 400)
  }
  let { body } = dependencies
  const lookup = dependencies.lookup || dnsLookup
  const request =
    dependencies.request ||
    ((url, options, callback) =>
      (url.protocol === "https:" ? https : http).request(url, options, callback))
  const deadline = Date.now() + requestTimeout
  for (let redirects = 0; redirects <= 5; redirects++) {
    const remaining = deadline - Date.now()
    if (remaining <= 0) {
      throw requestError("中转请求超时", 504)
    }
    const target = await withTimeout(resolvePublicTarget(input, lookup), remaining)
    const response = await requestOnce(
      target,
      method,
      Math.max(1, deadline - Date.now()),
      request,
      body,
    )
    if (!redirectStatuses.has(response.status)) {
      return response
    }
    if (!response.headers.location || redirects === 5) {
      throw requestError("中转重定向无效或次数过多", 502)
    }
    // 与 fetch 一致：303（HEAD 除外）以及 POST 的 301/302 跳转改为 GET。
    if (
      (response.status === 303 && method !== "HEAD") ||
      ((response.status === 301 || response.status === 302) && method === "POST")
    ) {
      method = "GET"
      body = undefined
    }
    try {
      input = new URL(response.headers.location, target.url).toString()
    } catch {
      throw requestError("中转重定向地址无效", 502)
    }
  }
}

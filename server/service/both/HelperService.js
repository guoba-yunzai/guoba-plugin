import path from "path"
import fetch from "node-fetch"
import { Result, Service, GuobaError } from "#guoba.framework"
import { _paths } from "#guoba.platform"
import { readJson } from "#guoba.utils"
import { requestPublicResource } from "../../utils/publicRequest.js"

export default class HelperService extends Service {
  /** 转发请求 */
  async transitRequest(req, res) {
    const { url } = req.query
    if (typeof url !== "string" || !url) {
      return Result.error("url不能为空", 400)
    }
    try {
      let parsed
      try {
        parsed = new URL(url)
      } catch {
        // 兼容旧调用方额外编码一次的 URL，同时避免对合法 URL 再解码。
        try {
          parsed = new URL(decodeURIComponent(url))
        } catch {
          return Result.error("无效的URL", 400)
        }
      }
      for (const [name, value] of Object.entries(req.query)) {
        if (!["url", "token"].includes(name.toLowerCase())) parsed.searchParams.append(name, value)
      }
      const { status, headers, body } = await requestPublicResource(parsed.toString(), req.method, {
        body: req.body,
      })
      if (status < 200 || status >= 300) {
        return Result.error("请求失败", status)
      }
      res.setHeader("Content-Security-Policy", "sandbox; default-src 'none'")
      res.setHeader("X-Content-Type-Options", "nosniff")
      res.setHeader("Referrer-Policy", "no-referrer")
      for (const name of [
        "content-type",
        "content-length",
        "content-encoding",
        "cache-control",
        "etag",
        "last-modified",
        "expires",
      ]) {
        if (headers[name]) res.setHeader(name, headers[name])
      }
      return body
    } catch (error) {
      return Result.error(error.status ? error.message : "中转请求失败", error.status || 502)
    }
  }

  /** 获取天气（中国天气网） */
  async getWeather(city) {
    let cityCode
    if (/^\d{9}$/.test(city)) {
      cityCode = city
    } else {
      let cityJsonPath = path.join(_paths.pluginResources, "json/city.json")
      let cityMap = readJson(cityJsonPath)
      cityCode = cityMap[city]
      if (!cityCode) {
        return `城市${city}不存在或不支持`
      }
    }
    let url = `http://www.weather.com.cn/data/cityinfo/${cityCode}.html`
    let response
    try {
      response = await fetch(url)
    } catch (e) {
      logger.error(e)
      throw new GuobaError("天气接口查询失败，请稍后再试")
    }
    if (response.status !== 200) {
      throw new GuobaError("天气接口查询失败：" + response.status)
    }
    let res = await response.json()
    // noinspection SpellCheckingInspection
    let { weatherinfo: weatherInfo } = res
    if (weatherInfo) {
      let { city, temp1, temp2, weather } = weatherInfo
      return `${city}今日${weather}，最低温${temp1}，最高温${temp2}`
    } else {
      logger.warn("获取天气数据失败", res)
      throw new GuobaError("获取天气数据失败，请稍后再试")
    }
  }

  /** 获取天气 */
  async getWeather_old(city) {
    let url = `http://wthrcdn.etouch.cn/weather_mini?city=${city}`
    let response
    try {
      response = await fetch(url)
    } catch (e) {
      throw new GuobaError("天气接口查询失败，请稍后再试")
    }
    let res = await response.json()
    let { status, data } = res
    if (status === 1000) {
      return data
    } else if (status === 1002) {
      throw new GuobaError(`城市：${city} 数据不存在`)
    } else {
      logger.warn("获取天气数据失败", res)
      throw new GuobaError("获取天气数据失败，请稍后再试")
    }
  }
}

import path from 'path'
import fetch from 'node-fetch'
import {_paths, readJson} from '../../../utils/common.js'

const Result = await Guoba.GID('#/components/Result.js')
const Service = await Guoba.GID('#/components/Service.js')
const GuobaError = await Guoba.GID('@/components/GuobaError.js')

export default class HelperService extends Service {
  constructor(app) {
    super(app)
  }

  /** 转发请求 */
  async transitRequest(req, res) {
    let {url} = req.query
    if (!url) {
      return Result.error('url不能为空', 400)
    }
    url = decodeURIComponent(url)
    url = new URL(url)
    for (const [name, value] of Object.entries(req.query)) {
      if (name === 'url') {
        continue
      }
      url.searchParams.append(name, value)
    }
    let response = await fetch(url.toString(), {
      method: req.method,
      body: req.method === 'GET' ? undefined : req.body,
    })
    if (!response.ok) {
      return Result.error('请求失败', response.status)
    }
    for (const [key, value] of response.headers.entries()) {
      // 去掉压缩头
      if (key.toLowerCase() === 'content-encoding') {
        continue
      }
      res.setHeader(key, value)
    }
    let buffer = await response.arrayBuffer()
    buffer = Buffer.from(buffer)
    return buffer
  }

  /** 获取天气（中国天气网） */
  async getWeather(city) {
    let cityCode
    if (/^\d{9}$/.test(city)) {
      cityCode = city
    } else {
      let cityJsonPath = path.join(_paths.pluginResources, 'json/city.json')
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
      throw new GuobaError('天气接口查询失败，请稍后再试')
    }
    if (response.status !== 200) {
      throw new GuobaError('天气接口查询失败：' + response.status)
    }
    let res = await response.json()
    // noinspection SpellCheckingInspection
    let {weatherinfo: weatherInfo} = res
    if (weatherInfo) {
      let {city, temp1, temp2, weather} = weatherInfo
      return `${city}今日${weather}，最低温${temp1}，最高温${temp2}`
    } else {
      logger.warn('获取天气数据失败', res)
      throw new GuobaError('获取天气数据失败，请稍后再试')
    }
  }

  /** 获取天气 */
  async getWeather_old(city) {
    let url = `http://wthrcdn.etouch.cn/weather_mini?city=${city}`
    let response
    try {
      response = await fetch(url)
    } catch (e) {
      throw new GuobaError('天气接口查询失败，请稍后再试')
    }
    let res = await response.json()
    let {status, data} = res
    if (status === 1000) {
      return data
    } else if (status === 1002) {
      throw new GuobaError(`城市：${city} 数据不存在`)
    } else {
      logger.warn('获取天气数据失败', res)
      throw new GuobaError('获取天气数据失败，请稍后再试')
    }
  }

}
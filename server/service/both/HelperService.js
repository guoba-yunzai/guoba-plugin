import fetch from 'node-fetch'

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

  /** 获取天气 */
  async getWeather(city) {
    let url = `http://wthrcdn.etouch.cn/weather_mini?city=${city}`
    let response = await fetch(url)
    let res = await response.json()
    let {status, data} = res
    if (status === 1000) {
      return data
    } else if (status === 1002) {
      throw new GuobaError(`城市：${city} 数据不存在`)
    } else {
      console.error(res)
      throw new GuobaError('获取天气数据失败，请稍后再试')
    }
  }

}
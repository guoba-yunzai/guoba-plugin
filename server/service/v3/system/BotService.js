import { MysInfo, MysUser } from '#guoba.adapter'

const IBotService = await Guoba.GID('#/service/interface/IBotService.js')

export class BotService extends IBotService {
  constructor(app) {
    super(app)
  }

  async getUserCookies() {
    return await MysInfo.getBingCkUid()
  }

  /** 获取 cookie 用户数量 */
  async getCookieCount() {
    let err
    // 新版获取方式（调用用户统计）
    try {
      err = null
      await MysInfo.initCache()
      const stat = await MysUser.getStatData()
      return stat.count.total
    } catch (e) {
      err = e
    }
    try {
      err = null
      // 旧版获取方式
      let cookies = await MysInfo.getBingCkUid()
      return cookies ? Object.keys(cookies).length : '-1'
    } catch (e) {
      err = e
    }
    if (err) {
      console.error(err)
    }
    return '-1'
  }

}
const Result = await Guoba.GID('#/components/Result.js')
const {autowired} = await Guoba.GI('#/loader/injection.js')
const RestController = await Guoba.GID('#/components/RestController.js')
const cfg = await Guoba.GID('cfg')

/**
 * 首页相关查询
 */
export class HomeController extends RestController {

  botService = autowired('botService')
  oicqService = autowired('oicqService')

  constructor(app) {
    super('/home', app)
  }

  registerRouters() {
    this.get('/data', this.getHomeData)
  }

  /** 获取首页数据 */
  async getHomeData() {
    let cookies = await this.botService.getUserCookies()
    return Result.ok({
      cookieCount: Object.keys(cookies).length,
      friendCount: await this.oicqService.getFriendCount(),
      groupCount: await this.oicqService.getGroupCount(),
    })
  }

}

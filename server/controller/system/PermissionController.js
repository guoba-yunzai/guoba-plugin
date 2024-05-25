import {autowired, Result} from '#guoba.framework'
import {ApiController} from '#guoba.platform'

export class PermissionController extends ApiController {

  systemService = autowired('systemService')

  constructor(guobaApp) {
    super('', guobaApp)
  }

  registerRouters() {
    this.get('/getPermCode', this.getPermCode)
    this.get('/getMenuList', this.getMenuList)
  }

  // 获取用户权限
  async getPermCode(req) {
    return Result.ok({
      permCode: ['sa'],
      liteToken: this.systemService.getLiteToken(),
    })
  }

  async getMenuList() {
    let menus = await this.systemService.queryMenus()
    return Result.ok(menus)
  }
}

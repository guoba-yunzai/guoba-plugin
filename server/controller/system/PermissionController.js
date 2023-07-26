import {autowired, Result, RestController} from '#guoba.framework';

export class PermissionController extends RestController {

  systemService = autowired('systemService')

  constructor(app) {
    super('', app)
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

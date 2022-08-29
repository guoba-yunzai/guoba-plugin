const Result = await Guoba.GID('#/components/Result.js')
const RestController = await Guoba.GID('#/components/RestController.js')
const {autowired} = await Guoba.GI('#/loader/injection.js')

/** QQ相关操作 */
export class OicqController extends RestController {

  oicqService = autowired('oicqService')

  constructor(app) {
    super('/oicq', app)
  }

  registerRouters() {
    this.get('/pick/user', this.pickUser)
    this.get('/pick/group', this.pickGroup)

    // avatarUrl: `https://q1.qlogo.cn/g?b=qq&s=${0}&nk=${qq}`,
    this.get('/friend/list', () => Result.ok(this.oicqService.getFriendList()))
    this.get('/friend/count', () => Result.ok(this.oicqService.getFriendCount()))
  }

  /** 获取一个QQ用户信息 */
  async pickUser(req) {
    let {qq} = req.query
    if (!qq) {
      return Result.error(`参数 qq 不能为空`)
    }
    let user = await this.oicqService.pickUser(qq)
    return Result.ok(user)
  }

  /** 获取一个QQ群组信息 */
  async pickGroup(req) {
    let {groupId} = req.query
    if (!groupId) {
      return Result.error(`参数 groupId 不能为空`)
    }
    let group = this.oicqService.pickGroup(groupId)
    return Result.ok(group)
  }

}
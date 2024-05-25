import {autowired, Pager, Result} from '#guoba.framework'
import {ApiController} from '#guoba.platform'

/** QQ相关操作 */
export class OicqController extends ApiController {

  oicqService = autowired('oicqService')

  constructor(guobaApp) {
    super('/oicq', guobaApp)
  }

  registerRouters() {
    this.get('/pick/user', this.pickUser)
    this.get('/pick/group', this.pickGroup)

    // avatarUrl: `https://q1.qlogo.cn/g?b=qq&s=${0}&nk=${qq}`,
    this.get('/friend/list', this.queryFriendList)
    this.get('/friend/count', () => Result.ok(this.oicqService.getFriendCount()))

    this.get('/group/list', this.queryGroupList)
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
    let group = await this.oicqService.pickGroup(groupId)
    return Result.ok(group)
  }

  async queryGroupList(req) {
    let {pageNo, pageSize, group_id, query_group_id, query_name} = req.query
    pageNo = !pageNo ? 1 : Number.parseInt(pageNo)
    pageSize = !pageSize ? 10 : Number.parseInt(pageSize)

    let groupList = Bot.getGroupMap?.() || Bot.getGroupList()
    let list = []
    let filter = (_) => true
    // 根据 group_id 模糊查询
    if (query_group_id || query_name) {
      filter = (item) => {
        let flag = true
        if (query_group_id) {
          flag = String(item.group_id).includes(query_group_id)
        }
        // 根据群名称或备注模糊筛选
        if (query_name && flag) {
          flag = String(item.group_name).includes(query_name)
        }
        return flag
      }
    }
    // 根据group_id过滤
    let groupId = group_id ? group_id.split(',').map(u => Number(u) || u) : null
    if (groupId && groupId.length > 0) {
      pageNo = 1
      pageSize = groupId.length
      filter = (item) => groupId.includes(item.group_id)
    }

    for (let [, item] of groupList) {
      if (filter(item)) {
        list.push(item)
      }
    }

    let page = new Pager(list, pageNo, pageSize)
    return Result.ok(page.toJSON())
  }

  async queryFriendList(req) {
    let {pageNo, pageSize, user_id, query_qq, query_name} = req.query
    pageNo = !pageNo ? 1 : Number.parseInt(pageNo)
    pageSize = !pageSize ? 10 : Number.parseInt(pageSize)

    let friendList = Bot.getFriendMap?.() || Bot.getFriendList()
    let list = []
    let filter = (_) => true
    // 根据 qq 模糊查询
    if (query_qq || query_name) {
      filter = (item) => {
        let flag = true
        if (query_qq) {
          flag = String(item.user_id).includes(query_qq)
        }
        // 根据昵称或备注模糊筛选
        if (query_name && flag) {
          flag = String(item.nickname).includes(query_name) || String(item.remark).includes(query_name)
        }
        return flag
      }
    }
    // 根据user_id过滤
    let userId = user_id ? user_id.split(',').map(u => Number(u) || u) : null
    if (userId && userId.length > 0) {
      pageNo = 1
      pageSize = userId.length
      filter = (item) => userId.includes(item.user_id)
    }

    for (let [, item] of friendList) {
      if (filter(item)) {
        list.push(item)
      }
    }

    let page = new Pager(list, pageNo, pageSize)
    return Result.ok(page.toJSON())
  }

}

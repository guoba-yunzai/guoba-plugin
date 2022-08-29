const Service = await Guoba.GID('#/components/Service.js')
const {toPairsMap} = await Guoba.GI('@/utils/common.js')

export class OicqService extends Service {
  constructor(app) {
    super(app)
  }

  /** 获取一个QQ用户信息 */
  async pickUser(qq) {
    let user = Bot.pickUser(qq)
    return {
      userId: user.uid,
      simpleInfo: await user.getSimpleInfo(),
    }
  }

  /** 获取一个QQ群组信息 */
  async pickGroup(groupId) {
    let group = Bot.pickGroup(Number.parseInt(groupId))
    return {
      groupId: group.gid,
      info: group.info,
    }
  }

  getFriendList() {
    return toPairsMap(Bot.getFriendList())
  }

  getFriendCount() {
    return Bot.getFriendList().size
  }

  getGroupList() {
    return toPairsMap(Bot.getGroupList())
  }

  getGroupCount() {
    return Bot.getGroupList().size
  }

}
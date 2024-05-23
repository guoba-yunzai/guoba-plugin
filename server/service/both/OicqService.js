import {Service} from '#guoba.framework';
import {toPairsMap} from '#guoba.utils'

export class OicqService extends Service {
  constructor(app) {
    super(app)
  }

  /** 获取一个QQ用户信息 */
  async pickUser(userId) {
    userId = Number(userId) || userId
    const user = Bot.pickUser(userId)
    return {
      userId,
      simpleInfo: user.info || await user.getInfo?.() || await user.getSimpleInfo?.(),
    }
  }

  /** 获取一个QQ群组信息 */
  async pickGroup(groupId) {
    groupId = Number(groupId) || groupId
    const group = Bot.pickGroup(groupId)
    return {
      groupId,
      info: group.info || await group.getInfo?.(),
    }
  }

  getFriendList() {
    return toPairsMap(Bot.getFriendMap?.() || Bot.getFriendList())
  }

  getFriendCount() {
    return (Bot.getFriendMap?.() || Bot.getFriendList()).size
  }

  getGroupList() {
    return toPairsMap(Bot.getGroupMap?.() || Bot.getGroupList())
  }

  getGroupCount() {
    return (Bot.getGroupMap?.() || Bot.getGroupList()).size
  }
}
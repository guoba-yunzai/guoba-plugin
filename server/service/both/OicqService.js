import {Service} from '#guoba.framework';
import {toPairsMap} from '#guoba.utils'

export class OicqService extends Service {
  constructor(app) {
    super(app)
  }

  /** 获取一个QQ用户信息 */
  async pickUser(userId) {
    userId = Number(userId) || userId
    let user = null
    try {
      user = Bot.pickUser(userId)
    } catch (e) {
      // 非 QQ 适配器（如微信个人号）可能不支持 pickUser，安全降级
      logger.warn?.(`[Guoba] 当前适配器不支持 pickUser: ${e?.message || e}`)
      return { userId, simpleInfo: null }
    }
    return {
      userId,
      simpleInfo: user.info || await user.getInfo?.() || await user.getSimpleInfo?.(),
    }
  }

  /** 获取一个QQ群组信息 */
  async pickGroup(groupId) {
    groupId = Number(groupId) || groupId
    let group = null
    try {
      group = Bot.pickGroup(groupId)
    } catch (e) {
      // 非 QQ 适配器（如微信个人号）可能不支持 pickGroup，安全降级
      logger.warn?.(`[Guoba] 当前适配器不支持 pickGroup: ${e?.message || e}`)
      return { groupId, info: null }
    }
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
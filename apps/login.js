import { autowired } from '#guoba.framework'
import { makeForwardMsg } from '#guoba.utils'
import { cfg } from '#guoba.platform'

export class GuobaLogin extends plugin {
  loginService = autowired('loginService')

  constructor (e) {
    super({
      name: '锅巴登录',
      dsc: '锅巴快捷登录',
      event: 'message',
      priority: 100,
      rule: [
        {
          reg: '^#?锅巴(登录|登陆)$',
          fnc: 'login'
        }
      ]
    }, e)
  }

  async login () {
    if (!this.e.isMaster) return false

    let webAddress
    try {
      webAddress = await this.loginService.setQuickLogin(this.e.user_id)
    } catch (e) {
      console.error(e)
      return this.reply(
        '锅巴服务启动失败，可能是端口号占用，或者依赖没有安装完整，请发送“#锅巴帮助”获取相关帮助信息。'
      )
    }

    const onlyCustomAddress = cfg.get('base.onlyCustomAddress')
    const { custom, local, remote } = webAddress
    const message = ['欢迎回来主人~\n这是您的登录地址：']

    if (onlyCustomAddress) {
      if (custom && custom.length > 0) {
        message.push('自定义地址：\n' + custom.join('\n'))
      } else {
        message.push('当前启用了“仅发送自定义地址”，但未配置自定义地址。')
      }
    } else {
      if (custom && custom.length > 0) {
        message.push('自定义地址：\n' + custom.join('\n'))
      }
      if (local) {
        message.push('内网地址：\n' + (local.length > 0 ? local.join('\n') : '获取失败……'))
      }
      if (remote) {
        message.push('外网地址：\n' + (remote.length > 0 ? remote.join('\n') : '获取失败……'))
      }
    }

    message.push(
      '临时令牌3分钟内有效（请勿轻易告知他人哦），使用过后会立即失效，若登录成功将会在使用者的浏览器上生成个24小时内有效的令牌，过期后需要重新登录~'
    )

    if (this.e?.platform) {
      message.push('[请在后台查看地址]')
      for (const item of message) {
        console.log(item)
        this.e.reply(item)
      }
      return
    }

    if (this.e.isGroup && !cfg.get('base.loginInGroup')) {
      try {
        await Bot.pickUser(this.e.user_id).sendMsg(
          await this.e.runtime.common.makeForwardMsg(this.e, message)
        )
        await this.reply('地址已发送至主人的私信了~')
      } catch (e) {
        logger.error(e)
        await this.reply('消息发送失败~请加Bot的好友或者私聊发送#锅巴登录')
      }
    } else {
      await this.reply(await makeForwardMsg(this.e, message))
    }
  }
}

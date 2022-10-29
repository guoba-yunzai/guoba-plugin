import {makeForwardMsg} from '../utils/common.js'

const {autowired} = await Guoba.GI('#/loader/injection.js')

export class GuobaLogin extends plugin {

  loginService = autowired('loginService')

  constructor(e) {
    super({
      name: '锅巴登录',
      dsc: '锅巴快捷登录',
      event: 'message',
      priority: 100,
      rule: [
        {
          reg: '^#?锅巴(登录|登陆)$',
          fnc: 'login',
        },
      ],
    }, e)
  }

  async login() {
    if (!this.e.isMaster) return false
    if (this.e.isGroup) {
      this.e.reply('请私聊使用锅巴~')
      return true
    }
    let webAddress
    try {
      webAddress = await this.loginService.setQuickLogin(this.e.user_id)
    } catch (e) {
      console.error(e)
      return this.reply('锅巴服务启动失败，可能是端口号占用，或者依赖没有安装完整，请发送“#锅巴帮助”获取相关帮助信息。')
    }
    let {custom, local, remote} = webAddress
    let message = [`欢迎回来主人~\n这是您的登录地址：`]
    if (custom && custom.length > 0) {
      message.push(`自定义地址：\n` + custom.join('\n'))
    }
    if (local) {
      let hosts = local.length > 0 ? local.join('\n') : '获取失败……'
      message.push(`内网地址：\n` + hosts)
    }
    if (remote) {
      let hosts = remote.length > 0 ? remote.join('\n') : '获取失败……'
      message.push(`外网地址：\n` + hosts)
    }
    message.push(`临时令牌3分钟内有效（请勿轻易告知他人哦），使用过后会立即失效，若登录成功将会在使用者的浏览器上生成个24小时内有效的令牌，过期后需要重新登录~`)
    return this.reply(await makeForwardMsg(this.e, message))
  }

}

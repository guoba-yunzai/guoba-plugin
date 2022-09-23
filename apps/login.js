const {autowired} = await Guoba.GI('#/loader/injection.js')

export class GuobaLogin extends plugin {

  loginService = autowired('loginService')

  constructor() {
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
    })
  }

  async login() {
    if (!this.e.isMaster) return false
    if (this.e.isGroup) {
      this.e.reply('请私聊使用锅巴~')
      return true
    }
    let host
    try {
      host = this.loginService.setQuickLogin(this.e.user_id)
    } catch {
      return this.reply('锅巴服务启动失败，可能是端口号占用，或者依赖没有安装完整，请发送“#锅巴帮助”获取相关帮助信息。')
    }
    return this.reply([
      `欢迎回来主人~ 这是您的登录地址：\n`,
      host,
      `\n该地址3分钟内有效，请勿告知他人哦~`,
    ])
  }

}

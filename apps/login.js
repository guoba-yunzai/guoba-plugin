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
          reg: '^#锅巴登录$',
          fnc: 'login',
        },
      ],
    })
  }

  async login() {
    if (!this.e.isMaster) return false
    if (this.e.isGroup) {
      this.e.reply("请私聊使用锅巴~")
      return true
    }
    let host = this.loginService.setQuickLogin(this.e.user_id)
    return this.reply([
      `欢迎回来主人~ 这是您的登录地址：\n`,
      host,
      `\n该地址3分钟内有效，请勿告知他人哦~`,
    ])
  }

}

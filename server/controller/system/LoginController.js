const Result = await Guoba.GID('#/components/Result.js')
const {autowired} = await Guoba.GI('#/loader/injection.js')
const RestController = await Guoba.GID('#/components/RestController.js')

export class LoginController extends RestController {

  loginService = autowired('loginService')

  constructor(app) {
    super('', app)
  }

  registerRouters() {
    this.post('/login', this.login)
    this.post('/logout', this.logout)
    // 主人快速登录
    this.post('/login/quick', this.quickLogin)
  }

  async login(req) {
    // let {username, password} = req.body
    // if (username === 'admin' && password === 'admin') {
    //   let token = this.loginService.signToken(username)
    //   return Result.ok({token})
    // }
    // return Result.error('用户名或密码错误')
    return Result.error('请使用“#锅巴登录”')
  }

  async logout(req) {
    let {token} = req.body
    this.loginService.logout(token)
    return Result.ok('注销成功')
  }

  async quickLogin(req) {
    let {code} = req.body
    return Result.ok(await this.loginService.getQuickLogin(code))
  }

}

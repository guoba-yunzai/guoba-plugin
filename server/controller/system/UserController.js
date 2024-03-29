import {Result, RestController} from '#guoba.framework';

export class UserController extends RestController {
  constructor(app) {
    super('/user', app)
  }

  registerRouters() {
    this.get('/getLoginUser', this.getLoginUser)
  }

  // 获取登录用户
  async getLoginUser(req) {
    return Result.ok({
      userId: Bot.uin,
      username: Bot.uin,
      realName: Bot.nickname,
      avatar: '',
      desc: '',
      homePath: '/home',
      roles: [
        {roleName: '超级管理员', value: 'sa'},
      ],
    })
  }
}
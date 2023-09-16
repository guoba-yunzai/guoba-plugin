import jwt from 'jsonwebtoken'
import {Decorator, GuobaError} from '#guoba.framework'
import {Constant} from '#guoba.platform'

/**
 * 请求装饰器，解析token等操作
 */
export default class ReqDecorator extends Decorator {
  constructor() {
    super({})
  }

  async execute(pjp, req, res) {
    // 从headers中获取token
    req.getToken = function () {
      return req.headers[Constant.TOKEN_KEY]
    }
    // 解码token
    req.decodeToken = function () {
      let token = req.getToken()
      if (token) {
        return jwt.decode(token)
      }
    }
    // TODO 获取当前登录用户信息
    req.getUser = function () {
      let token = req.getToken()
      if (!token) throw new GuobaError('登录态失效')
    }
  }
}
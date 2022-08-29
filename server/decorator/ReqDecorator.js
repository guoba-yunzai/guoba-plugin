import jwt from 'jsonwebtoken'

const Constant = await Guoba.GID('#/constant/Constant.js')
const Decorator = await Guoba.GID('#/components/Decorator.js')
const GuobaError = await Guoba.GID('@/components/GuobaError.js')

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
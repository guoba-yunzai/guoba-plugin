/**
 * 全局返回结果
 *
 * @class
 * @typedef {Class<Result>} GuobaResult
 * @property {Function} ok 成功
 * @property {Function} error 失败
 * @property {ResultNoLogin} noLogin 未登录
 * @property {ResultNoAuth} noAuth 无权限
 * @property {ResultNotFound} notFound 未找到
 * @property {ResultUnrealized} unrealized 尚未实现
 */
export default class Result {
  constructor(code, result, message, httpStatus = 200) {
    this.code = code
    this.result = result
    this.message = message
    this.httpStatus = httpStatus
  }

  /**
   * 成功
   * @typedef {ok} ResultOk
   * @static
   * @param result 返回结果
   * @param message 返回消息
   * @returns {Result}
   */
  static ok(result, message = 'ok') {
    return new Result(0, result, message)
  }

  /**
   * 错误
   * @typedef {error} ResultError
   * @static
   * @returns {Result}
   */
  static error(...args) {
    switch (args.length) {
      // Result.error(code)
      // Result.error(reason)
      case 1:
        if (typeof args[0] === 'number') {
          return new Result(args[0], {}, 'error')
        } else {
          return new Result(-1, {}, args[0])
        }
      // Result.error(code, reason)
      // Result.error(reason, result)
      // Result.error(reason, httpStatus)
      case 2:
        if (typeof args[0] === 'number') {
          return new Result(args[0], {}, args[1] ?? 'error')
        } else if (typeof args[1] === 'number') {
          return new Result(-1, {}, args[0], args[1])
        } else {
          return new Result(-1, args[1], args[0])
        }
      // Result.error(code, reason, result)
      // Result.error(reason, result, httpStatus)
      case 3:
        if (typeof args[0] === 'number') {
          return new Result(args[0], args[1], args[2])
        } else {
          return new Result(-1, args[0], args[1], args[2])
        }
      // Result.error(code, reason, result, httpStatus)
      case 4:
        return new Result(args[0], args[1], args[2], args[3])
    }
  }

  /**
   * 尚未登录
   *
   * @typedef {noLogin} ResultNoLogin
   * @returns {Result}
   */
  static noLogin() {
    return new Result(401, null, 'Token失效或尚未登录', 401)
  }

  /**
   * 尚未授权
   *
   * @typedef {noAuth} ResultNoAuth
   * @returns {Result}
   */
  static noAuth() {
    return new Result(403, null, '没有权限', 403)
  }

  /**
   * 404未找到
   *
   * @typedef {notFound} ResultNotFound
   * @returns {Result}
   */
  static notFound() {
    return new Result(404, null, '404 Not Found', 404)
  }

  /**
   * 功能尚未实现
   *
   * @typedef {unrealized} ResultUnrealized
   * @returns {Result}
   */
  static unrealized() {
    return new Result(501, null, '该功能在当前版本中尚未实现', 501)
  }

  get isOk() {
    return this.code === 0
  }

  toJSON() {
    return {
      ok: this.isOk,
      code: this.code,
      result: this.result,
      message: this.message,
    }
  }
}

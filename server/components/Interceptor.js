/**
 * 拦截器
 */
export default class Interceptor {

  constructor(app) {
    this.app = app
    this.app.use(this.handler.bind(this))
  }

  handler() {

  }

  /** 加载优先级 */
  static priority = 1000

}

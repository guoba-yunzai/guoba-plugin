/**
 * 拦截器基类
 */
export default class Interceptor {
  /**
   * @param {GuobaApplication} guobaApp
   */
  constructor(guobaApp) {
    this.guobaApp = guobaApp
    this.app = this.guobaApp.app
    this.app.use(this.handler.bind(this))
  }

  handler() {

  }

  /** 加载优先级 */
  static priority = 1000

}

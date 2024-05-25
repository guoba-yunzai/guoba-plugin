/**
 * 服务基类
 */
export default class Service {
  /**
   * @param {GuobaApplication} guobaApp
   */
  constructor(guobaApp) {
    this.guobaApp = guobaApp
    this.app = this.guobaApp.app
  }

  static priority = 1000
}
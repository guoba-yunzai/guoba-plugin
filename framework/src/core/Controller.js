/**
 * 控制器基类
 */
export default class Controller {
  /**
   * @param {GuobaApplication} guobaApp
   */
  constructor(guobaApp) {
    this.guobaApp = guobaApp
    this.app = this.guobaApp.app
    this.created()
  }

  created() {
  }

  /** 加载优先级 */
  static priority = 1000

}

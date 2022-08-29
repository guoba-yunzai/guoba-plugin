/**
 * controller
 */
export default class Controller {
  constructor(app) {
    this.app = app
    this.created()
  }

  created() {
  }

  /** 加载优先级 */
  static priority = 1000

}

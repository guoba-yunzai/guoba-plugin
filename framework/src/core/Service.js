/**
 * 服务基类
 */
export default class Service {
  constructor(app) {
    this.app = app
  }

  static priority = 1000
}
/**
 * 装饰器（伪）基类
 */
export default class Decorator {

  constructor(config) {
    this.config = config
  }

  execute() {

  }

  /** 加载优先级 */
  static priority = 1000

}

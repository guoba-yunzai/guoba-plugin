import {RestController, Result} from '#guoba.framework'

/** 错误处理 */
export default class ErrorController extends RestController {
  constructor(app) {
    super('', app)
  }

  registerRouters() {
    this.all('*', this.handle404)
  }

  handle404(req, res) {
    return Result.notFound()
  }

  /** 加载优先级 */
  static priority = 99999

}
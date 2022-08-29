const Result = await Guoba.GID('#/components/Result.js')
const RestController = await Guoba.GID('#/components/RestController.js')

/** 错误处理 */
export default class ErrorController extends RestController {
  constructor(app) {
    super('', app)
  }

  created() {
    this.app.all('*', function (req, res) {
      let result = Result.notFound()
      res.status(result.httpStatus).json(result.toJSON())
    })
  }

  /** 加载优先级 */
  static priority = 99999

}
import express from 'express'

const Result = await Guoba.GID('#/components/Result.js')
const Controller = await Guoba.GID('#/components/Controller.js')
const ReqDecorator = await Guoba.GID('#/decorator/ReqDecorator.js')
const Constant = await Guoba.GID('#/constant/Constant.js')
const GuobaError = await Guoba.GID('@/components/GuobaError.js')

const DEFAULT_OPTIONS = {}

/**
 * restful controller
 */
export default class RestController extends Controller {
  /**
   *
   * @param prefix
   * @param app
   * @param options
   */
  constructor(prefix = '/', app, options = {}) {
    super(app)
    this.options = Object.assign({}, DEFAULT_OPTIONS, options)
    // 创建路由
    this.router = express.Router()
    // 注册路由
    this.registerRouters()
    this.app.use(`/api${prefix}`, this.router)
  }

  /** 注册路由 */
  registerRouters() {
  }

  all(path, handler, decorators) {
    this.http('all', path, handler, decorators)
  }

  get(path, handler, decorators) {
    this.http('get', path, handler, decorators)
  }

  post(path, handler, decorators) {
    this.http('post', path, handler, decorators)
  }

  put(path, handler, decorators) {
    this.http('put', path, handler, decorators)
  }

  delete(path, handler, decorators) {
    this.http('delete', path, handler, decorators)
  }

  /**
   * 处理http请求
   *
   * @param methods 请求方法
   * @param path 请求路径
   * @param handler 请求处理函数
   * @param decorators 伪装饰器（由于现版本node还不支持，所以暂时使用这种方式替代）
   */
  http(methods, path, handler, decorators = []) {
    let isAll = methods === 'all'
    if (!isAll) {
      if (!methods) throw new Error('methods is required')
      methods = Array.isArray(methods) ? methods : [methods]
      methods = methods.map(method => method.toUpperCase())
    }
    this.router.all(path, async (req, res, next) => {
      if (!isAll && !methods.includes(req.method)) {
        return next()
      }
      let result = null
      let isCalled = false
      // ProceedingJoinPoint
      let pjp = {
        proceed: async () => {
          if (!isCalled) {
            try {
              result = await handler.call(this, req, res)
            } catch (e) {
              if (e === Constant.ERROR_501) {
                result = Result.unrealized()
              } else if (e instanceof Result) {
                result = e
              } else if (e instanceof GuobaError) {
                result = Result.error(e.message)
              } else {
                console.error(e)
                result = Result.error(e.message || e.toString())
              }
            }
            isCalled = true
          }
          return result
        },
      }
      // 执行装饰器
      decorators.unshift(new ReqDecorator())
      for (const decorator of decorators) {
        let ret = await decorator.execute(pjp, req, res)
        if (ret instanceof Result) {
          isCalled = true
          result = ret
          break
        }
      }
      if (!isCalled) {
        result = await pjp.proceed()
      }
      if (result != null) {
        if (result instanceof Result) {
          res.status(result.httpStatus)
          res.json(result.toJSON())
        } else if (result === Constant.VOID) {
        } else {
          res.send(result)
        }
      } else {
        res.send(result)
      }
    })
  }
}

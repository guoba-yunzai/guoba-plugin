import {autowired, Result} from '#guoba.framework'
import {ApiController} from '#guoba.platform'
import {sleep} from '#guoba.utils'

/**
 * 系统相关
 */
export class SystemController extends ApiController {

  systemService = autowired('systemService')

  constructor(guobaApp) {
    super('/sys', guobaApp)
  }

  registerRouters() {
    this.post('/restart-guoba', this.doRestartGuoba)

    this.put('/fs/create-dir', this.putCreateDir)
    this.get('/fs/tree/root', this.getFsTreeRoot)
    this.get('/fs/tree/children', this.getFsTreeChildren)
  }

  async doRestartGuoba() {
    if (Guoba && Guoba.reload) {
      await Promise.any([Guoba.reload(), sleep(500)])
      return Result.ok({}, '锅巴重启成功~')
    } else {
      return Result.error({}, '锅巴服务异常，请手动重启！')
    }
  }

  async putCreateDir(req) {
    let {path, name} = req.body
    let result = await this.systemService.createDir(path, name)
    return Result.ok(result)
  }

  async getFsTreeRoot() {
    let result = await this.systemService.getFsTreeRoot()
    return Result.ok(result)
  }

  async getFsTreeChildren(req) {
    let {path} = req.query
    let result = await this.systemService.getFsTreeChildren(path)
    return Result.ok(result)
  }

}

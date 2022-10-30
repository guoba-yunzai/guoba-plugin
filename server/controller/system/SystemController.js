const Result = await Guoba.GID('#/components/Result.js')
const {autowired} = await Guoba.GI('#/loader/injection.js')
const RestController = await Guoba.GID('#/components/RestController.js')

/**
 * 系统相关
 */
export class SystemController extends RestController {

  systemService = autowired('systemService')

  constructor(app) {
    super('/sys', app)
  }

  registerRouters() {
    this.put('/fs/create-dir', this.putCreateDir)
    this.get('/fs/tree/root', this.getFsTreeRoot)
    this.get('/fs/tree/children', this.getFsTreeChildren)
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

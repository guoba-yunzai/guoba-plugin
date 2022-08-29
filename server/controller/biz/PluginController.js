const {autowired} = await Guoba.GI('#/loader/injection.js')
const RestController = await Guoba.GID('#/components/RestController.js')
const Result = await Guoba.GID('#/components/Result.js')

export default class PluginController extends RestController {

  pluginService = autowired('pluginService')

  constructor(app) {
    super('/plugin', app)
  }

  registerRouters() {
    this.get('/list', this.getPlugins)
    this.get('/readme', this.getPluginReadme)
  }

  /**
   * 获取插件列表
   * @param req.query.force 是否清空缓存强制刷新
   * @return {Promise<Result>}
   */
  async getPlugins(req) {
    let {force} = req.query
    force = force === 'true'
    let data = await this.pluginService.getPlugins(force)
    return Result.ok(data)
  }

  async getPluginReadme(req) {
    let {link, force} = req.query
    force = force === 'true'
    let text = await this.pluginService.getReadmeText(link, force)
    return Result.ok(text)
  }
}

import {autowired, Result} from '#guoba.framework'
import {ApiController} from '#guoba.platform'

export default class ConfigController extends ApiController {

  configService = autowired('configServiceImpl')

  constructor(guobaApp) {
    super('/config', guobaApp)
  }

  registerRouters() {
    this.get('/tabs', this.tabs)
    this.get('/data', this.getData)
    this.post('/data', this.setData)
    this.delete('/card-Form', this.removeCardForm)
  }

  async tabs() {
    let config = await this.configService.getConfigTabs()
    return Result.ok(config)
  }

  async getData(req) {
    let {key} = req.query
    let data = await this.configService.getConfigData(key)
    return Result.ok(data)
  }

  async setData(req) {
    let {key, data} = req.body
    await this.configService.setConfigData(key, data)
    return Result.ok('保存成功~')
  }

  async removeCardForm(req) {
    let {formKey, cardKey} = req.body
    await this.configService.removeCardForm(formKey, cardKey)
    return Result.ok('删除成功~')
  }

}

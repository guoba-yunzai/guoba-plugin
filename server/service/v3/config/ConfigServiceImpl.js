const Constant = await Guoba.GID('#/constant/Constant.js')
const IConfigService = await Guoba.GID('#/service/interface/IConfigService.js')
const {getConfigReader} = await Guoba.GI('#/service/v3/config/utils/ConfigUtils.js')

export default class ConfigServiceImpl extends IConfigService {

  configTabs = null
  configFile = null

  constructor(app) {
    super(app)
    this.loadConfig()
  }

  async loadConfig() {
    let {
      configTabs,
      configFile,
    } = (await import('./model/useConfig.js?' + Date.now()))
    this.configTabs = configTabs
    this.configFile = configFile
  }

  async getConfigTabs() {
    return this.configTabs
  }

  async getConfigData(key) {
    let jsonData = getConfigReader(key, this.configFile).jsonData
    if (Array.isArray(jsonData)) {
      return jsonData
    }
    let obj = {}
    for (let [key, value] of Object.entries(jsonData)) {
      let field = key
      // 此处特殊处理，因为前端form的field不能是纯数字，只处理一层
      if (/^\d+$/.test(key)) {
        field = Constant.CONFIG_INTEGER_KEY + key
      }
      obj[field] = value
    }
    return obj
  }

  async setConfigData(key, data) {
    getConfigReader(key, this.configFile).setData(data)
  }
}

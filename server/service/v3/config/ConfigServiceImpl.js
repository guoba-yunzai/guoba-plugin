// 创建可使用相对路径的import方法
const {GI, GID} = Guoba.createImport(import.meta.url)
// 引入模块
const Constant = await GID('#/constant/Constant.js')
const IConfigService = await GID('#/service/interface/IConfigService.js')
const {getConfigReader} = await GI('./utils/ConfigUtils.js')
const {getConfigTabs, configFile} = await GI('./model/useConfig.js')

export default class ConfigServiceImpl extends IConfigService {

  constructor(app) {
    super(app)
  }

  async getConfigTabs() {
    return getConfigTabs()
  }

  async getConfigData(key) {
    let jsonData = getConfigReader(key, configFile).jsonData
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
    getConfigReader(key, configFile).setData(data)
  }

  async removeCardForm(formKey, cardKey) {
    getConfigReader(cardKey, configFile).deleteKey(formKey)
  }
}

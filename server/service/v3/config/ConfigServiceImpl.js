import {YamlReader} from "#guoba.framework";

// 创建可使用相对路径的import方法
const {GI, GID} = Guoba.createImport(import.meta.url)
// 引入模块
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
    return this.handleConfigData('get', key, jsonData)
  }

  async setConfigData(key, data) {
    data = this.handleConfigData('set', key, data)
    getConfigReader(key, configFile).setData(data)
  }

  async removeCardForm(formKey, cardKey) {
    getConfigReader(cardKey, configFile).deleteKey(formKey)
  }

  needHandleConfigKey = [
    'system.other',
    'system.group',
  ]
  needHandleFieldKey = [
    'masterQQ', 'disableAdopt', 'whiteGroup', 'blackGroup', 'blackQQ',
    'botAlias', 'enable', 'disable',
  ]

  /**
   * 处理配置里可能出现的特殊数据（空值等）
   */
  handleConfigData(action, key, data) {
    if (!data || Array.isArray(data)) {
      return data
    }
    const handler = (itemData) => {
      let newData = {}
      for (let [oKey, oVal] of Object.entries(itemData)) {
        let field = oKey
        let value = oVal

        if (action === 'get') {
          // 此处特殊处理，因为前端form的field不能是纯数字，只处理一层
          if (/^\d+$/.test(field)) {
            field = YamlReader.CONFIG_INTEGER_KEY + field
          }
        }

        // 处理空值
        if (this.needHandleConfigKey.includes(key) && this.needHandleFieldKey.includes(oKey)) {
          if (value == null || value === '') {
            value = []
          }
          if (Array.isArray(value)) {
            value = value.filter(str => str != null && str !== '')
          }
        }
        newData[field] = value
      }
      return newData
    }

    if (key === 'system.group') {
      for (let [oKey, oVal] of Object.entries(data)) {
        data[oKey] = handler(oVal)
      }
      return data
    }
    return handler(data)
  }

}

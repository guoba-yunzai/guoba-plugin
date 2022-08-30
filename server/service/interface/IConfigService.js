const Service = await Guoba.GID('#/components/Service.js')
const Constant = await Guoba.GID('#/constant/Constant.js')

export default class IConfigService extends Service {
  constructor(app) {
    super(app)
  }

  /**
   * 获取所有配置，以tabs格式返回
   * @return {Promise<any>}
   */
  async getConfigTabs() {
    throw Constant.ERROR_501
  }

  /**
   * 获取配置数据
   * @param key
   * @return {Promise<any>}
   */
  async getConfigData(key) {
    throw Constant.ERROR_501
  }

  /**
   * 设置配置数据
   * @param key
   * @param data
   * @return {Promise<any>}
   */
  async setConfigData(key, data) {
    throw Constant.ERROR_501
  }

  /**
   * 删除卡片表单
   * @param formKey
   * @param cardKey
   * @return {Promise<void>}
   */
  async removeCardForm(formKey, cardKey) {
    throw Constant.ERROR_501
  }
}

import {Result, Service} from '#guoba.framework';

export default class IConfigService extends Service {
  constructor(app) {
    super(app)
  }

  /**
   * 获取所有配置，以tabs格式返回
   * @return {Promise<any>}
   */
  async getConfigTabs() {
    throw Result.ERR_CODE_501
  }

  /**
   * 获取配置数据
   * @param key
   * @return {Promise<any>}
   */
  async getConfigData(key) {
    throw Result.ERR_CODE_501
  }

  /**
   * 设置配置数据
   * @param key
   * @param data
   * @return {Promise<any>}
   */
  async setConfigData(key, data) {
    throw Result.ERR_CODE_501
  }

  /**
   * 删除卡片表单
   * @param formKey
   * @param cardKey
   * @return {Promise<void>}
   */
  async removeCardForm(formKey, cardKey) {
    throw Result.ERR_CODE_501
  }
}

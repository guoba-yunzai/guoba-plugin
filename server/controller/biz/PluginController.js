import {autowired, Result} from '#guoba.framework';
import {ApiController, GuobaSupportMap} from '#guoba.platform'

export default class PluginController extends ApiController {

  pluginService = autowired('pluginService')

  constructor(guobaApp) {
    super('/plugin', guobaApp)
  }

  registerRouters() {
    // 获取plugin列表
    this.get('/list', this.getPlugins)
    // 获取plugin readme
    this.get('/readme', this.getPluginReadme)

    // 安装plugin
    this.put('/install', this.installPlugin)
    // 卸载plugin
    this.put('/uninstall', this.uninstallPlugin)

    // 获取plugin icon（直接显示图片）
    this.get('/s/:pluginName/icon', this.getPluginIcon)
    // 获取plugin配置数据
    this.get('/s/:pluginName/config', this.getPluginConfig)
    // 设置plugin配置数据
    this.put('/s/:pluginName/config', this.setPluginConfig)

    // 执行操作
    this.post('/do/:pluginName/action', this.doAction)
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

  async installPlugin(req) {
    let {link, autoRestart = true, autoNpmInstall = true} = req.body
    if (!link) {
      return Result.error('link不能为空')
    }
    let text = await this.pluginService.installPlugin(link, autoRestart, autoNpmInstall)
    return Result.ok(text)
  }

  async uninstallPlugin(req) {
    let {name} = req.body
    name = name?.toString?.()?.trim?.()
    if (!name) {
      return Result.error('name不能为空')
    }
    let nameArr = name.split(',')
    if (nameArr.length === 0) {
      return Result.error('name不能为空')
    }
    if (nameArr.includes('miao-plugin')) {
      return Result.error('抱歉，由于miao-plugin是重要插件，不能卸载！')
    }
    let text = await this.pluginService.uninstallPluginBatch(nameArr)
    return Result.ok(text)
  }

  getSupport(pluginName) {
    let supportObject = GuobaSupportMap.get(pluginName)
    if (!supportObject) {
      throw '该插件不支持锅巴'
    }
    return supportObject
  }

  // 获取插件icon（如果有）
  getPluginIcon(req, res) {
    let {pluginName} = req.params
    let supportObject = this.getSupport(pluginName)
    let {pluginInfo} = supportObject
    if (!pluginInfo || !pluginInfo.iconPath) {
      return Result.error('该插件没有配置iconPath')
    }
    res.sendFile(pluginInfo.iconPath)
    return Result.VOID
  }

  // 获取插件配置数据（如果有）
  async getPluginConfig(req) {
    let {pluginName} = req.params
    let supportObject = this.getSupport(pluginName)
    let {configInfo} = supportObject
    let getConfigData = configInfo?.getConfigData
    if (typeof getConfigData !== 'function') {
      return Result.error('该插件没有配置getConfigData')
    }
    return Result.ok(await getConfigData())
  }

  // 设置插件配置数据
  async setPluginConfig(req) {
    let {pluginName} = req.params
    let supportObject = this.getSupport(pluginName)
    let {configInfo} = supportObject
    let setConfigData = configInfo?.setConfigData
    if (typeof setConfigData !== 'function') {
      return Result.error('该插件没有配置setConfigData')
    }
    let flag = await setConfigData(req.body, {Result})
    if (flag instanceof Result) {
      return flag
    }
    return Result.ok(flag)
  }

  // 执行插件的 action
  async doAction(req) {
    const {pluginName} = req.params
    const body = req.body
    const supportObject = this.getSupport(pluginName)
    const {configInfo} = supportObject
    const actions = configInfo?.actions
    if (!actions) {
      return Result.error('没有配置 actions')
    }
    const action = actions[body.action]
    if (!action) {
      return Result.error(`action "${body.action}" 不存在`)
    }
    if (typeof action !== 'function') {
      return Result.error(`action "${body.action}" 不是一个方法`)
    }
    return action(body.args, {Result})
  }

}

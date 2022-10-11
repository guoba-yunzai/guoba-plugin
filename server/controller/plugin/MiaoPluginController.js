/** @type {GuobaResult} */
const Result = await Guoba.GID('#/components/Result.js')
/** @type {GuobaConstant} */
const Constant = await Guoba.GID('#/constant/Constant.js')
const RestController = await Guoba.GID('#/components/RestController.js')
const {autowired} = await Guoba.GI('#/loader/injection.js')
const {PluginsMap} = await Guoba.GI('@/utils/common.js')

export default class MiaoPluginController extends RestController {

  constructor(app) {
    super('/plugin/miao', app)
  }

  async registerRouters() {
    /** @type {PluginService} */
    this.pluginService = autowired('pluginService')
    await this.pluginService.loadPlugining
    // 判断是否已安装喵喵插件
    if (!PluginsMap.get('miao-plugin')) {
      return
    }
    // 判断喵喵插件版本
    this.miaoVersion = (await import('../../../../miao-plugin/components/Version.js')).default
    if (this.miaoVersion.version.startsWith('1')) {
      /** @type {MiaoPluginV1Service} */
      this.miaoService = autowired('miaoPluginV1Service')
    } else {
      /** @type {MiaoPluginService} */
      this.miaoService = autowired('miaoPluginService')
    }
    // 获取喵喵帮助 cfg
    this.get('/help', this.getMiaoHelpCfg)
    // 设置喵喵帮助 cfg
    this.post('/help', this.saveMiaoHelpCfg)
    // 获取喵喵帮助背景图片
    this.get('/help/theme/bg', this.getHelpThemeBg)
    this.get('/help/theme/main', this.getHelpThemeMain)
    // 获取皮肤列表
    this.get('/help/theme/list', this.getHelpThemeList)
    // 获取皮肤配置项
    this.get('/help/theme/config', this.getHelpThemeConfig)
    // 保存皮肤配置项
    this.post('/help/theme/config', this.saveHelpThemeConfig)
    // 皮肤 post 操作（新增）
    this.post('/help/theme/action', this.addHelpTheme)
    // 皮肤 put 操作（修改，仅底图）（由于put操作无法处理files，可能是express的bug，所以改为post）
    this.post('/help/theme/action_put', this.putHelpTheme)
    // 皮肤 delete 操作（删除）
    this.delete('/help/theme/action', this.deleteHelpTheme)
    // 获取喵喵帮助icon
    this.get('/help/icon', this.getHelpIcon)
    // 备份喵喵帮助
    this.post('/help/backup', this.addBackup)
    // 获取备份列表
    this.get('/help/backup/list', this.getBackupList)
    // 还原备份的喵喵帮助
    this.post('/help/backup/restore', this.restoreBackup)
    // 删除备份
    this.delete('/help/backup/delete', this.deleteBackup)
    // 初始化最初的备份
    this.miaoService.initBackup()
  }

  async getMiaoHelpCfg() {
    let setting = await this.miaoService.getHelpSetting()
    let miaoVersion = this.miaoVersion.version
    let yunzaiVersion = this.miaoVersion.yunzai
    return Result.ok({...setting, miaoVersion, yunzaiVersion})
  }

  async saveMiaoHelpCfg(req) {
    this.miaoService.saveHelpSetting(req.body, req.files)
    return Result.ok()
  }

  getHelpThemeBg(req, res) {
    res.sendFile(this.miaoService.getThemeBgPath(req.query))
    return Constant.VOID
  }

  getHelpThemeMain(req, res) {
    res.sendFile(this.miaoService.getThemeMainPath(req.query))
    return Constant.VOID
  }

  async getHelpThemeList() {
    let list = await this.miaoService.getHelpThemeList()
    return Result.ok(list)
  }

  async getHelpThemeConfig(req, res) {
    let config = await this.miaoService.getHelpThemeConfig(req.query)
    return Result.ok(config)
  }

  async saveHelpThemeConfig(req) {
    await this.miaoService.saveHelpThemeConfig(req.body)
    return Result.ok('保存成功~')
  }

  async deleteHelpTheme(req) {
    await this.miaoService.deleteHelpTheme(req.body)
    return Result.ok('删除成功~')
  }

  async addHelpTheme(req) {
    await this.miaoService.addHelpTheme(req.body, req.files)
    return Result.ok('新增成功~')
  }

  async putHelpTheme(req) {
    await this.miaoService.editHelpTheme(req.body, req.files)
    return Result.ok('修改成功~')
  }

  getHelpIcon(req, res) {
    res.sendFile(this.miaoService.miaoPath.iconPath)
    return Constant.VOID
  }

  getBackupList() {
    let {backupList} = this.miaoService.getBackupCfg()
    return Result.ok(backupList)
  }

  addBackup(req) {
    let {remark} = req.body
    this.miaoService.addBackup(remark)
    return Result.ok()
  }

  async restoreBackup(req) {
    let {id} = req.body
    await this.miaoService.restoreBackup(id)
    return Result.ok()
  }

  deleteBackup(req) {
    let {id} = req.body
    this.miaoService.deleteBackup(id)
    return Result.ok()
  }

}

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

  restoreBackup(req) {
    let {id} = req.body
    this.miaoService.restoreBackup(id)
    return Result.ok()
  }

  deleteBackup(req) {
    let {id} = req.body
    this.miaoService.deleteBackup(id)
    return Result.ok()
  }

}

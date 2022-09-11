import fs from 'fs'
import yaml from 'yaml'
import path from 'path'
import moment from 'moment'
import lodash from 'lodash'
import {_paths} from '../../../utils/paths.js'

const Result = await Guoba.GID('#/components/Result.js')
const Constant = await Guoba.GID('#/constant/Constant.js')
const RestController = await Guoba.GID('#/components/RestController.js')
const {autowired} = await Guoba.GI('#/loader/injection.js')
const {PluginsMap} = await Guoba.GI('@/utils/common.js')

export default class MiaoPluginController extends RestController {

  constructor(app) {
    super('/plugin/miao', app)
  }

  async registerRouters() {
    this.pluginService = autowired('pluginService')
    await this.pluginService.loadPlugining
    // 判断是否已安装喵喵插件
    if (!PluginsMap.get('miao-plugin')) {
      return
    }
    // 初始化最初的备份
    this.initBackup()
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
  }

  getMiaoPath() {
    let miaoPath = path.join(_paths.root, 'plugins/miao-plugin')
    let helpPath = path.join(miaoPath, 'resources/help')
    let themePath = path.join(miaoPath, 'resources/common/theme')
    let cfgPath = path.join(helpPath, 'help-cfg.js')
    let cfgDefPath = path.join(helpPath, 'help-cfg_default.js')
    let iconPath = path.join(helpPath, 'icon.png')
    let mainImgPath = path.join(themePath, 'main-01.png')
    let bgImgPath = path.join(themePath, 'bg-01.jpg')

    function getCfgPath() {
      if (!fs.existsSync(cfgPath)) {
        return cfgDefPath
      }
      return cfgPath
    }

    return {miaoPath, helpPath, themePath, cfgPath, getCfgPath, iconPath, mainImgPath, bgImgPath}
  }

  async getMiaoHelpCfg() {
    let {helpPath} = this.getMiaoPath()
    let help = {}
    if (fs.existsSync(`${helpPath}/help-cfg.js`)) {
      help = await import(`file://${helpPath}/help-cfg.js?version=${new Date().getTime()}`)
    }
    let def = await import(`file://${helpPath}/help-cfg_default.js?version=${new Date().getTime()}`)
    let helpCfg = lodash.defaults(help.helpCfg, def.helpCfg)
    let helpList = help.helpList || def.helpList
    // 如果未安装喵喵插件，是不会走到这一步的
    let Version = (await import('../../../../miao-plugin/components/Version.js')).default
    let miaoVersion = Version.version
    let yunzaiVersion = Version.yunzai
    return Result.ok({helpCfg, helpList, miaoVersion, yunzaiVersion})
  }

  async saveMiaoHelpCfg(req) {
    let {helpCfg, helpList} = req.body
    let {cfgPath, iconPath, mainImgPath} = this.getMiaoPath()
    let content = `export const helpCfg = ${helpCfg}\n`
    content += `export const helpList = ${helpList}`
    fs.writeFileSync(cfgPath, content, 'utf-8')
    let [iconFile, mainFile] = req.files
    fs.renameSync(iconFile.path, iconPath)
    fs.renameSync(mainFile.path, mainImgPath)
    return Result.ok()
  }

  getHelpThemeBg(req, res) {
    res.sendFile(this.getMiaoPath().bgImgPath)
    return Constant.VOID
  }

  getHelpThemeMain(req, res) {
    res.sendFile(this.getMiaoPath().mainImgPath)
    return Constant.VOID
  }

  getHelpIcon(req, res) {
    res.sendFile(this.getMiaoPath().iconPath)
    return Constant.VOID
  }

  getBackupCfg() {
    let backupPath = path.join(_paths.data, 'miaoHelpBackup')
    if (!fs.existsSync(backupPath)) {
      fs.mkdirSync(backupPath)
    }
    let dbPath = path.join(backupPath, 'db.yaml')
    let backupList = []
    if (fs.existsSync(dbPath)) {
      backupList = yaml.parse(fs.readFileSync(dbPath, 'utf-8'))
    }
    return {
      backupPath,
      backupList,
      save() {
        fs.writeFileSync(dbPath, yaml.stringify(backupList), 'utf-8')
      },
    }
  }

  getBackupList() {
    let {backupList} = this.getBackupCfg()
    return Result.ok(backupList)
  }

  initBackup() {
    let {backupList} = this.getBackupCfg()
    if (backupList.length === 0) {
      this.doAddBackup('初始备份', true)
    }
  }

  addBackup(req) {
    let {remark} = req.body
    this.doAddBackup(remark)
    return Result.ok()
  }

  doAddBackup(remark, isInit = false) {
    let {backupPath, backupList, save} = this.getBackupCfg()
    let {getCfgPath, cfgPath, mainImgPath, iconPath} = this.getMiaoPath()
    let id = new Date().getTime().toString()
    backupList.push({id, remark, isInit, time: moment().format('YYYY-MM-DD HH:mm:ss')})
    let backupDir = path.join(backupPath, id)
    fs.mkdirSync(backupDir)
    fs.cpSync(getCfgPath(), `${backupDir}/${path.basename(cfgPath)}`)
    fs.cpSync(mainImgPath, `${backupDir}/${path.basename(mainImgPath)}`)
    fs.cpSync(iconPath, `${backupDir}/${path.basename(iconPath)}`)
    save()
  }

  restoreBackup(req) {
    let {id} = req.body
    let {backupPath} = this.getBackupCfg()
    let {cfgPath, mainImgPath, iconPath} = this.getMiaoPath()
    let backupDir = path.join(backupPath, id)
    fs.cpSync(`${backupDir}/${path.basename(cfgPath)}`, cfgPath)
    fs.cpSync(`${backupDir}/${path.basename(mainImgPath)}`, mainImgPath)
    fs.cpSync(`${backupDir}/${path.basename(iconPath)}`, iconPath)
    return Result.ok()
  }

  deleteBackup(req) {
    let {id} = req.body
    let {backupPath, backupList, save} = this.getBackupCfg()
    let backupDir = path.join(backupPath, id)
    fs.rmSync(backupDir, {recursive: true})
    lodash.remove(backupList, {id})
    save()
    return Result.ok()
  }

}

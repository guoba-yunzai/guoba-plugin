import fs from 'fs'
import path from 'path'
import lodash from 'lodash'
import {_paths} from '../../../../../utils/paths.js'

const {GID} = Guoba.createImport(import.meta.url)

const GuobaError = await Guoba.GID('@/components/GuobaError.js')
/** @type {IMiaoPluginService} */
const IMiaoPluginService = await GID('./IMiaoPluginService.js')

// noinspection JSUnusedGlobalSymbols
/**
 * 喵喵最新版
 */
export default class MiaoPluginService extends IMiaoPluginService {
  constructor(app) {
    super(app)
  }

  _miaoPath = null

  get miaoPath() {
    if (this._miaoPath) {
      return this._miaoPath
    }
    let miaoPath = path.join(_paths.root, 'plugins/miao-plugin')
    let helpPath = path.join(miaoPath, 'resources/help')
    let helpCfgPath = path.join(miaoPath, 'config/help.js')

    let themePath = path.join(miaoPath, 'resources/help/theme')
    let iconPath = path.join(helpPath, 'icon.png')

    // TODO 暂时先只兼容 default
    let themeDefaultPath = path.join(themePath, 'default')
    let themeGuobaPath = path.join(themePath, 'guoba-temp')

    return this._miaoPath = {
      miaoPath, helpPath,
      helpCfgPath,
      themePath, iconPath,
      themeDefaultPath,
      themeGuobaPath,
    }
  }

  _miaoUtils = null

  async getMiaoUtils() {
    if (this._miaoUtils) {
      return this._miaoUtils
    }
    return this._miaoUtils = (await import('../../../../../../miao-plugin/components/Data.js')).default
  }

  initBackup() {
  }

  async getHelpSetting() {
    let {importCfg} = await this.getMiaoUtils()
    let {sysCfg, diyCfg} = await importCfg('help')
    let {helpPath} = this.miaoPath

    // 兼容老配置
    let custom, help = {}
    if (fs.existsSync(`${helpPath}/help-cfg.js`)) {
      help = await import(`file://${helpPath}/help-cfg.js?version=${new Date().getTime()}`)
    } else if (fs.existsSync(`${helpPath}/help-list.js`)) {
      help = await import(`file://${helpPath}/help-list.js?version=${new Date().getTime()}`)
    }
    // 兼容一下旧字段
    if (lodash.isArray(help.helpCfg)) {
      custom = {
        helpList: help.helpCfg,
        helpCfg: {},
      }
    } else {
      custom = help
    }

    let helpCfg = lodash.defaults(diyCfg.helpCfg || {}, custom.helpCfg, sysCfg.helpCfg)
    let helpList = diyCfg.helpList || custom.helpList || sysCfg.helpList

    return {helpCfg, helpList}
  }

  saveHelpSetting(bodyParams, files) {
    let {helpCfg, helpList} = bodyParams
    helpCfg = JSON.parse(helpCfg)
    // TODO 暂时先写死，换肤后续适配
    if (helpCfg.theme === 'all') {
      helpCfg.theme = ['guoba-temp']
    }
    let {helpCfgPath, iconPath} = this.miaoPath
    let content = `export const helpCfg = ${JSON.stringify(helpCfg, null, 2)}\n`
    content += `export const helpList = ${helpList}`
    fs.writeFileSync(helpCfgPath, content, 'utf-8')
    let [iconFile, mainFile] = files
    fs.renameSync(iconFile.path, iconPath)
    if (mainFile) {
      if (!fs.existsSync(this.miaoPath.themeGuobaPath)) {
        fs.mkdirSync(this.miaoPath.themeGuobaPath)
      }
      let mainImgPath = path.join(this.miaoPath.themeGuobaPath, 'main.png')
      fs.renameSync(mainFile.path, mainImgPath)
    }
  }

  /**
   * 获取皮肤main.png路径
   * @return {*}
   */
  getThemeMainPath() {
    let guobaTemp = path.join(this.miaoPath.themeGuobaPath, 'main.png')
    if (fs.existsSync(guobaTemp)) {
      return guobaTemp
    }
    return path.join(this.miaoPath.themeDefaultPath, 'main.png')
  }

  /**
   * 获取皮肤bg路径
   * @return {*}
   */
  getThemeBgPath() {
    return path.join(this.miaoPath.themeDefaultPath, 'bg.jpg')
  }

  getBackupCfg() {
    return {
      ...super.getBackupCfg(),
      backupList: [
        {id: '-', remark: '咕咕咕~', isInit: true, time: '由于喵喵帮助2.0变更较大，当前功能正在兼容中，敬请期待~'},
      ],
    }
  }

  addBackup(remark, isInit = false) {
    throw new GuobaError('由于喵喵帮助2.0变更较大，当前功能正在兼容中，敬请期待~')
  }

  restoreBackup(id) {
    throw new GuobaError('由于喵喵帮助2.0变更较大，当前功能正在兼容中，敬请期待~')
  }

  deleteBackup(id) {
    throw new GuobaError('由于喵喵帮助2.0变更较大，当前功能正在兼容中，敬请期待~')
  }

}
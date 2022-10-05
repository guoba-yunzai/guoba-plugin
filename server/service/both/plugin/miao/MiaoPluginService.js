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

    let themeDefaultPath = path.join(themePath, 'default')

    return this._miaoPath = {
      miaoPath, helpPath,
      helpCfgPath,
      themePath, iconPath,
      themeDefaultPath,
    }
  }

  _miaoUtils = null

  async getMiaoUtils() {
    if (this._miaoUtils) {
      return this._miaoUtils
    }
    return this._miaoUtils = {
      Data: (await import('../../../../../../miao-plugin/components/Data.js')).default,
      Theme: (await import('../../../../../../miao-plugin/apps/help/theme.js')).default,
    }
  }

  initBackup() {
  }

  async getHelpSetting() {
    let {Data} = await this.getMiaoUtils()
    let {sysCfg, diyCfg} = await Data.importCfg('help')
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
    let themeNames = this.getThemeNames()
    return {helpCfg, helpList, themeNames}
  }

  getThemeNames() {
    let {themePath} = this.miaoPath
    let names = []
    let dirs = fs.readdirSync(themePath)
    lodash.forEach(dirs, (dir) => {
      if (fs.existsSync(path.join(themePath, dir, `main.png`))) {
        names.push(dir)
      }
    })
    return names
  }

  saveHelpSetting(bodyParams, files) {
    let {helpCfg, helpList} = bodyParams
    helpCfg = JSON.parse(helpCfg)
    if (Array.isArray(helpCfg.theme) && helpCfg.theme.length === 0) {
      helpCfg.theme = 'all'
    }
    let {helpCfgPath, iconPath} = this.miaoPath
    let content = `export const helpCfg = ${JSON.stringify(helpCfg, null, 2)}\n`
    content += `export const helpList = ${helpList}`
    fs.writeFileSync(helpCfgPath, content, 'utf-8')
    let [iconFile] = files
    fs.renameSync(iconFile.path, iconPath)
  }

  async getHelpThemeList() {
    let themeNames = this.getThemeNames()
    themeNames = themeNames.sort((a, b) => {
      if (b === 'default') {
        return -1
      }
      return a.localeCompare(b)
    })
    let list = []
    for (const themeName of themeNames) {
      let style = await this.getHelpThemeConfig({themeName})
      list.push({name: themeName, style})
    }
    return list
  }

  async getHelpThemeConfig(params) {
    let {themeName} = (params || {})
    if (!themeName) themeName = 'default'
    let {Data} = await this.getMiaoUtils()
    let themeConfigPath = path.join(this.miaoPath.themePath, themeName, 'config.js')
    if (!fs.existsSync(themeConfigPath)) {
      themeName = 'default'
    }
    return (await Data.importModule(`resources/help/theme/${themeName}/config.js`)).style || {}
  }

  async saveHelpThemeConfig(params) {
    let {themeName, config} = (params || {})
    if (!themeName) themeName = 'default'
    if (themeName === 'default') {
      throw new GuobaError('默认皮肤不可修改！')
    }
    let {Data} = await this.getMiaoUtils()
    let defaultStyle = (await Data.importModule(`resources/help/theme/default/config.js`)).style || {}
    let themeStyle = (await Data.importModule(`resources/help/theme/${themeName}/config.js`)).style || {}
    let merge = lodash.merge({}, defaultStyle, themeStyle, config)
    let content = `export const style = ${JSON.stringify(merge, null, 2)}`
    let savePath = path.join(this.miaoPath.themePath, themeName, 'config.js')
    fs.writeFileSync(savePath, content, 'utf-8')
  }

  async addHelpTheme(params, files) {
    let {themeName} = params
    let [mainPic] = files
    let themePath = path.join(this.miaoPath.themePath, themeName)
    if (fs.existsSync(themePath)) {
      throw new GuobaError(`${themeName} 已存在！`)
    }
    fs.mkdirSync(themePath)
    let mainImgPath = path.join(themePath, 'main.png')
    fs.renameSync(mainPic.path, mainImgPath)
  }

  async editHelpTheme(params, files) {
    let {themeName} = params
    let [mainPic] = files
    let themePath = path.join(this.miaoPath.themePath, themeName)
    if (!fs.existsSync(themePath)) {
      throw new GuobaError(`${themeName} 不存在！`)
    }
    let mainImgPath = path.join(themePath, 'main.png')
    fs.renameSync(mainPic.path, mainImgPath)
  }

  async deleteHelpTheme(params) {
    let {themeName} = params
    if (!themeName) {
      throw new GuobaError(`themeName 必须填写！`)
    }
    if (themeName === 'default') {
      throw new GuobaError(`默认皮肤不可删除！`)
    }
    let themePath = path.join(this.miaoPath.themePath, themeName)
    fs.rmSync(themePath, {recursive: true})
  }

  /**
   * 获取皮肤main.png路径
   * @return {*}
   */
  getThemeMainPath(query) {
    let {themeName} = (query || {})
    if (!themeName) themeName = 'default'
    let themeMainPath = path.join(this.miaoPath.themePath, themeName, 'main.png')
    if (fs.existsSync(themeMainPath)) {
      return themeMainPath
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
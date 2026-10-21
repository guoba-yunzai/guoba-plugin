import fs from "fs"
import path from "path"
import lodash from "lodash"
import moment from "moment"
import { _paths } from "#guoba.platform"
import { moveFile } from "#guoba.utils"

const { GID } = Guoba.createImport(import.meta.url)

/** @type {IMiaoPluginService} */
const IMiaoPluginService = await GID("./IMiaoPluginService.js")

// noinspection JSUnusedGlobalSymbols
/**
 * 喵喵V1版本
 */
export default class MiaoPluginV1Service extends IMiaoPluginService {
  _miaoPath = null

  get miaoPath() {
    if (this._miaoPath) return this._miaoPath
    let miaoPath = path.join(_paths.root, "plugins/miao-plugin")
    let helpPath = path.join(miaoPath, "resources/help")
    let themePath = path.join(miaoPath, "resources/common/theme")
    let cfgPath = path.join(helpPath, "help-cfg.js")
    let cfgDefPath = path.join(helpPath, "help-cfg_default.js")
    let iconPath = path.join(helpPath, "icon.png")
    let mainImgPath = path.join(themePath, "main-01.png")
    let bgImgPath = path.join(themePath, "bg-01.jpg")

    return (this._miaoPath = {
      miaoPath,
      helpPath,
      themePath,
      cfgPath,
      getCfgPath: () => (fs.existsSync(cfgPath) ? cfgPath : cfgDefPath),
      iconPath,
      mainImgPath,
      bgImgPath,
    })
  }

  initBackup() {
    let { backupList } = this.getBackupCfg()
    if (backupList.length === 0) {
      this.addBackup("初始备份", true)
    }
  }

  async getHelpSetting() {
    let { helpPath } = this.miaoPath
    let help = {}
    if (fs.existsSync(`${helpPath}/help-cfg.js`)) {
      help = await import(`file://${helpPath}/help-cfg.js?version=${Date.now()}`)
    }
    let def = await import(`file://${helpPath}/help-cfg_default.js?version=${Date.now()}`)
    return {
      helpCfg: lodash.defaults(help.helpCfg, def.helpCfg),
      helpList: help.helpList || def.helpList,
    }
  }

  saveHelpSetting(bodyParams, files) {
    let { helpCfg, helpList } = bodyParams
    let { cfgPath, iconPath, mainImgPath } = this.miaoPath
    let content = `export const helpCfg = ${helpCfg}\n`
    content += `export const helpList = ${helpList}`
    fs.writeFileSync(cfgPath, content, "utf-8")
    let [iconFile, mainFile] = files
    moveFile(iconFile.path, iconPath)
    if (mainFile) {
      moveFile(mainFile.path, mainImgPath)
    }
  }

  /**
   * 获取皮肤main.png路径
   * @return {*}
   */
  getThemeMainPath() {
    return this.miaoPath.mainImgPath
  }

  /**
   * 获取皮肤bg路径
   * @return {*}
   */
  getThemeBgPath() {
    return this.miaoPath.bgImgPath
  }

  addBackup(remark, isInit = false) {
    let { backupPath, backupList, save } = this.getBackupCfg()
    let { getCfgPath, cfgPath, mainImgPath, iconPath } = this.miaoPath
    let id = Date.now().toString()
    backupList.push({ id, remark, isInit, time: moment().format("YYYY-MM-DD HH:mm:ss") })
    let backupDir = path.join(backupPath, id)
    fs.mkdirSync(backupDir)
    fs.cpSync(getCfgPath(), `${backupDir}/${path.basename(cfgPath)}`)
    fs.cpSync(mainImgPath, `${backupDir}/${path.basename(mainImgPath)}`)
    fs.cpSync(iconPath, `${backupDir}/${path.basename(iconPath)}`)
    save()
  }

  restoreBackup(id) {
    let { cfgPath, mainImgPath, iconPath } = this.miaoPath
    let files = this.getBackupFiles(id, 1)
    fs.cpSync(files["help-cfg.js"], cfgPath)
    fs.cpSync(files["main-01.png"], mainImgPath)
    fs.cpSync(files["icon.png"], iconPath)
    return true
  }

  deleteBackup(id) {
    let { backupList, save } = this.getBackupCfg()
    let backupDir = this.getBackupDir(id)
    fs.rmSync(backupDir, { recursive: true })
    lodash.remove(backupList, { id })
    save()
    return true
  }
}

import fs from "fs"
import path from "path"
import lodash from "lodash"
import moment from "moment"
import { pathToFileURL } from "url"
import { GuobaError } from "#guoba.framework"
import { _paths } from "#guoba.platform"
import { moveFile } from "#guoba.utils"
import { resolvePathWithinRoot, validatePathSegment } from "../../../../utils/safePath.js"

const { GID } = Guoba.createImport(import.meta.url)
const IMiaoPluginService = await GID("./IMiaoPluginService.js")
let moduleVersion = 0

// noinspection JSUnusedGlobalSymbols
/**
 * 喵喵最新版
 */
export default class MiaoPluginService extends IMiaoPluginService {
  _miaoPath = null

  get miaoPath() {
    if (this._miaoPath) return this._miaoPath
    let miaoPath = path.join(_paths.root, "plugins/miao-plugin")
    let helpPath = path.join(miaoPath, "resources/help")
    let themePath = path.join(miaoPath, "resources/help/theme")

    return (this._miaoPath = {
      miaoPath,
      helpPath,
      helpCfgPath: path.join(miaoPath, "config/help.js"),
      themePath,
      iconPath: path.join(helpPath, "icon.png"),
      themeDefaultPath: path.join(themePath, "default"),
    })
  }

  _miaoUtils = null

  async getMiaoUtils() {
    return (this._miaoUtils ||= {
      Data: (await this.importMiao(["../../../../../../miao-plugin/components/Data.js"])).default,
    })
  }

  async importMiao(paths, errorTip = "当前版本的喵喵插件暂不支持，请联系锅巴作者尽快修复！") {
    for (let p of paths) {
      try {
        return await import(p)
      } catch (e) {
        logger.error(e.message || e)
      }
    }
    throw new GuobaError(errorTip)
  }

  initBackup() {}

  async getHelpSetting() {
    let { Data } = await this.getMiaoUtils()
    let { sysCfg, diyCfg } = await Data.importCfg("help")
    let { helpPath } = this.miaoPath

    // 兼容老配置
    let help = {}
    if (fs.existsSync(`${helpPath}/help-cfg.js`)) {
      help = await import(`file://${helpPath}/help-cfg.js?version=${Date.now()}`)
    } else if (fs.existsSync(`${helpPath}/help-list.js`)) {
      help = await import(`file://${helpPath}/help-list.js?version=${Date.now()}`)
    }
    // 兼容一下旧字段
    let custom = lodash.isArray(help.helpCfg) ? { helpList: help.helpCfg, helpCfg: {} } : help

    let helpCfg = lodash.defaults(
      diyCfg.helpCfg || {},
      custom.helpCfg,
      sysCfg.helpCfg,
      // ----- 兼容喵喵字段问题 ------
      { colCount: 3, bgBlur: true },
      // ---------------------------
    )
    let helpList = diyCfg.helpList || custom.helpList || sysCfg.helpList
    let themeNames = this.getThemeNames()
    return { helpCfg, helpList, themeNames }
  }

  getThemeNames() {
    return fs.readdirSync(this.miaoPath.themePath).filter(dir => {
      try {
        return fs.existsSync(this.#themeFile(dir, "main.png"))
      } catch {
        // 跳过非法目录和指向主题目录外的符号链接。
        return false
      }
    })
  }

  #themeDir(themeName) {
    validatePathSegment(themeName, "皮肤名称")
    let themeDir = resolvePathWithinRoot(this.miaoPath.themePath, themeName)
    if (path.relative(path.resolve(this.miaoPath.themePath), themeDir) === "") {
      throw new GuobaError("皮肤名称不合法！")
    }
    return themeDir
  }

  #isDefaultTheme(themeName) {
    if (themeName === "default") return true
    let themeDir = this.#themeDir(themeName)
    let defaultDir = this.#themeDir("default")
    if (!fs.existsSync(themeDir) || !fs.existsSync(defaultDir)) return false
    let themeStat = fs.statSync(themeDir, { bigint: true })
    let defaultStat = fs.statSync(defaultDir, { bigint: true })
    return themeStat.dev === defaultStat.dev && themeStat.ino === defaultStat.ino
  }

  async #importConfig(filePath) {
    if (!fs.existsSync(filePath)) return {}
    // 用真实文件路径创建 URL，避免合法名称中的 #、% 被解释为片段或编码路径。
    let url = pathToFileURL(filePath)
    url.searchParams.set("version", `${Date.now()}-${moduleVersion++}`)
    return import(url.href)
  }

  #themeFile(themeName, fileName) {
    return resolvePathWithinRoot(
      this.miaoPath.themePath,
      path.join(this.#themeDir(themeName), fileName),
    )
  }

  saveHelpSetting(bodyParams, files) {
    let { helpCfg, helpList } = bodyParams
    helpCfg = JSON.parse(helpCfg)
    if (Array.isArray(helpCfg.theme) && helpCfg.theme.length === 0) {
      helpCfg.theme = "all"
    }
    let { helpCfgPath, iconPath } = this.miaoPath
    let content = `export const helpCfg = ${JSON.stringify(helpCfg, null, 2)}\n`
    content += `export const helpList = ${helpList}`
    fs.writeFileSync(helpCfgPath, content, "utf-8")
    if (Array.isArray(files) && files.length > 0) {
      let [iconFile] = files
      moveFile(iconFile.path, iconPath)
    }
  }

  async getHelpThemeList() {
    let themeNames = this.getThemeNames().sort((a, b) =>
      b === "default" ? -1 : a.localeCompare(b),
    )
    let list = []
    for (const themeName of themeNames) {
      let style = await this.getHelpThemeConfig({ themeName })
      list.push({ name: themeName, style })
    }
    return list
  }

  async getHelpThemeConfig(params) {
    let { themeName } = params || {}
    if (themeName == null || themeName === "") themeName = "default"
    let themeConfigPath = this.#themeFile(themeName, "config.js")
    if (!fs.existsSync(themeConfigPath)) {
      themeConfigPath = this.#themeFile("default", "config.js")
    }
    return (await this.#importConfig(themeConfigPath)).style || {}
  }

  async saveHelpThemeConfig(params) {
    let { themeName, config } = params || {}
    if (themeName == null || themeName === "") themeName = "default"
    let savePath = this.#themeFile(themeName, "config.js")
    if (this.#isDefaultTheme(themeName)) {
      throw new GuobaError("默认皮肤不可修改！")
    }
    let defaultPath = this.#themeFile("default", "config.js")
    let defaultStyle = (await this.#importConfig(defaultPath)).style || {}
    let themeStyle = (await this.#importConfig(savePath)).style || {}
    let merge = lodash.merge({}, defaultStyle, themeStyle, config)
    let content = `export const style = ${JSON.stringify(merge, null, 2)}`
    fs.writeFileSync(savePath, content, "utf-8")
  }

  async addHelpTheme(params, files) {
    let { themeName } = params
    let [mainPic] = files
    let themePath = this.#themeDir(themeName)
    if (fs.existsSync(themePath)) {
      throw new GuobaError(`${themeName} 已存在！`)
    }
    fs.mkdirSync(themePath)
    let mainImgPath = this.#themeFile(themeName, "main.png")
    moveFile(mainPic.path, mainImgPath)
  }

  async editHelpTheme(params, files) {
    let { themeName } = params
    let [mainPic] = files
    let themePath = this.#themeDir(themeName)
    if (!fs.existsSync(themePath)) {
      throw new GuobaError(`${themeName} 不存在！`)
    }
    let mainImgPath = this.#themeFile(themeName, "main.png")
    moveFile(mainPic.path, mainImgPath)
  }

  async deleteHelpTheme(params) {
    let { themeName } = params
    if (!themeName) {
      throw new GuobaError(`themeName 必须填写！`)
    }
    let themePath = this.#themeDir(themeName)
    if (this.#isDefaultTheme(themeName)) {
      throw new GuobaError(`默认皮肤不可删除！`)
    }
    fs.rmSync(themePath, { recursive: true })
  }

  /**
   * 获取皮肤main.png路径
   * @return {*}
   */
  getThemeMainPath(query) {
    let { themeName } = query || {}
    if (themeName == null || themeName === "") themeName = "default"
    let themeMainPath = this.#themeFile(themeName, "main.png")
    return fs.existsSync(themeMainPath) ? themeMainPath : this.#themeFile("default", "main.png")
  }

  /**
   * 获取皮肤bg路径
   * @return {*}
   */
  getThemeBgPath() {
    return this.#themeFile("default", "bg.jpg")
  }

  getBackupCfg() {
    let backCfg = super.getBackupCfg()
    let { backupList } = backCfg
    backupList.forEach(item => {
      if (item.version !== 2) item.version = 1
    })
    return backCfg
  }

  addBackup(remark) {
    let { backupPath, backupList, save } = this.getBackupCfg()
    let { helpCfgPath, iconPath } = this.miaoPath
    if (!fs.existsSync(helpCfgPath)) {
      throw new GuobaError("未检测到配置文件，请先保存一次即可正常使用备份功能")
    }
    let id = Date.now().toString()
    backupList.push({ id, remark, time: moment().format("YYYY-MM-DD HH:mm:ss"), version: 2 })
    let backupDir = path.join(backupPath, id)
    fs.mkdirSync(backupDir)
    fs.cpSync(iconPath, path.join(backupDir, path.basename(iconPath)))
    fs.cpSync(helpCfgPath, path.join(backupDir, path.basename(helpCfgPath)))
    save()
    return true
  }

  async restoreBackup(id) {
    let backupCfg = this.getBackupCfg()
    let item = backupCfg.find(id) || { id, version: 2 }
    if (item.version !== 2) {
      await this.convertBackup(item)
    }
    let { helpCfgPath, iconPath } = this.miaoPath
    // 未登记目录也先完整校验全部源文件，再写入当前配置。
    let files = this.getBackupFiles(id, 2)
    fs.cpSync(files["icon.png"], iconPath)
    fs.cpSync(files["help.js"], helpCfgPath)
    return true
  }

  async convertBackup(backItem) {
    let { save } = this.getBackupCfg()
    let backupDir = this.getBackupDir(backItem.id)
    let files = this.getBackupFiles(backItem.id, 1)
    let newHelpPath = resolvePathWithinRoot(
      this.backupCfg.backupPath,
      path.join(backupDir, "help.js"),
    )
    // 将配置文件转为新格式
    let oldCfgPath = files["help-cfg.js"]
    let { Data } = await this.getMiaoUtils()
    let defCfg
    try {
      defCfg = await Data.importModule(`config/help_default.js`)
    } catch (e) {
      defCfg = await Data.importModule(`config/system/help_system.js`)
    }
    if (!defCfg) {
      throw new GuobaError("转换失败，请勿删除默认配置文件")
    }
    let oldCfg = await this.#importConfig(oldCfgPath)
    // 兼容一下旧字段
    let customCfg = lodash.isArray(oldCfg.helpCfg)
      ? { helpList: oldCfg.helpCfg, helpCfg: {} }
      : oldCfg
    let helpCfg = lodash.defaults(customCfg.helpCfg || {}, defCfg.helpCfg)
    let helpList = customCfg.helpList || defCfg.helpList
    let mainImgPath = files["main-01.png"]
    // 将背景图片转为皮肤
    if (fs.existsSync(mainImgPath)) {
      let themeName = backItem.remark || backItem.id
      try {
        validatePathSegment(themeName, "皮肤名称")
      } catch {
        // 备注是自由文本，不应妨碍合法旧备份恢复；使用目录名作为安全皮肤名。
        themeName = backItem.id
      }
      let themeDir = this.#themeDir(themeName)
      let count = 0
      while (fs.existsSync(themeDir)) {
        if (count++ > 10) {
          throw new GuobaError("转换失败，皮肤名称重复")
        }
        themeName += "_" + lodash.random(100, 999)
        themeDir = this.#themeDir(themeName)
      }
      fs.mkdirSync(themeDir)
      moveFile(mainImgPath, this.#themeFile(themeName, "main.png"))
      // 指定为转换后的皮肤
      helpCfg.theme = [themeName]
    }
    // 保存新配置
    let content = `export const helpCfg = ${JSON.stringify(helpCfg, null, 2)}\n`
    content += `export const helpList = ${JSON.stringify(helpList, null, 2)}`
    fs.writeFileSync(newHelpPath, content, "utf-8")
    backItem.version = 2
    delete backItem.isInit
    save()
    // 删除旧配置
    fs.unlinkSync(oldCfgPath)
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

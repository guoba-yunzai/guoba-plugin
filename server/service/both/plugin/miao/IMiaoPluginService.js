import fs from "fs"
import path from "path"
import yaml from "yaml"
import moment from "moment"
import { _paths } from "#guoba.platform"

import { Result, Service, GuobaError } from "#guoba.framework"
import { resolvePathWithinRoot, validatePathSegment } from "../../../../utils/safePath.js"

export default class IMiaoPluginService extends Service {
  /**
   * 初始化最初的备份
   */
  initBackup() {
    throw Result.ERR_CODE_501
  }

  /**
   * 获取帮助
   */
  getHelpSetting() {
    throw Result.ERR_CODE_501
  }

  /**
   * 保存帮助
   */
  saveHelpSetting() {
    throw Result.ERR_CODE_501
  }

  /**
   * 获取皮肤main.png路径
   */
  getThemeMainPath() {
    throw Result.ERR_CODE_501
  }

  /**
   * 获取皮肤列表
   */
  getHelpThemeList() {
    throw Result.ERR_CODE_501
  }

  /**
   * 获取皮肤config配置
   */
  getHelpThemeConfig() {
    throw Result.ERR_CODE_501
  }

  /**
   * 保存皮肤config配置
   */
  saveHelpThemeConfig() {
    throw Result.ERR_CODE_501
  }

  /**
   * 新增皮肤
   */
  addHelpTheme() {
    throw Result.ERR_CODE_501
  }

  /**
   * 修改皮肤（仅底图）
   */
  editHelpTheme() {
    throw Result.ERR_CODE_501
  }

  /**
   * 删除皮肤
   */
  deleteHelpTheme() {
    throw Result.ERR_CODE_501
  }

  /**
   * 获取皮肤bg路径
   */
  getThemeBgPath() {
    throw Result.ERR_CODE_501
  }

  backupCfg = null

  /**
   * 获取备份config
   */
  getBackupCfg() {
    if (!this.backupCfg) {
      let backupPath = path.join(_paths.data, "miaoHelpBackup")
      if (!fs.existsSync(backupPath)) fs.mkdirSync(backupPath)
      let dbPath = resolvePathWithinRoot(backupPath, "db.yaml")
      let backupList = fs.existsSync(dbPath) ? yaml.parse(fs.readFileSync(dbPath, "utf-8")) : []
      this.backupCfg = {
        backupPath,
        backupList,
        save: () => fs.writeFileSync(dbPath, yaml.stringify(backupList), "utf-8"),
        find: id => backupList.find(item => item.id === id),
      }
    }
    this.discoverBackups(this.backupCfg)
    return this.backupCfg
  }

  /**
   * 获取备份根下的目录，支持管理员手工拷入、尚未登记的备份。
   * @param {string} id 备份标识
   * @returns {string} 备份目录的绝对路径
   */
  getBackupDir(id) {
    validatePathSegment(id, "备份标识")
    let backupCfg = this.backupCfg || this.getBackupCfg()
    let backupDir = resolvePathWithinRoot(backupCfg.backupPath, id)
    if (path.relative(path.resolve(backupCfg.backupPath), backupDir) === "") {
      throw new GuobaError("备份标识不合法！")
    }
    if (!fs.existsSync(backupDir) || !fs.statSync(backupDir).isDirectory()) {
      throw new GuobaError("备份目录不存在！")
    }
    return backupDir
  }

  /** 校验备份的全部源文件，保证复制前已确认完整性及真实路径边界。 */
  getBackupFiles(id, version) {
    let backupDir = this.getBackupDir(id)
    return this.inspectBackupFiles(this.backupCfg.backupPath, backupDir, version)
  }

  inspectBackupFiles(backupPath, backupDir, version) {
    let names = version === 2 ? ["help.js", "icon.png"] : ["help-cfg.js", "main-01.png", "icon.png"]
    return Object.fromEntries(
      names.map(name => {
        let filePath = resolvePathWithinRoot(backupPath, path.join(backupDir, name))
        if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
          throw new GuobaError("备份文件不完整，无法恢复！")
        }
        return [name, filePath]
      }),
    )
  }

  /** 将固定备份根内的完整备份补入列表，方便直接使用手工复制的目录。 */
  discoverBackups(backupCfg) {
    let { backupPath, backupList } = backupCfg
    let changed = false
    for (const id of fs.readdirSync(backupPath)) {
      try {
        validatePathSegment(id, "备份标识")
        let backupDir = resolvePathWithinRoot(backupPath, id)
        let stat = fs.statSync(backupDir)
        if (!stat.isDirectory()) continue
        let version = fs.existsSync(path.join(backupDir, "help.js")) ? 2 : 1
        this.inspectBackupFiles(backupPath, backupDir, version)
        let item = backupList.find(item => item.id === id)
        if (item?.version === version) continue
        if (item) {
          item.version = version
        } else {
          backupList.push({
            id,
            remark: id,
            time: moment(stat.mtime).format("YYYY-MM-DD HH:mm:ss"),
            version,
          })
        }
        changed = true
      } catch {
        // 不导入不完整备份，也不跟随指向备份目录外的链接。
      }
    }
    if (changed) backupCfg.save()
  }

  /**
   * 添加备份
   * @param remark
   * @param isInit
   */
  addBackup(remark, isInit = false) {
    throw Result.ERR_CODE_501
  }

  /**
   * 恢复备份
   * @param id
   */
  restoreBackup(id) {
    throw Result.ERR_CODE_501
  }

  /**
   * 删除备份
   * @param id
   */
  deleteBackup(id) {
    throw Result.ERR_CODE_501
  }
}

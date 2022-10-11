import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import {_paths} from '../../../../../utils/paths.js'

const Service = await Guoba.GID('#/components/Service.js')
/** @type {GuobaConstant} */
const Constant = await Guoba.GID('#/constant/Constant.js')

// noinspection JSUnusedGlobalSymbols
export default class IMiaoPluginService extends Service {
  constructor(app) {
    super(app)
  }

  /**
   * 初始化最初的备份
   */
  initBackup() {
    throw Constant.ERROR_501
  }

  /**
   * 获取帮助
   */
  getHelpSetting() {
    throw Constant.ERROR_501
  }

  /**
   * 保存帮助
   */
  saveHelpSetting() {
    throw Constant.ERROR_501
  }

  /**
   * 获取皮肤main.png路径
   */
  getThemeMainPath() {
    throw Constant.ERROR_501
  }

  /**
   * 获取皮肤列表
   */
  getHelpThemeList() {
    throw Constant.ERROR_501
  }

  /**
   * 获取皮肤config配置
   */
  getHelpThemeConfig() {
    throw Constant.ERROR_501
  }

  /**
   * 保存皮肤config配置
   */
  saveHelpThemeConfig() {
    throw Constant.ERROR_501
  }

  /**
   * 新增皮肤
   */
  addHelpTheme() {
    throw Constant.ERROR_501
  }

  /**
   * 修改皮肤（仅底图）
   */
  editHelpTheme() {
    throw Constant.ERROR_501
  }

  /**
   * 删除皮肤
   */
  deleteHelpTheme() {
    throw Constant.ERROR_501
  }

  /**
   * 获取皮肤bg路径
   */
  getThemeBgPath() {
    throw Constant.ERROR_501
  }

  backupCfg = null

  /**
   * 获取备份config
   */
  getBackupCfg() {
    if (this.backupCfg) {
      return this.backupCfg
    }
    let backupPath = path.join(_paths.data, 'miaoHelpBackup')
    if (!fs.existsSync(backupPath)) {
      fs.mkdirSync(backupPath)
    }
    let dbPath = path.join(backupPath, 'db.yaml')
    let backupList = []
    if (fs.existsSync(dbPath)) {
      backupList = yaml.parse(fs.readFileSync(dbPath, 'utf-8'))
    }
    return this.backupCfg = {
      backupPath,
      backupList,
      save() {
        fs.writeFileSync(dbPath, yaml.stringify(backupList), 'utf-8')
      },
      find(id) {
        return backupList.find(item => item.id === id)
      },
    }
  }

  /**
   * 添加备份
   * @param remark
   * @param isInit
   */
  addBackup(remark, isInit = false) {
    throw Constant.ERROR_501
  }

  /**
   * 恢复备份
   * @param id
   */
  restoreBackup(id) {
    throw Constant.ERROR_501
  }

  /**
   * 删除备份
   * @param id
   */
  deleteBackup(id) {
    throw Constant.ERROR_501
  }

}

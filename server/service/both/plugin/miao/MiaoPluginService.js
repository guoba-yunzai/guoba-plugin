import path from 'path'
import {_paths} from '../../../../../utils/paths.js'

const {GID} = Guoba.createImport(import.meta.url)

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

    return this._miaoPath = {miaoPath}
  }

  initBackup() {
    super.initBackup()
  }

  getHelpSetting() {
    super.getHelpSetting()
  }

  saveHelpSetting() {
    super.saveHelpSetting()
  }

  getBackupCfg() {
    return super.getBackupCfg()
  }

  addBackup(remark, isInit = false) {
    super.addBackup(remark, isInit)
  }

  restoreBackup(id) {
    super.restoreBackup(id)
  }

  deleteBackup(id) {
    super.deleteBackup(id)
  }

}
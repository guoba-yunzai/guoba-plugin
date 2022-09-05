import fs from 'fs'
import path from 'path'
import lodash from 'lodash'
import {_paths} from './paths.js'
import {randomString} from './common.js'
import YamlReader from '../components/YamlReader.js'

/** 配置文件 */
class GuobaConfig {
  constructor() {
    /** 默认设置 */
    this.defSet = {
      path: path.join(_paths.pluginRoot, 'defSet/application.yaml'),
      reader: null,
    }
    /** 用户设置 */
    this.config = {
      path: path.join(_paths.pluginRoot, 'config/application.yaml'),
      reader: null,
    }
    this.initConfig()
  }

  /** 初始化用户配置文件 */
  initConfig() {
    let isInit = false
    if (!fs.existsSync(this.config.path)) {
      isInit = true
      let configDir = path.dirname(this.config.path);
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir);
      }
      fs.copyFileSync(this.defSet.path, this.config.path)
    }
    try {
      this.defSet.reader = new YamlReader(this.defSet.path, false)
      this.config.reader = new YamlReader(this.config.path, true)
    } catch (error) {
      logger.error(`[Guoba] 配置文件格式错误! `, error)
      throw error
    }
    if (isInit) {
      // 随机生成32位 secret
      this.set('jwt.secret', randomString(32))
    }
    this.config.reader.watcher.on('change', () => {
      if (!this.config.reader.isSave) {
        logger.mark(`[Guoba] 配置文件重载成功~`)
      }
    })
  }

  /** 合并默认配置和用户配置 */
  get merged() {
    return lodash.merge({}, this.defSet.reader.jsonData, this.config.reader.jsonData)
  }

  /** 通过配置路径获取值，例如：server.port */
  get(keyPath) {
    return lodash.get(this.merged, keyPath)
  }

  set(keyPath, value) {
    this.config.reader.set(keyPath, value)
  }
}

export default new GuobaConfig()

import fs from 'fs'
import path from 'path'
import lodash from 'lodash'
import {YamlReader} from '#guoba.framework'
import {_paths} from '#guoba.platform'
import {isTRSS} from '#guoba.adapter'
import {randomString} from '#guoba.utils'

/** 配置文件 */
class GuobaConfig {
  constructor(options) {
    this.trssCfg = options.trssCfg
    /** 默认配置 */
    this.defSet = {
      path: path.join(_paths.pluginRoot, 'defSet/application.yaml'),
      reader: null,
    }
    /** 用户配置 */
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
      let configDir = path.dirname(this.config.path)
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir)
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

  get serverHost() {
    let host = this.get('server.host')
    if (Array.isArray(host)) {
      if (host.length <= 1) {
        return host[0]
      } else {
        return host.splice(0, 2)
      }
    }
    return host
  }

  get serverPort() {
    const {port, helloTRSS} = this.get('server')
    if (isTRSS && helloTRSS) {
      return this.trssCfg.server.port
    }
    return port
  }

  /**
   * 服务器挂载路径
   * @return {{mountRoot: string, mountPrefix: string, mountRootWithSlash: string}}
   */
  get serverMountPath() {
    let {mountPrefix, helloTRSS} = this.get('server')
    mountPrefix = mountPrefix ? mountPrefix : '/'

    // 集成trss下默认前缀为 /guoba
    if (isTRSS && helloTRSS && mountPrefix === '/') {
      mountPrefix = "/guoba"
    }

    // 挂载路径（末尾不带斜杠）
    let mountRoot
    // 挂载路径（末尾带斜杠）
    let mountRootWithSlash

    if (mountPrefix === '/') {
      mountRoot = mountPrefix
      mountRootWithSlash = mountPrefix
    } else if (mountPrefix.endsWith('/')) {
      mountRoot = mountPrefix.slice(0, -1)
      mountRootWithSlash = mountPrefix
    } else {
      mountRoot = mountPrefix
      mountRootWithSlash = mountPrefix + '/'
    }

    return {mountPrefix, mountRoot, mountRootWithSlash}
  }

  getJwtSecret() {
    let secret = this.get('jwt.secret')
    if (!secret || secret.length !== 32) {
      // 随机生成32位 secret
      secret = randomString(32)
      this.set('jwt.secret', secret)
      logger.warn(`[Guoba] 检测到 jwt.secret 配置损坏，已重新生成！请勿随意更改或泄漏此配置！`)
    }
    return secret
  }

}

const options = {}

if (isTRSS) {
  options['trssCfg'] = (await import('../../../lib/config/config.js')).default
}

/** Guoba配置 */
export default new GuobaConfig(options)

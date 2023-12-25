import os from 'os'
import fs from 'fs'
import path from 'path'
import lodash from 'lodash'
import fetch from 'node-fetch'
import {Service} from '#guoba.framework';
import {Constant, GuobaSupportMap, PluginsMap} from "#guoba.platform";
import {parsePluginsIndexByLocal, parseReadmeLink} from '../../helper/pluginsIndex.js'

export default class IPluginService extends Service {
  constructor(app) {
    super(app)
    // 获取插件列表，填充GuobaSupportMap
    this.loadPlugining = this.getPlugins()
  }

  /**
   * 获取所有插件
   * @param force 是否清空缓存强制刷新
   * @return {Promise<*>}
   */
  async getPlugins(force = false) {
    let remotePlugins = await this.getRemotePlugins(force)
    let localPlugins = await this.readLocalPlugins(this.pluginsPath)
    for (let rp of remotePlugins) {
      let idx = localPlugins.findIndex(({name}) => lodash.toLower(name) === lodash.toLower(rp.name))
      if (idx > -1) {
        let lp = localPlugins[idx]
        Object.assign(rp, lp, {installed: true})
        localPlugins.splice(idx, 1)
      }
    }
    if (localPlugins.length > 0) {
      for (let plugin of localPlugins) {
        remotePlugins.push({
          isV2: false, isV3: false, isDeleted: false,
          title: plugin.name, name: plugin.name,
          link: '', author: '未知', authorLink: '', description: '',
          installed: true, ...plugin,
        })
      }
    }
    // 处理config等信息
    for (let plugin of remotePlugins) {
      // 判断是否配置了 iconPath
      if (plugin.iconPath) {
        plugin.iconPath = `/api/plugin/s/${plugin.name}/icon`
      }
      // 判断是否支持guoba
      let supportObject = GuobaSupportMap.get(plugin.name)
      if (!supportObject) {
        continue
      }
      // 判断是否支持配置项
      let {configInfo} = supportObject
      if (configInfo && configInfo.schemas && typeof configInfo.getConfigData === 'function') {
        plugin.hasConfig = true
        plugin.schemas = configInfo.schemas
      }
    }
    // 已安装的插件，排在前面
    return remotePlugins.sort((a, b) => {
      if (a.installed && !b.installed) {
        return -1
      }
      if (!a.installed && b.installed) {
        return 1
      }
      return 0
    })
  }

  /**
   * 读取本地插件信息
   * @param pluginsPath
   * @return {object[]}
   */
  async readLocalPlugins(pluginsPath) {
    let files = fs.readdirSync(pluginsPath)
    let plugins = []
    for (let name of files) {
      if (this.exclude && this.exclude.includes(name)) {
        continue
      }
      let filePath = path.join(pluginsPath, name)
      let stat = fs.statSync(filePath)
      if (stat.isDirectory()) {
        let jsPath = path.join(filePath, 'index.js')
        if (fs.existsSync(jsPath) || fs.existsSync(path.join(filePath, '.git/'))) {
          let plugin = {
            name: name.toLowerCase(),
          }
          jsPath = path.join(filePath, 'guoba.support.js')
          // 判断是否支持锅巴
          if (fs.existsSync(jsPath)) {
            try {
              // 判断是否是windows系统
              if (os.platform() === 'win32') {
                jsPath = 'file:///' + jsPath
              }
              let {supportGuoba} = await import(jsPath)
              if (typeof supportGuoba === 'function') {
                // TODO 传什么参数？待定
                let supportObject = supportGuoba()
                if (supportObject.pluginInfo) {
                  plugin = Object.assign(plugin, supportObject.pluginInfo)
                }
                // 注册进锅巴
                GuobaSupportMap.set(plugin.name, supportObject)
              } else {
                throw 'supportGuoba必须要定义成一个方法！'
              }
            } catch (e) {
              logger.error(`[Guoba] 载入guoba.support.js失败：` + (e.message || e))
            }
          }
          PluginsMap.set(plugin.name, plugin)
          plugins.push(plugin)
        }
      }
    }
    return plugins
  }

  /**
   * 获取远程插件列表
   * @param force 是否清空缓存强制刷新
   * @return {Promise<*>}
   */
  async getRemotePlugins(force = false) {
    let redisKey = Constant.REDIS_PREFIX + 'plugins'
    let remotePlugins = null
    if (!force) {
      remotePlugins = await redis.get(redisKey)
    }
    if (remotePlugins) {
      return JSON.parse(remotePlugins)
    }
    try {
      const remotesMap = await parsePluginsIndexByLocal()
      if (!remotesMap) {
        return []
      }
      const {topPlugins = [], plugins = [], gamePlugins = []} = remotesMap;
      remotePlugins = [...topPlugins, ...plugins, ...gamePlugins]
    } catch (e) {
      logger.error(e)
    }
    // 读取失败……
    if (!remotePlugins || remotePlugins.length === 0) {
      return []
    }
    redis.set(redisKey, JSON.stringify(remotePlugins), {EX: 3600 * 6})
    return remotePlugins
  }

  async getReadmeText(link, force = false) {
    let redisKey = Constant.REDIS_PREFIX + 'plugin:readme:' + link
    let text = null
    if (!force) {
      text = await redis.get(redisKey)
    }
    if (text) {
      return text
    }
    let arr = link.split('/')
    let name = (arr.pop() || '').trim().replace(/\.git$/, '')
    let author = arr.pop()
    let url = ''
    if (/github\.com/i.test(link)) {
      url = `https://raw.githubusercontent.com/${author}/${name}/{branch}`
    } else if (/gitee\.com/i.test(link)) {
      url = `https://gitee.com/${author}/${name}/raw/{branch}`
    }
    if (url) {
      let baseUrl = ''
      let branches = ['master', 'main']
      for (let branch of branches) {
        baseUrl = url.replace('{branch}', branch)
        let response = await fetch(`${baseUrl}/README.md`)
        if (response.status === 200) {
          text = await response.text()
          break
        }
      }
      if (text) {
        text = parseReadmeLink(text, baseUrl)
        redis.set(redisKey, text, {EX: 3600 * 12})
        return text
      }
    }
    return ''
  }

}

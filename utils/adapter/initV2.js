import {reload} from './common.js'
import {pluginPackage} from '../package.js'

const apps = []

export async function init(rule) {
  await reload()

  rule['appRouter'] = {
    reg: '^#?锅巴',
    priority: 50,
    describe: '#锅巴插件'
  }
  apps.push((await import('../../apps/login.js')).GuobaLogin)

  logger.mark(`[Guoba] 欢迎使用锅巴插件，当前版本：${pluginPackage.version}`)
  logger.warn(`[Guoba] 检测到您使用的是V2版本的云崽，当前版本的锅巴仅支持“迁移至V3”功能！`)
  return appRouter
}

global.plugin = class GlobalPlugin {
  constructor(data, e) {
    this.e = e
    this.reply = e.reply
    this.rules = data.rule || []
  }
}

async function appRouter(e) {
  for (let clazz of apps) {
    let app = new clazz(e)
    for (let rule of app.rules) {
      if (new RegExp(rule.reg).test(e.msg)) {
        e.logFnc = `[${app.name}][${rule.fnc}]`
        try {
          let res = await (app[rule.fnc] && app[rule.fnc](e))
          if (res !== false) {
            return true
          }
        } catch (error) {
          logger.error(`${e.logFnc}`)
          logger.error(error.stack)
          return true
        }
      }
    }
  }
}

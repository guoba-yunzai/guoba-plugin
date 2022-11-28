import lodash from 'lodash'
import {v2Apps} from '../utils/adapter/loadV2.js'

/**
 * 锅巴兼容V2
 */
export class GuobaV2Adapter extends plugin {
  constructor(e) {
    super({
      name: '锅巴:兼容V2',
      dsc: '兼容V2的单JS插件',
      event: 'message',
      priority: 0,
      rule: [],
      // log: false,
    })
  }

  async accept(e) {
    for (const v2App of v2Apps) {
      let reg = new RegExp(v2App.reg)
      if (reg.test(e.msg)) {
        logger.mark(`[Guoba_V2][${v2App.key}] ${lodash.truncate(e.msg, {length: 12})}`)
        let res = await v2App.handler(e)
        if (res) {
          return 'return'
        }
      }
    }
  }

}
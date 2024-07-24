/**
 * mock MysInfo
 */
export class MysInfo {
  static async getBingCkUid() {
    log()
    return {}
  }

  static async initCache() {
    log()
    return {}
  }
}

/**
 * mock MysUser
 */
export class MysUser {
  static async getStatData() {
    log()
    return {
      count: {
        total: -1
      }
    }
  }
}

let logged = false

function log() {
  if (logged) {
    return
  }
  logged = true
  logger.warn('[Guoba] 由于没有安装 genshin 插件，所以无法使用相关功能')
}

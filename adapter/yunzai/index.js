import {isV3, isV4} from './version.js'

let V

if (isV4) {
  V = await import('./v4.js')
} else if (isV3) {
  V = await import('./v3.js')
} else {
  // 不支持的版本
  V = {
    ...(await import('./mock/genshin/mys.js')),
  }
}

export const {Restart, MysInfo, MysUser} = V

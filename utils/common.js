import os from 'os'
import fs from 'fs'
import path from 'path'
import lodash from 'lodash'
import cfg from './cfg.js'
import {pluginPackage} from './package.js'
import {_paths} from './paths.js'
import common from '../../../lib/common/common.js'
import BotCfg from '../../../lib/config/config.js'

export const _version = pluginPackage.version

export {
  _paths,
}

export const GuobaSupportMap = new Map()

/**
 * 引入 class 资源
 * @param rootPath
 * @param clazz 筛选类
 * @param classes
 */
export async function loadClasses(rootPath, clazz, classes = {}) {
  let files = readdirRecursiveSync(rootPath, file => /\.c?js$/.test(file))
  for (let filePath of files) {
    try {
      let app = await import('file://' + filePath + '?' + Date.now())
      // 可一次性导入多个类
      for (const [key, value] of Object.entries(app)) {
        if (instanceOf(value, clazz)) {
          let name = key
          if (name === 'default' && value?.name) {
            name = value.name
          }
          classes[name] = value
        }
      }
    } catch (e) {
      logger.error(`[Guoba] loadClasses error: ${logger.red(path.basename(filePath))}`, e)
    }
  }
  return classes
}

/**
 * 获取某个目录下的所有文件（返回的是绝对路径）
 *
 * @param rootPath
 * @param filter 文件名过滤器
 */
export function readdirRecursiveSync(rootPath, filter = () => true) {
  let files = fs.readdirSync(rootPath)
  let ret = []
  for (let file of files) {
    let filePath = path.join(rootPath, file)
    let stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      ret = ret.concat(readdirRecursiveSync(filePath))
    } else if (filter(file)) {
      ret.push(filePath)
    }
  }
  return ret
}

/**
 * 判断是否是某个类的实例或继承类
 *
 * @param obj
 * @param clazz
 */
export function instanceOf(obj, clazz) {
  if (obj instanceof clazz) {
    return true
  } else if (obj?.prototype) {
    return instanceOf(obj.prototype, clazz)
  }
  return false
}

/**
 * 随机生成指定长度的字符串
 * @param length
 * @return {string}
 */
export function randomString(length = 8) {
  let str = ''
  for (let i = 0; i < length; i++) {
    str += lodash.random(36).toString(36)
  }
  return str.substr(0, length)
}

export function toPairsMap(arg) {
  let obj = {}
  let pairs = lodash.toPairs(arg)
  for (let [key, value] of pairs) {
    obj[key] = value
  }
  return obj
}

/**
 * 给主人发送消息
 * @param msg 消息内容
 * @param all 是否发送给所有主人，默认false
 * @param idx 不发送给所有主人时，指定发送给第几个主人，默认发送给第一个主人
 */
export async function sendToMaster(msg, all = false, idx = 0) {
  let masterQQ = BotCfg.masterQQ
  let sendTo = all ? masterQQ : [masterQQ[idx]]
  for (let qq of sendTo) {
    await common.relpyPrivate(qq, msg)
  }
}

/**
 * 获取web地址
 * @param allIp 是否展示全部IP
 */
export function getWebAddress(allIp = false) {
  let {host, port, splicePort} = cfg.get('server');
  port = splicePort ? Number.parseInt(port) : null;
  port = port === 80 ? null : port;
  let hosts = [];
  if (host === 'auto') {
    let ips = getLocalIps(port);
    if (ips.length === 0) {
      ips.push(`localhost${port ? ':' + port : ''}`);
    }
    if (allIp) {
      hosts = ips.map(ip => `http://${ip}`);
    } else {
      hosts.push(`http://${ips[0]}`);
    }
  } else {
    host = /^http/.test(host) ? host : 'http://' + host;
    hosts.push(`${host}${port ? ':' + port : ''}`);
  }
  return hosts
}

/**
 * 获取本地ip地址
 * 感谢 @吃吃吃个柚子皮
 * https://gitee.com/guoba-yunzai/guoba-plugin/pulls/2
 * @param port 要拼接的端口号
 * @return {*[]}
 */
export function getLocalIps(port ) {
  let networks = os.networkInterfaces()
  let ips = []
  // noinspection EqualityComparisonWithCoercionJS
  port = port ? `:${port}` : ''
  for (let [name, wlans] of Object.entries(networks)) {
    for (let wlan of wlans) {
      /**
       * 更改过滤规则,填坑。(之前未测试Windows系统)
       * 通过掩码过滤本地IPv6
       * 通过MAC地址过滤Windows 本地回环地址（踩坑）
       * 过滤lo回环网卡（Linux要过滤'lo'），去掉会导致Linxu"::1"过滤失败（踩坑）
       * 如有虚拟网卡需自己加上过滤--技术有限
       */
      if ((wlan.netmask !== 'ffff:ffff:ffff:ffff::')&&(wlan.mac !== '00:00:00:00:00:00')&&(name !== 'docker0'&&name !== 'lo')) {
        if (wlan.family === 'IPv6') {
          ips.push(`[${wlan.address}]${port}`)
        } else {
          ips.push(`${wlan.address}${port}`)
        }
      }
    }
  }
  return ips
}

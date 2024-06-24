import fs from 'fs'
import path from 'path'

// 三种获取插件名的方式
// console.log('pluginName 1:', path.basename(path.join(import.meta.url, '../../')))
// console.log('pluginName 2:', import.meta.url.match(/[\/\\](GUOBA-PLUGIN)[\/\\]/i)[1])
// console.log('pluginName 3:', path.basename(path.dirname(path.dirname(import.meta.url))))

/** Guoba实际所在的目录名 */
export const pluginName = path.basename(path.join(import.meta.url, '../../'))

export const pluginPackage = JSON.parse(fs.readFileSync(`./plugins/${pluginName}/package.json`, 'utf8'))

/** Guoba当前版本 */
export const _version = pluginPackage.version
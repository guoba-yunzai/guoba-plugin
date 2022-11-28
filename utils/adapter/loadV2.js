import fs from 'fs'
import path from 'path'
import lodash from 'lodash'
import {_paths} from '../paths.js'

let v2Apps = []

const v2JsPath = path.join(_paths.pluginRoot, 'lib/v2-js')

// 加载V2单JS文件插件
export async function loadV2Apps() {
  let checkReg = /.js$/i
  let fileList = fs.readdirSync(v2JsPath)
  fileList = fileList.filter((i) => checkReg.test(i))
  if (fileList.length === 0) {
    return
  }
  let count = 0
  for (let fileName of fileList) {
    try {
      let filePath = path.join(v2JsPath, fileName)
      let module = await import('file:///' + filePath)
      if (!module.rule) continue
      let name = fileName.replace(checkReg, '')
      for (let [ruleName, rule] of Object.entries(module.rule)) {
        let ruleKey = `${name}:${ruleName}`
        let handler = module[ruleName]
        if (typeof handler !== 'function') {
          throw new Error(`请先export该方法：${ruleName}`)
        }
        v2Apps.push({...rule, key: ruleKey, handler})
        count++
      }
    } catch (error) {
      logger.error(`[Guoba] 载入V2插件报错：${fileName}`)
      console.error(error)
    }
  }
  logger.info(`[Guoba] 成功载入了${count}个V2插件`)
  v2Apps = lodash.orderBy(v2Apps, ['priority'], ['asc'])
}

export {
  v2Apps
}

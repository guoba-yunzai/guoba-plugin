import path from 'path'
import {GuobaError} from "#guoba.framework";

const {_paths} = await Guoba.GI('@/utils/common.js')
const YamlReader = await Guoba.GID('@/components/YamlReader.js')

export const configReader = new Map()

export function getConfigReader(key, configFile) {
  let reader = configReader.get(key)
  if (!reader) {
    let filePath = configFile[key]
    if (filePath) {
      filePath = path.join(_paths.root, filePath)
      reader = new YamlReader(filePath, true)
      configReader.set(key, reader)
    } else {
      throw new GuobaError(`没有找到配置文件：${key}`)
    }
  }
  return reader
}

import fs from 'fs'
import path from 'path'
import {_paths} from '../../../utils/paths.js'
import {isV2} from '../../../utils/adapter.js'

const Result = await Guoba.GID('#/components/Result.js')
const RestController = await Guoba.GID('#/components/RestController.js')

/**
 * V2迁移
 */
export default class V2Transfer extends RestController {

  constructor(app) {
    super('/v2-transfer', app)
  }

  registerRouters() {
    if (isV2) {
      // 检查JS文件兼容性
      this.get('/check-js', this.checkJsFile)
    }
  }

  examplePath = path.join(_paths.root, '/lib/example')

  async checkJsFile() {
    let passed = []
    let noPass = []
    if (fs.existsSync(this.examplePath)) {
      let fileList = fs.readdirSync(this.examplePath)
        .filter(i => path.extname(i) === '.js')
        .map((i) => path.join(this.examplePath, i))
      for1: for (let filePath of fileList) {
        let body = fs.readFileSync(filePath, {encoding: 'utf-8'})
        let lines = body.split(/\r\n|\n/)
        // 检查是否存在不兼容的写法
        for (let i = 0; i < lines.length; i++) {
          let line = lines[i]
          let lineNum = i + 1
          // 不兼容：相对路径
          if (/\sfrom\s+['"]\.{1,2}\//i.test(line)) {
            this.addCheckJsItem(noPass, filePath, {line, lineNum, reason: '使用“相对路径”写法，无法保证兼容性'})
            continue for1
          }
          // 不兼容：BotConfig
          if (/BotConfig\./.test(line)) {
            this.addCheckJsItem(noPass, filePath, {line, lineNum, reason: '使用“BotConfig”写法，V3中已不兼容'})
            continue for1
          }
        }
        this.addCheckJsItem(passed, filePath)
      }
    }
    return Result.ok({passed, noPass})
  }

  addCheckJsItem(arr, filePath, o) {
    arr.push({file: path.basename(filePath), ...o})
    return arr
  }

}
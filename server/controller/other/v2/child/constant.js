import fs from 'fs'
import path from 'path'
import {_paths} from '../../../../../utils/paths.js'

// 资源Set
export const RES_SET = {
  git: {
    gitee: 'https://gitee.com/Le-niao/Yunzai-Bot.git',
    github: 'https://github.com/Le-niao/Yunzai-Bot.git'
  }
}

// 操作状态
export const ACTION_CODE = {wait: 0, ing: 1, success: 2, fail: 3}

export const examplePath = path.join(_paths.root, '/lib/example')

// 检查JS兼容性
export const checkJsCompatibility = (dirPath) => {
  let passed = []
  let noPass = []
  if (fs.existsSync(dirPath)) {
    let fileList = fs.readdirSync(dirPath)
      .filter(i => path.extname(i) === '.js')
      .map((i) => path.join(dirPath, i))
    for1: for (let filePath of fileList) {
      let body = fs.readFileSync(filePath, {encoding: 'utf-8'})
      let lines = body.split(/\r\n|\n/)
      // 检查是否存在不兼容的写法
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i]
        let lineNum = i + 1
        // 不兼容：相对路径
        if (/\sfrom\s+['"]\.{1,2}\//i.test(line)) {
          addCheckJsItem(noPass, filePath, {line, lineNum, reason: '使用“相对路径”写法，无法保证兼容性'})
          continue for1
        }
        // 不兼容：BotConfig
        if (/BotConfig\./.test(line)) {
          addCheckJsItem(noPass, filePath, {line, lineNum, reason: '使用“BotConfig”写法，V3中已不兼容'})
          continue for1
        }
        // 不兼容：YunzaiApps
        if (/YunzaiApps\./.test(line)) {
          addCheckJsItem(noPass, filePath, {line, lineNum, reason: '使用“YunzaiApps”写法，V3中已不兼容'})
          continue for1
        }
      }
      addCheckJsItem(passed, filePath)
    }
  }
  return {passed, noPass}
}

function addCheckJsItem(arr, filePath, o) {
  arr.push({file: path.basename(filePath), ...o})
  return arr
}

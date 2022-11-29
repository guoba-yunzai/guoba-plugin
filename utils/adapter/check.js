import chalk from 'chalk'
import {isV3} from '../adapter.js'

export const needPackage = [
  'yaml',
  'express',
  'body-parser',
  'multer',
  'jsonwebtoken',
]

export async function checkPackage() {
  for (let pkgName of needPackage) {
    try {
      await import(pkgName)
    } catch (e) {
      packageTips(e)
      return false
    }
  }
  return true
}

export function packageTips(error) {
  logger.mark('---- 锅巴启动失败 ----')
  let pack = error.stack.match(/'(.+?)'/g)[0].replace(/'/g, '')
  logger.mark(`缺少依赖：${chalk.red(pack)}`)
  let cmd = isV3 ? 'pnpm add $s -w' : 'npm install $s'
  logger.mark(`请执行安装依赖命令：${chalk.red(cmd.replace('$s', pack))}`)
  logger.mark('---------------------')
}

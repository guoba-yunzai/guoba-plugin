import chalk from 'chalk'
import {isV3, isV4} from '#guoba.adapter'

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
      packageTips(e, pkgName)
      return false
    }
  }
  return true
}

export function packageTips(error, pkgName) {
  logger.mark('---- 锅巴启动失败 ----')
  let pack = pkgName
  if (!pack) {
    let match = error.stack.match(/Cannot find (?:package|module) '(.+?)'/)
    pack = match ? match[1] : null
  }
  pack = pack || 'unknown'
  logger.mark(`缺少依赖：${chalk.red(pack)}`)
  let cmd = (isV3 || isV4) ? 'pnpm add $s -w' : 'npm install $s'
  logger.mark(`请执行安装依赖命令：${chalk.red(cmd.replace('$s', pack))}`)
  logger.mark('---------------------')
}

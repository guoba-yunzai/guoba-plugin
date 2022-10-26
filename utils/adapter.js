/*
* 更改此文件需要重启
*/
import {yunzaiPackage} from './package.js'

let isV2 = false, isV3 = false, yunzaiVersion = yunzaiPackage?.version

if (yunzaiVersion) {
  // 3.x 版本
  if (yunzaiVersion.startsWith('3')) {
    isV3 = true
  } else {
    isV2 = true
  }
}

let isDev = (process.argv || []).includes('dev')

export {isV2, isV3, yunzaiVersion, isDev}

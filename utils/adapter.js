import {yunzaiPackage} from './package.js'

// 检查yunzai版本
export const {isV2, isV3, isTRSS, yunzaiVersion} = checkVersion();
// 是否开发模式
export const isDev = (process.argv || []).includes('dev')

function checkVersion() {
  let isV2 = false, isV3 = false

  let {name, version} = yunzaiPackage ?? {}

  if (version) {
    // 3.x 版本
    if (version.startsWith('3')) {
      isV3 = true
    } else {
      isV2 = true
    }
  }

  const isTRSS = yunzaiPackage.name === 'trss-yunzai'

  return {
    isV2,
    isV3,
    isTRSS,
    yunzaiVersion: version,
  }
}
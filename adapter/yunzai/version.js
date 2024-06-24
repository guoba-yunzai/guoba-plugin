import fs from 'fs'

export const yunzaiPackage = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

// 检查yunzai版本
export const {
  isV2,
  isV3,
  isV4,
  isTRSS,
  noSupport,
  yunzaiVersion,

  hasGenshin,
} = checkVersion()

// 是否开发模式
export const isDev = (process.argv || []).includes('dev')

function checkVersion() {
  let isV2 = false, isV3 = false, isV4 = false, noSupport = false

  let {name, version} = yunzaiPackage ?? {}

  if (version) {
    if (version.startsWith('2')) {
      isV2 = true
    } else if (version.startsWith('3')) {
      isV3 = true
    } else if (version.startsWith('4')) {
      isV4 = true
    } else {
      noSupport = true
    }
  }

  const isTRSS = yunzaiPackage.name === 'trss-yunzai'

  // v4 need check genshin
  const hasGenshin = fs.existsSync('./plugins/genshin')

  return {
    isV2,
    isV3,
    isV4,
    noSupport,
    isTRSS,
    yunzaiVersion: version,

    hasGenshin,
  }
}

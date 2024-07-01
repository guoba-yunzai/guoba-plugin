import {hasGenshin, isTRSS} from './version.js'

let Restart
try {
  Restart = (await import('../../../other/restart.js')).Restart
} catch {
  Restart = (await import('./mock/system/apps.js')).Restart
}

let MysInfo, MysUser;

const importMys = async () => {
  MysInfo = (await import('../../../genshin/model/mys/mysInfo.js')).default
  MysUser = (await import('../../../genshin/model/mys/MysUser.js')).default
}

if (isTRSS) {
  if (hasGenshin) {
    await importMys()
  } else {
    const mys = (await import('./mock/genshin/mys.js'))
    MysInfo = mys.MysInfo
    MysUser = mys.MysUser
  }
} else {
  await importMys()
}

export {
  Restart,
  MysInfo,
  MysUser,
}

let Restart
try {
  Restart = (await import('../../../other/restart.js')).Restart
} catch {
  Restart = (await import('./mock/system/apps.js')).Restart
}

const MysInfo = await Guoba.GID('/plugins/genshin/model/mys/mysInfo.js')
const MysUser = await Guoba.GID('/plugins/genshin/model/mys/MysUser.js')

export {
  Restart,
  MysInfo,
  MysUser,
}

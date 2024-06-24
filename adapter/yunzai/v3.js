let Restart
try {
  Restart = (await import('../../../other/restart.js')).Restart
} catch {
  Restart = (await import('./mock/system/apps.js')).Restart
}

export const MysInfo = (await import('../../../genshin/model/mys/mysInfo.js')).default
export const MysUser = (await import('../../../genshin/model/mys/MysUser.js')).default

export {
  Restart,
}

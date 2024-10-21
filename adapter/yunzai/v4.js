let Restart
try {
  Restart = (await import('../../../system/apps/restart.js')).Restart
} catch {
  Restart = (await import('./mock/system/apps.js')).Restart
}

export {
  Restart
}

export const {MysInfo, MysUser} = await import('@yunzaijs/mys/runtime')

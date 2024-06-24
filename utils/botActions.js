import {isV3, isV4, Restart} from '#guoba.adapter'

/**
 * 执行重启
 */
export function doRestart() {
  const e = {
    reply: (msg) => logger.info(msg),
    bot: {
      uin: 'stdin'
    },
    logFnc: '[Guoba]'
  }
  if (isV3) {
    return new Restart(e).restart()
  } else if (isV4) {
    const ins = new Restart(e)
    ins.e = e
    return ins.restart()
  } else {
    logger.error('[Guoba] doRestart 执行失败，原因是版本不兼容')
    return false
  }
}

/**
 * mock Restart
 */
export class Restart {
  constructor(e) {
    this.e = e
  }

  restart(e) {
    logger.warn('[Guoba] 由于没有安装 system 插件，所以无法使用重启功能，请手动进行重启')
  }
}

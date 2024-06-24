import lodash from "lodash";
import {Preload} from "#guoba.framework";
import {cfg, _version, Constant, _paths} from "#guoba.platform";
import {isV3, isV4, yunzaiVersion} from '#guoba.adapter'

// noinspection JSUnusedGlobalSymbols
export default class ConfigPreload extends Preload {
  constructor(app) {
    const preloadName = '_app.guoba.preload.js'
    const scriptSrc = `${_paths.server.realMountPrefix}/preload/${preloadName}`
    super(app, preloadName, scriptSrc);
    this.watchDynamicCfg()
  }

  getDynamicCfg() {
    return {
      serverICPNo: cfg.get('server.ICPNo')
    }
  }

  /** 监听 cfg 变化，并重新加载 */
  watchDynamicCfg() {
    this.dynamicCfg = this.getDynamicCfg()
    // 监听配置文件变化
    cfg.config.reader.watcher.on('change', () => {
      const current = this.getDynamicCfg()
      if (!lodash.isEqual(this.dynamicCfg, current)) {
        this.dynamicCfg = current;
        this.regenerate();
      }
    })
  }

  generateContent() {
    const content = [
      this.__YUNZAI_BOT_CONF__,
      this.__GUOBA_CONF__
    ]
    return `${content.join(';')}`;
  }

  get __YUNZAI_BOT_CONF__() {
    return `window["__YUNZAI_BOT_CONF__"] = ${JSON.stringify({
      VERSION: yunzaiVersion,
      GUOBA_VERSION: _version,
      API_PREFIX: (isV3 || isV4) ? '/v3' : '/v2',
      TOKEN_KEY: Constant.TOKEN_KEY,
    })}`
  }

  get __GUOBA_CONF__() {
    return `window["__GUOBA_CONF__"] = ${JSON.stringify({
      VERSION: _version,
      ICP_NO: this.dynamicCfg.serverICPNo,
    })}`
  }

}
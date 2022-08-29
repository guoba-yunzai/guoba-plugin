import {isV3, yunzaiVersion} from '../../utils/adapter.js'

const {_version} = await Guoba.GI('@/utils/common.js')
const Preload = await Guoba.GID('#/components/Preload.js')
const Constant = await Guoba.GID('#/constant/Constant.js')

export default class ConfigPreload extends Preload {
  constructor(app) {
    super(app, '_app.guoba.preload.js')
  }

  generateContent() {
    return `
      window["__YUNZAI_BOT_CONF__"] = {
        VERSION: "${yunzaiVersion}",
        GUOBA_VERSION: "${_version}",
        API_PREFIX: "${isV3 ? '/v3' : '/v2'}",
        TOKEN_KEY: "${Constant.TOKEN_KEY}",
      }
    `.replace(/[\s\r\n]+/g, '')
  }
}
import {Result} from '#guoba.framework'
import {ApiController} from '#guoba.platform'

import {Restart} from "../../../../other/restart.js"

/** Bot相关操作 */
export class BotController extends ApiController {

  constructor(guobaApp) {
    super('/bot', guobaApp)
  }

  registerRouters() {
    this.post('/restart', this.doRestart)
  }

  async doRestart() {
    const e = {
      reply: (msg) => logger.info(msg),
      bot: {
        uin: 'stdin'
      },
      logFnc: '[Guoba]'
    };
    await new Restart(e).restart()
    return Result.ok({}, '重启成功~')
  }

}

import {RestController, Result} from '#guoba.framework';
import {Restart} from "../../../../other/restart.js"

/** Bot相关操作 */
export class BotController extends RestController {

  constructor(app) {
    super('/bot', app)
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

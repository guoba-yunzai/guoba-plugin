import {Result} from '#guoba.framework'
import {ApiController} from '#guoba.platform'
import {BotActions} from '#guoba.utils'

/** Bot相关操作 */
export class BotController extends ApiController {

  constructor(guobaApp) {
    super('/bot', guobaApp)
  }

  registerRouters() {
    this.post('/restart', this.doRestart)
  }

  async doRestart() {
    await BotActions.doRestart()
    return Result.ok({}, '重启成功~')
  }

}

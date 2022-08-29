const IBotService = await Guoba.GID('#/service/interface/IBotService.js')
const MysInfo = await Guoba.GID('/plugins/genshin/model/mys/mysInfo.js')

export class BotService extends IBotService {
  constructor(app) {
    super(app)
  }

  async getUserCookies() {
    return await MysInfo.getBingCkUid()
  }
}
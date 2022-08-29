const Service = await Guoba.GID('#/components/Service.js')
const Constant = await Guoba.GID('#/constant/Constant.js')

export default class IBotService extends Service {
  constructor(app) {
    super(app)
  }

  /** 获取全部用户cookie */
  getUserCookies() {
    throw Constant.ERROR_501
  }

}
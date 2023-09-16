import {Result, Service} from '#guoba.framework';

export default class IBotService extends Service {
  constructor(app) {
    super(app)
  }

  /** 获取全部用户cookie */
  getUserCookies() {
    throw Result.ERR_CODE_501
  }

}
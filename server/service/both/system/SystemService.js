import {liteToken} from './model/tokens.js'

const {GI, GID} = Guoba.createImport(import.meta.url)
const Service = await GID('#/components/Service.js')
const {useMenus} = await GI('./model/menus.js')

export class SystemService extends Service {

  constructor(app) {
    super(app)
  }

  async queryMenus() {
    return useMenus()
  }

  getLiteToken() {
    return liteToken
  }

}
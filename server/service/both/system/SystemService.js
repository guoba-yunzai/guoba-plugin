const {GI, GID} = Guoba.createImport(import.meta.url)
const Service = await GID('#/components/Service.js')
const {menus} = await GI('./model/menus.js')

export class SystemService extends Service {

  constructor(app) {
    super(app)
  }

  async queryMenus() {
    return menus
  }
}
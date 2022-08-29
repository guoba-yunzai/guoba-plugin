const Service = await Guoba.GID('#/components/Service.js')

export class SystemService extends Service {

  menus = null

  constructor(app) {
    super(app)
  }

  async queryMenus() {
    if (!this.menus) {
      this.menus = (await import('./model/menus.js?' + Date.now())).menus
    }
    return this.menus
  }
}
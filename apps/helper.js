export class GuobaHelp extends plugin {

  constructor(e) {
    super({
      name: '锅巴帮助',
      dsc: '锅巴插件帮助',
      event: 'message',
      priority: 100,
      rule: [
        {
          reg: '^#锅巴(帮助|菜单|说明|功能|指令|命令|使用说明|help)$',
          fnc: 'getHelp',
        },
        {
          reg: '^#锅巴重启$',
          fnc: 'restart',
          permission: 'master',
        },
      ],
    })
  }

  async init() {
  }

  async getHelp() {
    await this.reply(`帮助暂时还没有哦`)
  }

  async restart() {
    if (Guoba && Guoba.reload) {
      await Guoba.reload()
      return this.e.reply('锅巴重启成功~')
    } else {
      return this.e.reply('奇怪，服务似乎并没有启动……')
    }
  }

}

export class GuobaUpdate extends plugin {

  constructor(e) {
    super({
      name: '锅巴更新',
      dsc: '锅巴更新、升级',
      event: 'message',
      priority: 100,
      rule: [
        {
          reg: '^#锅巴(更新|升级|update)$',
          fnc: 'doUpdate',
        },
      ],
    })
  }

  async doUpdate() {
    // 自动更新配置文件地址
    // https://gitee.com/guoba-yunzai/resources/raw/master/yaml/version.yaml
    await this.reply(`更新功能暂时还没有哦`)
  }

}

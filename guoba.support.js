import path from 'path'
import lodash from 'lodash'
import { _paths, cfg } from '#guoba.platform'

// 支持锅巴
export function supportGuoba () {
  return {
    // 插件信息，将会显示在前端页面
    // 如果你的插件没有在插件库里，那么需要填上补充信息
    // 如果存在的话，那么填不填就无所谓了，填了就以你的信息为准
    pluginInfo: {
      // name 为插件唯一标识，尽量不要与其他插件重复
      name: 'guoba-plugin',
      // title 为显示名称
      title: 'Guoba-Plugin',
      // 插件描述
      description: '主要提供后台管理界面',
      // 作者可以为字符串也可以为数组，当有多个作者时建议使用数组
      author: [
        '@zolay-poi',
        '@Guoba-Yunzai'
      ],
      // 作者主页地址。若author为数组，则authorLink也需要为数组，且需要与author一一对应
      authorLink: [
        'https://github.com/zolay-poi',
        'https://github.com/guoba-yunzai'
      ],
      // 仓库地址
      link: 'https://github.com/guoba-yunzai/guoba-plugin',
      isV3: true,
      isV2: false,
      // 是否显示在左侧菜单，可选值：auto、true、false
      // 当为 auto 时，如果配置项大于等于 3 个，则显示在左侧菜单
      showInMenu: 'auto',
      // 显示图标，此为个性化配置
      // 图标可在 https://icon-sets.iconify.design 这里进行搜索
      icon: 'mdi:stove',
      // 图标颜色，例：#FF0000 或 rgb(255, 0, 0)
      iconColor: '#d19f56',
      // 如果想要显示成图片，也可以填写图标路径（绝对路径）
      iconPath: path.join(_paths.pluginRoot, 'resources/images/icon.png')
    },
    // 配置项信息
    configInfo: {
      // 配置项 schemas
      schemas: [
        {
          label: '基础配置',
          // 第一个分组标记开始，无需标记结束
          component: 'SOFT_GROUP_BEGIN'
        },
        {
          field: 'base.loginInGroup',
          label: '允许群聊登录',
          bottomHelpMessage: '允许在群聊里使用`#锅巴登录`，有一定风险，酌情开启',
          // 【组件类型】，可参考
          // https://doc.vvbin.cn/components/introduction.html
          // https://3x.antdv.com/components/overview-cn/
          component: 'Switch'
        },
        {
          field: 'base.onlyCustomAddress',
          label: '仅发送自定义地址',
          bottomHelpMessage: '`#锅巴登录`仅发送自定义地址,不发送内网外网地址',
          component: 'Switch'
        },
        {
          field: 'base.githubReverseProxy',
          label: 'Github反代',
          bottomHelpMessage: '安装插件时是否使用Github反代',
          component: 'Switch'
        },
        {
          field: 'base.githubProxyUrl',
          label: 'Github反代地址',
          bottomHelpMessage: 'Github反代地址，例如：https://ghproxy.com',
          component: 'Input',
          componentProps: {
            placeholder: '请输入Github反代地址'
          }
        },
        // {
        //   field: 'base.city',
        //   label: '天气城市',
        //   helpMessage: '修改后需要刷新页面才能生效',
        //   bottomHelpMessage: '配置首页天气显示的城市',
        //   component: 'Input',
        //   required: true,
        //   componentProps: {
        //     placeholder: '请输入天气城市',
        //   },
        // },
        // {
        //   field: 'base.checkUpdate',
        //   label: '检查更新',
        //   helpMessage: '启动时和每天凌晨4点自动检查更新，并发送消息提醒（每个版本只提醒一次）',
        //   bottomHelpMessage: '是否自动检查更新，并发送消息提醒',
        //   component: 'Switch',
        // },
        {
          label: '服务器配置',
          // 第二个分组标记开始
          component: 'SOFT_GROUP_BEGIN'
        },
        {
          field: 'server.host',
          label: '服务器地址',
          bottomHelpMessage: 'auto 为自动获取本机IP地址，仅用于“#锅巴登录”和控制台中',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入服务器地址'
          }
        },
        {
          field: 'server.port',
          label: '监听端口号',
          helpMessage: '修改后需要重启才能生效',
          bottomHelpMessage: '如果不想要端口号，请输入 80',
          component: 'InputNumber',
          required: true,
          componentProps: {
            min: 1,
            max: 65535,
            placeholder: '请输入监听端口号'
          }
        },
        {
          field: 'server.splicePort',
          label: '拼接端口号',
          bottomHelpMessage: '是否需要在服务器地址后拼接端口号',
          component: 'Switch'
        },
        // {
        //   field: 'server.showAllIp',
        //   label: '显示所有IP',
        //   bottomHelpMessage: '当host为auto时，是否在使用"#锅巴登录"时显示所有IP地址',
        //   component: 'Switch',
        // },
        {
          field: 'server.ICPNo',
          label: 'ICP备案号',
          helpMessage: '如果要将网站放到公网上使用「域名」访问，则需要填写备案号，否则可能会面临被禁止访问的风险！',
          bottomHelpMessage: '填写你的域名ICP备案号，会显示在页面底部',
          component: 'Input',
          componentProps: {
            placeholder: '请输入ICP备案号',
            // 是否去除首尾空格，默认为 true，传 false 则保留首尾空格
            trimValue: false
          }
        }
      ],
      // 获取配置数据方法（用于前端填充显示数据）
      getConfigData () {
        let config = lodash.omit(cfg.merged, 'jwt')
        let host = lodash.get(config, 'server.host')
        if (Array.isArray(host)) {
          lodash.set(config, 'server.host', host[0])
        }
        return config
      },
      // 设置配置的方法（前端点确定后调用的方法）
      setConfigData (data, { Result }) {
        let config = {}
        for (let [keyPath, value] of Object.entries(data)) {
          // 特殊处理 server.host
          if (keyPath === 'server.host') {
            let host = cfg.get('server.host')
            if (Array.isArray(host)) {
              host[0] = value
              value = host
            }
          }
          lodash.set(config, keyPath, value)
        }
        config = lodash.merge({}, cfg.merged, config)
        cfg.config.reader.setData(config)
        return Result.ok({}, '保存成功~')
      }
    }
  }
}

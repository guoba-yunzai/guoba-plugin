import path from 'path'
import lodash from 'lodash'
import {_paths} from './utils/paths.js'
import cfg from './utils/cfg.js'

// 支持锅巴
export function supportGuoba() {
  return {
    // 插件信息，将会显示在前端页面
    // 如果你的插件没有在插件库里，那么需要填上补充信息
    // 如果存在的话，那么填不填就无所谓了，填了就以你的信息为准
    pluginInfo: {
      name: 'guoba-plugin',
      title: 'Guoba-Plugin',
      author: '@zolay-poi',
      authorLink: 'https://github.com/zolay-poi',
      link: 'https://github.com/guoba-yunzai/guoba-plugin',
      isV3: true,
      isV2: false,
      description: '主要提供后台管理界面',
      // 显示图标，此为个性化配置
      // 图标可在 https://icon-sets.iconify.design 这里进行搜索
      icon: 'mdi:stove',
      // 图标颜色，例：#FF0000 或 rgb(255, 0, 0)
      iconColor: '#d19f56',
      // 如果想要显示成图片，也可以填写图标路径（绝对路径）
      iconPath: path.join(_paths.pluginRoot, 'resources/images/icon.png'),
    },
    // 配置项信息
    configInfo: {
      // 配置项 schemas
      schemas: [
        {
          field: 'base.city',
          label: '天气城市',
          helpMessage: '修改后需要刷新页面才能生效',
          bottomHelpMessage: '配置首页天气显示的城市',
          // 组件类型，可参考 https://vvbin.cn/doc-next/components/introduction.html
          // https://antdv.com/components/overview-cn/
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入天气城市',
          },
        },
        {
          field: 'server.host',
          label: '服务器地址',
          bottomHelpMessage: 'auto 为自动获取本机IP地址，仅用于“#锅巴登录”和控制台中',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入服务器地址',
          },
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
            placeholder: '请输入监听端口号',
          },
        },
        {
          field: 'server.splicePort',
          label: '拼接端口号',
          bottomHelpMessage: '是否需要在服务器地址后拼接端口号',
          component: 'Switch',
        },
        // {
        //   field: 'server.showAllIp',
        //   label: '显示所有IP',
        //   bottomHelpMessage: '当host为auto时，是否在使用"#锅巴登录"时显示所有IP地址',
        //   component: 'Switch',
        // },
      ],
      // 获取配置数据方法（用于前端填充显示数据）
      getConfigData() {
        let config = lodash.omit(cfg.merged, 'jwt')
        let host = lodash.get(config, 'server.host')
        if (Array.isArray(host)) {
          lodash.set(config, 'server.host', host[0])
        }
        return config
      },
      // 设置配置的方法（前端点确定后调用的方法）
      setConfigData(data, {Result}) {
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
      },
    },
  }
}

// todo adapter
import loader from '../../../../../../../lib/plugins/loader.js'
import {hasGenshin, isTRSS} from '#guoba.adapter'

const CfgAdapter = await (() => {
  if (isTRSS) {
    return import('./useTRSSConfig.js')
  } else {
    return import('./useMiaoConfig.js')
  }
})()

const addGroupPromptProps = CfgAdapter['addGroupPromptProps']

// 基础配置
const baseConfig = {
  key: 'base',
  title: '基础配置',
  cards: [
    {
      key: 'system.bot',
      title: '机器人配置',
      desc: '对机器人进行相关配置',
      schemas: [
        {
          field: 'log_level',
          label: '日志等级',
          bottomHelpMessage: '日志输出等级。Mark时只显示执行命令，不显示聊天记录',
          component: 'Select',
          componentProps: {
            options: [
              {label: 'Trace', value: 'trace'},
              {label: 'Debug', value: 'debug'},
              {label: 'Info', value: 'info'},
              {label: 'Warn', value: 'warn'},
              {label: 'Fatal', value: 'fatal'},
              {label: 'Mark', value: 'mark'},
              {label: 'Error', value: 'error'},
              {label: 'Off', value: 'off'},
            ],
            placeholder: '请选择日志等级',
          },
        },
        ...(CfgAdapter['baseConfig'].bot ?? []),
        {
          field: 'online_msg_exp',
          label: '推送帮助冷却',
          bottomHelpMessage: '填上线推送通知的冷却时间',
          component: 'InputNumber',
          componentProps: {
            placeholder: '（分钟）',
          },
        },
        {
          field: 'chromium_path',
          label: 'chromium路径',
          bottomHelpMessage: 'chromium其他路径，默认无需填写，需要时可填写chromium的可执行文件绝对路径',
          component: 'Input',
          componentProps: {
            placeholder: '请输入chromium路径',
          },
        },
        {
          field: 'puppeteer_ws',
          label: 'puppeteer接口地址',
          bottomHelpMessage: 'puppeteer接口地址，默认无需填写',
          component: 'Input',
          componentProps: {
            placeholder: '请输入puppeteer接口地址',
          },
        },
        {
          field: 'puppeteer_timeout',
          label: 'puppeteer截图超时时间',
          bottomHelpMessage: 'puppeteer截图超时时间，默认无需填写',
          component: 'InputNumber',
          componentProps: {
            min: 0,
            placeholder: '（毫秒）',
          },
        },
        {
          field: 'proxyAddress',
          label: '代理地址',
          bottomHelpMessage: '米游社接口代理地址，国际服用',
          component: 'Input',
          componentProps: {
            placeholder: '请输入米游社代理地址',
          },
        },
      ],

    },
    ...(CfgAdapter['baseConfig'].server ?? []),
    {
      key: 'system.redis',
      title: 'Redis配置',
      desc: '对Redis服务器进行相关配置',
      schemas: [
        {
          field: 'host',
          label: 'Redis地址',
          required: true,
          component: 'Input',
          componentProps: {
            placeholder: '请输入Redis地址',
          },
        },
        {
          field: 'port',
          label: 'Redis端口',
          required: true,
          component: 'InputNumber',
          componentProps: {
            placeholder: '请输入Redis端口',
            min: 1,
            max: 65535,
          },
        },
        {
          field: 'username',
          label: 'Redis用户名',
          bottomHelpMessage: '没有用户名可以为空',
          component: 'Input',
          componentProps: {
            placeholder: '请输入Redis用户名',
          },
        },
        {
          field: 'password',
          label: 'Redis密码',
          bottomHelpMessage: '没有密码可以为空',
          component: 'InputPassword',
          componentProps: {
            placeholder: '请输入Redis密码',
          },
        },
        {
          field: 'db',
          label: 'Redis数据库',
          required: true,
          bottomHelpMessage: '一般不用改',
          component: 'InputNumber',
          componentProps: {
            placeholder: '请输入Redis数据库',
          },
        },
      ],
    },
  ],
}

const groupConfig = () => {
  const funOptions = []
  for (let item of loader.priority) {
    if (item.hasOwnProperty('name') && item.name) {
      if (!funOptions.find(i => i.value === item.name)) {
        funOptions.push({value: item.name})
      }
    }
  }
  const funComponent = funOptions.length === 0 ? 'GTags' : 'Select'
  return {
    key: 'group',
    title: '群组配置',
    cards: [
      {
        key: 'system.group',
        type: 'keyFormCard',
        // 标题表达式
        title: `{{ form.key === 'default' ? '默认配置' : '群：' + (form?.values?.__GROUP_TIP_TEXT__ ?? form.key) }}`,
        desc: '默认配置对所有群聊生效',
        // 允许添加新的配置
        allowAdd: true,
        allowDel: true,
        // 新增按钮文本（默认“新增”）
        addBtnText: '新增群配置',
        promptProps: addGroupPromptProps,
        schemas: [
          ...(CfgAdapter['groupConfig'].group ?? []),
          {
            field: 'addPrivate',
            label: '私聊添加',
            component: 'Switch',
            bottomHelpMessage: '是否允许私聊添加',
            componentProps: {
              checkedValue: 1,
              unCheckedValue: 0,
            },
          },
          {
            field: 'enable',
            label: '功能白名单',
            component: funComponent,
            bottomHelpMessage: '配置后只有配置的功能才可以使用',
            componentProps: {
              allowAdd: true,
              allowDel: true,
              mode: 'multiple',
              options: funOptions,
            },
          },
          {
            field: 'disable',
            label: '功能黑名单',
            component: funComponent,
            bottomHelpMessage: '配置后配置的功能将不可以使用',
            componentProps: {
              allowAdd: true,
              allowDel: true,
              mode: 'multiple',
              options: funOptions,
            },
          },
        ],
      },
    ],
  }
}

const genshinConfig = {
  key: 'genshin',
  title: '原神配置',
  cards: [
    {
      key: 'genshin.mys.set',
      title: '米游社设置',
      desc: '',
      schemas: [
        {
          field: 'allowUseCookie',
          label: '使用用户ck',
          component: 'Switch',
          bottomHelpMessage: '公共查询是否使用用户ck',
          componentProps: {
            checkedValue: 1,
            unCheckedValue: 0,
          },
        },
        {
          field: 'cookieDoc',
          label: 'ck文档地址',
          component: 'Input',
          bottomHelpMessage: '默认cookie帮助文档链接地址',
          componentProps: {},
        },
        {
          field: 'isAutoSign',
          label: '开启自动签到',
          component: 'Switch',
          bottomHelpMessage: '是否开启米游社原神自动签到',
          componentProps: {
            checkedValue: 1,
            unCheckedValue: 0,
          },
        },
        {
          field: 'signTime',
          label: '签到定时任务',
          component: 'EasyCron',
          bottomHelpMessage: '米游社原神签到定时任务，Cron表达式，默认00:02开始执行，每10s签到一个',
          componentProps: {
            placeholder: '请输入或选择Cron表达式',
          },
        },
        {
          field: 'abbrSetAuth',
          label: '别名权限',
          component: 'RadioGroup',
          bottomHelpMessage: '别名设置权限',
          componentProps: {
            options: [
              {label: '所有群员都可以添加', value: 0},
              {label: '群主和管理员才能添加', value: 1},
              {label: '只有主人才能添加', value: 2},
            ],
          },
        },
      ],
    },
    {
      key: 'genshin.mys.pubCk',
      title: '公共Cookie',
      desc: '米游社公共查询cookie，允许添加多个',
      // 数组form
      type: 'arrayFormCard',
      allowAdd: true,
      allowDel: true,
      addBtnText: '添加Cookie',
      lengthMin: 1,
      schemas: [],
    },
    {
      key: 'genshin.gacha',
      title: `十连配置（{{form.key === 'default' ? '默认' : form.key}}）`,
      desc: '十连次数、概率等相关配置',
      type: 'keyFormCard',
      allowAdd: true,
      allowDel: true,
      addBtnText: '新增群单独配置',
      promptProps: addGroupPromptProps,
      schemas: [
        {
          field: 'count',
          label: '每日抽卡数',
          bottomHelpMessage: '设置每天可以抽多少次',
          component: 'InputNumber',
          componentProps: {
            min: 1,
            placeholder: '请输入每日抽卡数',
          },
        },
        {
          field: 'delMsg',
          label: '自动撤回',
          bottomHelpMessage: '自动撤回未出货的抽卡消息，0-120 秒，0 = 不撤回',
          component: 'InputNumber',
          componentProps: {
            placeholder: '请输入自动撤回时间',
          },
        },
        {
          field: 'LimitSeparate',
          label: '分开计算',
          bottomHelpMessage: '角色池、武器池限制次数是否分开计算',
          component: 'Switch',
          componentProps: {
            checkedValue: 1,
            unCheckedValue: 0,
          },
        },
      ],
    },
  ],
}

const otherConfig = {
  key: 'other',
  title: '其他',
  cards: [
    {
      key: 'system.other',
      title: '其他配置',
      desc: '其他配置',
      schemas: [
        ...(CfgAdapter['otherConfig'].other ?? []),
        {
          field: 'blackGroup',
          label: '黑名单群',
          bottomHelpMessage: '黑名单群，可以设置多个',
          component: 'GSelectGroup',
          componentProps: {
            placeholder: '请选择黑名单群',
          },
        },
        {
          field: 'whiteGroup',
          label: '白名单群',
          bottomHelpMessage: '白名单群，可以设置多个',
          component: 'GSelectGroup',
          componentProps: {
            placeholder: '请选择白名单群',
          },
        },
        {
          field: 'autoFriend',
          label: '添加好友',
          bottomHelpMessage: '是否自动同意添加好友请求',
          component: 'Switch',
          componentProps: {
            checkedValue: 1,
            unCheckedValue: 0,
          },
        },
        {
          field: 'autoQuit',
          label: '退群人数',
          bottomHelpMessage: '被好友拉进群时，群人数小于配置值自动退出，设为0表示不处理',
          component: 'InputNumber',
          componentProps: {
            placeholder: '请输入退群人数',
            min: 0,
          },
        },
        {
          field: 'disablePrivate',
          label: '禁用私聊',
          bottomHelpMessage: '禁用后私聊只接受ck以及抽卡链接（Bot主人不受限制）',
          component: 'Switch',
        },
        {
          field: 'disableMsg',
          label: '禁私聊提示',
          bottomHelpMessage: '禁用私聊时Bot的提示内容',
          component: 'Input',
          componentProps: {
            placeholder: '请输入禁用提示',
          },
        },
        {
          field: 'disableAdopt',
          label: '私聊通行字符串',
          bottomHelpMessage: '禁用私聊后，允许响应的字符串',
          component: 'GTags',
          componentProps: {
            allowAdd: true,
            allowDel: true,
          },
        },
      ],
    },
  ],
}

export function getConfigTabs() {
  let tabs = []
  tabs.push(baseConfig)
  tabs.push(groupConfig())
  if (hasGenshin) {
    tabs.push(genshinConfig)
  }
  tabs.push(otherConfig)
  return tabs
}

export const configFile = {
  'system.bot': '/config/config/bot.yaml',
  'system.qq': '/config/config/qq.yaml',
  'system.group': '/config/config/group.yaml',
  'system.redis': '/config/config/redis.yaml',
  'system.other': '/config/config/other.yaml',
  'system.server': '/config/config/server.yaml',

  'genshin.gacha': '/plugins/genshin/config/gacha.set.yaml',
  'genshin.mys.pubCk': '/plugins/genshin/config/mys.pubCk.yaml',
  'genshin.mys.set': '/plugins/genshin/config/mys.set.yaml',
  'genshin.role.name': '/plugins/genshin/config/role.name.yaml',
}

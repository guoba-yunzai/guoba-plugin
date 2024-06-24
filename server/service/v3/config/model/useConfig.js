// todo adapter
import loader from '../../../../../../../lib/plugins/loader.js'
import {hasGenshin, isTRSS} from '#guoba.adapter'

// 添加群号 prompt
const addGroupPromptProps = {
  content: '请输入群号：',
  placeholder: '请输入群号',
  okText: '添加',
  rules: [
    {required: true, message: '群号得填上才行哦~'},
    ...(isTRSS ? [] : [{min: 5, message: '真的有这么短的群号吗？'}]),
  ],
}
// 添加账号 prompt
const addUserPromptProps = isTRSS ? i => ({
  content: `请输入${i}账号：`,
  placeholder: '请输入账号',
  okText: '添加',
  rules: [
    {required: true, message: '账号得填上才行哦~'},
  ],
}) : i => ({
  content: `请输入${i}QQ号：`,
  placeholder: '请输入QQ号',
  okText: '添加',
  rules: [
    {required: true, message: 'QQ号得填上才行哦~'},
    {min: 5, message: '真的有这么短的QQ号吗？'},
  ],
})

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
        }, ...(isTRSS ? [
        {
          field: 'log_length',
          label: '单条日志长度',
          component: 'InputNumber',
          componentProps: {
            min: 0,
            placeholder: '请输入单条日志长度',
          },
        },
        {
          field: 'log_object',
          label: '对象日志格式',
          bottomHelpMessage: '是否显示详细对象日志',
          component: 'Switch',
        },
        {
          field: 'url',
          label: '服务器地址',
          component: 'Input',
          componentProps: {
            placeholder: '请输入服务器地址',
          },
        },
        {
          field: 'port',
          label: '服务器端口',
          component: 'InputNumber',
          componentProps: {
            placeholder: '0-65535',
            min: 0,
            max: 65535,
          },
        },
        {
          field: 'update_time',
          label: '自动更新时间',
          bottomHelpMessage: '启动超过指定时间后更新',
          component: 'InputNumber',
          componentProps: {
            min: 0,
            placeholder: '（分钟）',
          },
        },
        {
          field: 'restart_time',
          label: '自动重启时间',
          bottomHelpMessage: '启动超过指定时间后重启',
          component: 'InputNumber',
          componentProps: {
            min: 0,
            placeholder: '（分钟）',
          },
        },
        {
          field: 'update_cron',
          label: '定时更新cron',
          bottomHelpMessage: '在指定的时间更新',
          component: 'EasyCron',
          componentProps: {
            multiple: true,
            placeholder: '请输入或选择Cron表达式',
          },
        },
        {
          field: 'restart_cron',
          label: '定时重启cron',
          bottomHelpMessage: '在指定的时间重启',
          component: 'EasyCron',
          componentProps: {
            multiple: true,
            placeholder: '请输入或选择Cron表达式',
          },
        },
        {
          field: 'stop_cron',
          label: '定时关机cron',
          bottomHelpMessage: '在指定的时间关机',
          component: 'EasyCron',
          componentProps: {
            multiple: true,
            placeholder: '请输入或选择Cron表达式',
          },
        },
        {
          field: 'start_cron',
          label: '定时开机cron',
          bottomHelpMessage: '在指定的时间开机',
          component: 'EasyCron',
          componentProps: {
            multiple: true,
            placeholder: '请输入或选择Cron表达式',
          },
        },
        {
          field: 'file_to_url_time',
          label: '文件保存时间',
          component: 'InputNumber',
          componentProps: {
            min: 1,
            placeholder: '（分钟）',
          },
        },
        {
          field: 'file_to_url_times',
          label: '文件访问次数',
          component: 'InputNumber',
          componentProps: {
            min: 1,
          },
        },
        {
          field: 'msg_type_count',
          label: '消息类型统计',
          bottomHelpMessage: '收发消息记录详细类型统计',
          component: 'Switch',
        },
        {
          field: '/→#',
          label: '/→#',
          bottomHelpMessage: '收到的消息以/开头转为#处理',
          component: 'Switch',
        }] : [
        {
          field: 'ignore_self',
          label: '过滤自己',
          bottomHelpMessage: '群聊和频道中是否过滤自己的消息',
          component: 'Switch',
        },
        {
          field: 'resend',
          label: '分片发送',
          bottomHelpMessage: '被风控时是否尝试使用分片发送',
          component: 'Switch',
        },
        {
          field: 'ffmpeg_path',
          label: 'ffmpeg路径',
          bottomHelpMessage: '填写ffmpeg的可执行文件路径，一般用于音频处理（发送语音）',
          component: 'Input',
          componentProps: {
            placeholder: '请输入ffmpeg路径',
          },
        },
        {
          field: 'ffprobe_path',
          label: 'ffprobe路径',
          bottomHelpMessage: 'ffprobe可以从媒体流收集媒体信息，并打印出开发人员可以读的格式',
          component: 'Input',
          componentProps: {
            placeholder: '请输入ffprobe路径',
          },
        },
        {
          field: 'online_msg',
          label: '推送帮助',
          bottomHelpMessage: '被上线时给首个主人QQ推送帮助',
          component: 'Switch',
        },
        {
          field: 'skip_login',
          label: '跳过登录ICQQ',
          bottomHelpMessage: '是否跳过登录ICQQ',
          component: 'Switch',
        },
        {
          field: 'sign_api_addr',
          label: '签名API地址',
          bottomHelpMessage: '签名API地址(如:http://127.0.0.1:8080/sign?key=114514)',
          component: 'Input',
          componentProps: {
            placeholder: '请输入如:http://127.0.0.1:8080/sign?key=114514',
          },
        },
        {
          field: 'ver',
          label: '传入QQ版本',
          bottomHelpMessage: '传入的QQ版本(如:8.9.63、8.9.68)',
          component: 'Input',
          componentProps: {
            placeholder: '请输入传入的QQ版本(如:8.9.63、8.9.68)',
          },
        }]),
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
        title: `{{form.key === 'default' ? '默认配置' : '群：' + form.key}}`,
        desc: '默认配置对所有群聊生效',
        // 允许添加新的配置
        allowAdd: true,
        allowDel: true,
        // 新增按钮文本（默认“新增”）
        addBtnText: '新增群配置',
        promptProps: addGroupPromptProps,
        schemas: [
          {
            field: isTRSS ? 'groupCD' : 'groupGlobalCD',
            label: '整体冷却时间',
            component: 'InputNumber',
            bottomHelpMessage: '群聊中所有指令操作冷却时间，单位毫秒,0 则无限制',
            componentProps: {
              placeholder: '请输入指令冷却时间',
            },
          },
          {
            field: 'singleCD',
            label: '个人冷却时间',
            component: 'InputNumber',
            bottomHelpMessage: '群聊中个人操作冷却时间，单位毫秒',
            componentProps: {
              placeholder: '请输入指令冷却时间',
            },
          },
          {
            field: 'onlyReplyAt',
            label: '只关注At',
            component: 'RadioGroup',
            bottomHelpMessage: '是否只仅关注主动@机器人的消息',
            componentProps: {
              options: [
                { label: '关闭', value: 0 },
                { label: '开启', value: 1 },
                { label: '开启、主人关闭', value: 2 },
              ],
            },
          },
          {
            field: 'botAlias',
            label: '机器人别名',
            component: 'GTags',
            bottomHelpMessage: '开启“只关注At”后，发送以别名开头的消息也会响应，支持多个别名',
            componentProps: {
              allowAdd: true,
              allowDel: true,
            },
          }, ...(isTRSS ? [
          {
            field: 'addLimit',
            label: '添加消息权限',
            component: 'RadioGroup',
            bottomHelpMessage: '添加消息是否限制权限',
            componentProps: {
              options: [
                {label: '所有群员都可以添加', value: 0},
                {label: '群主和管理员才能添加', value: 1},
                {label: '只有主人才能添加', value: 2},
              ],
            },
          },
          {
            field: 'addReply',
            label: '回复消息',
            component: 'Switch',
            bottomHelpMessage: '是否回复触发消息',
            componentProps: {
              checkedValue: 1,
              unCheckedValue: 0,
            },
          },
          {
            field: 'addAt',
            label: '提及用户',
            component: 'Switch',
            bottomHelpMessage: '是否提及触发用户',
            componentProps: {
              checkedValue: 1,
              unCheckedValue: 0,
            },
          },
          {
            field: 'addRecall',
            label: '撤回消息',
            bottomHelpMessage: '是否撤回回复消息',
            component: 'InputNumber',
            componentProps: {
              min: 0,
              placeholder: '请输入撤回消息时间（秒）',
            },
          }] : [
          {
            field: 'imgAddLimit',
            label: '添加表情权限',
            component: 'RadioGroup',
            bottomHelpMessage: '添加表情是否限制权限',
            componentProps: {
              options: [
                {label: '所有群员都可以添加', value: 0},
                {label: '群主和管理员才能添加', value: 1},
                {label: '只有主人才能添加', value: 2},
              ],
            },
          },
          {
            field: 'imgMaxSize',
            label: '添加表情大小限制',
            component: 'InputNumber',
            bottomHelpMessage: '添加表情图片大小限制，单位：MB',
            componentProps: {
              placeholder: '请输入添加表情图片大小限制',
            },
          }]),
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
        ...(isTRSS ? [
        {
          field: 'master',
          label: '主人账号',
          bottomHelpMessage: '主人账号，功能不受限制，可以设置多个',
          component: 'GTags',
          componentProps: {
            placeholder: '请输入Bot账号:主人账号',
            allowAdd: true,
            allowDel: true,
            showPrompt: true,
            promptProps: addUserPromptProps('Bot账号:主人'),
          },
        },
        {
          field: 'blackUser',
          label: '黑名单用户',
          bottomHelpMessage: '黑名单用户，可以设置多个，用英文逗号分隔',
          component: 'GTags',
          componentProps: {
            placeholder: '请输入黑名单用户',
            allowAdd: true,
            allowDel: true,
            showPrompt: true,
            promptProps: addUserPromptProps('黑名单'),
          },
        },
        {
          field: 'whiteUser',
          label: '白名单用户',
          bottomHelpMessage: '白名单用户，可以设置多个，用英文逗号分隔',
          component: 'GTags',
          componentProps: {
            placeholder: '请输入白名单用户',
            allowAdd: true,
            allowDel: true,
            showPrompt: true,
            promptProps: addUserPromptProps('白名单'),
          },
        }] : [
        {
          field: 'masterQQ',
          label: '主人QQ',
          bottomHelpMessage: '主人QQ号，功能不受限制，可以设置多个',
          component: 'GSelectFriend',
          componentProps: {
            placeholder: '请选择主人QQ号',
          },
        },
        {
          field: 'blackQQ',
          label: '黑名单QQ',
          bottomHelpMessage: '黑名单QQ，可以设置多个，用英文逗号分隔',
          component: 'GTags',
          componentProps: {
            placeholder: '请输入黑名单QQ',
            allowAdd: true,
            allowDel: true,
            showPrompt: true,
            promptProps: addUserPromptProps('黑名单'),
            valueFormatter: ((value) => Number.parseInt(value)).toString(),
          },
        },
        {
          field: 'whiteQQ',
          label: '白名单QQ',
          bottomHelpMessage: '白名单QQ，可以设置多个，用英文逗号分隔',
          component: 'GTags',
          componentProps: {
            placeholder: '请输入白名单QQ',
            allowAdd: true,
            allowDel: true,
            showPrompt: true,
            promptProps: addUserPromptProps('白名单'),
            valueFormatter: ((value) => Number.parseInt(value)).toString(),
          },
        }]),
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

  'genshin.gacha': '/plugins/genshin/config/gacha.set.yaml',
  'genshin.mys.pubCk': '/plugins/genshin/config/mys.pubCk.yaml',
  'genshin.mys.set': '/plugins/genshin/config/mys.set.yaml',
  'genshin.role.name': '/plugins/genshin/config/role.name.yaml',
}

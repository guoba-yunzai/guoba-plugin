// 添加群号 prompt
export const addGroupPromptProps = {
  content: '请输入群号：',
  placeholder: '请输入群号',
  okText: '添加',
  rules: [
    {required: true, message: '群号得填上才行哦~'},
    [{min: 5, message: '真的有这么短的群号吗？'}],
  ],
}

// 添加账号 prompt
export const addUserPromptProps = tip => ({
  content: `请输入${tip}QQ号：`,
  placeholder: '请输入QQ号',
  okText: '添加',
  rules: [
    {required: true, message: 'QQ号得填上才行哦~'},
    {min: 5, message: '真的有这么短的QQ号吗？'},
  ],
})

export const baseConfig = {
  bot: [
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
    }
  ],
  server: [],
}

export const groupConfig = {
  group: [
    {
      field: 'groupGlobalCD',
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
          {label: '关闭', value: 0},
          {label: '开启', value: 1},
          {label: '开启、主人关闭', value: 2},
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
    },
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
    }
  ]
}

export const otherConfig = {
  other: [

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
    }
  ],
}

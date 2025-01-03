import {YamlReader} from "#guoba.framework"

export function handleConfigData(action, key, field, value) {

  // 特殊处理 auth
  if (key === 'system.server' && field === 'auth') {
    let handleRes = handleAuth(action, field, value)
    field = handleRes.field
    value = handleRes.value
  }

  return {field, value};
}

function handleAuth(action, field, value) {
  if (action === 'get') {
    if (!value) {
      return {field, value: []}
    }
    if (value instanceof Object) {
      return {
        field,
        value: Object.entries(value).map(([key, val]) => {
          return {
            key,
            value: val
          }
        })
      }
    }
    return {field, value: []}
  } else {
    // 强制覆盖旧数据
    field = YamlReader.CONFIG_FORCE_OVERLAY_KEY + field
    if (!value) {
      return {field, value: null}
    }
    if (Array.isArray(value) && value.length > 0) {
      return {
        field,
        value: value.reduce((acc, cur) => {
          acc[cur.key] = cur.value
          return acc
        }, {})
      }
    }
    return {field, value: null}
  }
}

/**
 * 处理 group 配置
 */
export function handleGroupConfig(action, data) {
  for (const key of Object.keys(data)) {
    if (action === 'get') {
      // 判断是否带 :
      let groupId = key
      let keySplit = []
      if (typeof groupId === 'string') {
        if (groupId.includes(':')) {
          keySplit = groupId.split(':')
          groupId = keySplit.pop()
        }
        if (groupId.startsWith(YamlReader.CONFIG_INTEGER_KEY)) {
          groupId = groupId.replace(YamlReader.CONFIG_INTEGER_KEY, '')
        }
      }
      if (!groupId) {
        continue
      }
      if (groupId === 'default') {
        continue
      }
      groupId = Number(groupId) || String(groupId)
      const groupName = Bot.pickGroup(groupId)?.group_name
      if (!groupName) {
        continue
      }
      data[key]['__GROUP_TIP_TEXT__'] = `${groupName} (${[...keySplit, groupId].join(':')})`
    } else {
      delete data[key]['__GROUP_TIP_TEXT__']
    }
  }
  return data
}

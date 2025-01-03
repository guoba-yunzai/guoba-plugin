export function handleConfigData(action, key, field, value) {
  return {field, value};
}

/**
 * 处理 group 配置
 */
export function handleGroupConfig(action, data) {
  for (const key of Object.keys(data)) {
    if (action === 'get') {
      // 判断是否带 :
      let groupId = key
      if (groupId === 'default') {
        continue
      }
      groupId = Number(groupId) || String(groupId)
      const groupName = Bot.pickGroup(groupId)?.info?.group_name
      if (!groupName) {
        continue
      }
      data[key]['__GROUP_TIP_TEXT__'] = `${groupName} (${key})`
    } else {
      delete data[key]['__GROUP_TIP_TEXT__']
    }
  }
  return data
}

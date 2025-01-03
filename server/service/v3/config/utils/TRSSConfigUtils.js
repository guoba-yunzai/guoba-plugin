import YamlReader from '../../../../../framework/src/components/YamlReader.js'

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

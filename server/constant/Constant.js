/**
 * @typedef GuobaConstant 一些公用常量
 * @property {string} TOKEN_KEY header中传递的TokenKey
 * @property {string} ERROR_501 尚未实现错误码
 * @property {string} REDIS_PREFIX redis前缀
 * @property {string} CONFIG_INTEGER_KEY 配置文件数字key
 * @property {symbol} VOID 空值
 */
export default {
  // header中传递的TokenKey
  TOKEN_KEY: 'guoba-access-token',

  // 尚未实现错误码
  ERROR_501: 'GUOBA_501',

  // redis前缀
  REDIS_PREFIX: 'Yz:Guoba:',

  // 配置文件数字key
  CONFIG_INTEGER_KEY: 'INTEGER__',

  VOID: Symbol(),
}

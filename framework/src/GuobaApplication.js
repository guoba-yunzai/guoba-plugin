import express from 'express'
import {useHelper} from './loader/loadHelper.js'
import {usePreload} from './loader/loadPreload.js'
import {useDecorator} from "./loader/loadDecorator.js";
import {useComponents} from './loader/loadComponents.js'

/**
 * @typedef PreloadType
 * @property {Function} hook 预加载html钩子
 * @property {String} path 预加载文件路径
 * @property {String} code 预加载代码
 * @property {String} staticPath 静态资源路径
 */

/**
 * @typedef DecoratorType
 * @property {String} path 装饰器路径
 * @property {*[]} args 参数
 */

/**
 * @typedef GuobaAppArgs
 * @property {Express} app
 * @property {http.Server} server
 * @property {string} prefix 路由前缀
 * @property {Boolean} hotReload TODO 是否热加载
 * @property {Number} port 服务端口
 *
 * @property {Function} created 生命周期函数：应用创建完成回调
 * @property {Function} mounted 生命周期函数：应用挂载完成回调
 *
 * @property {String} basePath 项目根路径
 * @property {String} staticPath 静态资源路径
 * @property {String[]} componentPaths 组件路径 - 包括 controller、service等
 * @property {PreloadType[]} preloads 预加载配置
 * @property {DecoratorType[]} decorators 全局预设装饰器
 * @property {Object<String, Function>} overrides 重新默认逻辑
 *
 */

/**
 * Guoba Application
 * @class GuobaApplication
 */
export default class GuobaApplication {

  /** @type GuobaAppArgs */
  _args
  /** @type Express */
  app
  /** @type http.Server */
  server

  globalDecorators = []

  /**
   * 启动应用
   * @param {GuobaAppArgs} args 应用配置
   * @returns {GuobaApplication}
   */
  static async run(args) {
    const app = args?.app ? args.app : express()
    const server = args?.server ? args.server : await getListenFn(args)(app, args.port);
    const guobaApp = new GuobaApplication(args, app, server);

    if (typeof args.created === 'function') {
      args.created(guobaApp)
    }

    // 预加载
    await usePreload(guobaApp);
    // 辅助工具
    useHelper(guobaApp);
    // 预装饰器配置
    await useDecorator(guobaApp);
    // 加载全部组件
    await useComponents(guobaApp);

    if (typeof args.mounted === 'function') {
      args.mounted(guobaApp)
    }

    return guobaApp
  }

  /**
   * 启动应用
   *
   * @param {GuobaAppArgs} args 应用配置
   * @param app express创建的app
   * @param server app创建监听之后的server
   * @returns {GuobaApplication}
   */
  constructor(args, app, server) {
    this._args = args;
    this.app = app
    this.server = server
  }

}

/**
 * 获取实际的监听函数
 * @param args
 * @return {function(*, *): Promise<http.Server>}
 */
function getListenFn(args) {
  const listen = args?.overrides?.listen;
  if (typeof listen === "function") {
    return listen
  }
  return defaultListen
}

/** 默认的监听函数 */
function defaultListen(app, port) {
  return app.listen(port)
}

import express from 'express'
import {useHelper} from './loader/loadHelper.js'
import {usePreload} from './loader/loadPreload.js'
import {useDecorator} from "./loader/loadDecorator.js";
import {useComponents} from './loader/loadComponents.js'

/**
 * @typedef PreloadType
 * @property {Function} hook 预加载文件路径
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
 * @property {Boolean} hotReload TODO 是否热加载
 * @property {Number} port 服务端口
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

  /**
   * 启动应用
   * @param {GuobaAppArgs} args 应用配置
   * @returns {GuobaApplication}
   */
  static async run(args) {
    const app = express()
    const server = await getListenFn(args)(app, args.port);
    const application = new GuobaApplication(args, app, server);

    // 预加载
    await usePreload(app, args);
    // 辅助工具
    useHelper(app, args.staticPath);
    // 预装饰器配置
    app.globalDecorators = await useDecorator(app, args);
    // 加载全部组件
    await useComponents(app, args);

    return application
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

/** 获取实际的监听函数 */
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

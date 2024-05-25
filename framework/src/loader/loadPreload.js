import fs from "fs";
import path from 'path'
import chalk from 'chalk'
import {Preload} from "../../index.js";
import {loadClass} from "../utils/common.js";

/**
 * 依次创建页面预加载
 * @param {GuobaApplication} guobaApp
 */
export async function usePreload(guobaApp) {
  const {_args: {preloads}} = guobaApp
  for (const item of preloads) {
    await hookAppPreloads(guobaApp, item)
  }
}

/**
 * @param {GuobaApplication} guobaApp
 * @param {PreloadType} preload
 */
async function hookAppPreloads(guobaApp, preload) {
  const importItem = await loadClass(preload.path, Preload, true);
  if (importItem == null) {
    return
  }
  let instance = null
  try {
    // noinspection JSValidateTypes
    instance = new importItem(guobaApp)
  } catch (e) {
    logger.error(`[Guoba] load preload error: ${chalk.red(path.basename(preload.path))}`, e)
    return
  }
  const reg = new RegExp('<!--#GUO\\{' + preload.code + '}BA#-->');
  guobaApp.app.use(async (req, res, next) => {
    const flag = await preload.hook(req)
    if (flag) {
      // 替换tag
      const tag = instance.createScriptTag()
      const content = fs.readFileSync(preload.staticPath, 'utf8').replace(reg, tag)
      res.send(content)
    } else if (req.path === instance.scriptSrc) {
      const content = await instance.getPreloadContent()
      res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
      res.send(content)
    } else {
      next();
    }
  })
}

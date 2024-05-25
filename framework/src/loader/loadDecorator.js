import path from "path";
import chalk from "chalk";
import Decorator from "../core/Decorator.js";
import {loadClass} from "../utils/common.js";

/**
 * 加载全局装饰器
 * @param {GuobaApplication} guobaApp
 * @return {Promise<*[]>}
 */
export async function useDecorator(guobaApp) {
  const {_args: {decorators}} = guobaApp
  if (!Array.isArray(decorators) || decorators.length === 0) {
    return []
  }
  const instances = []
  for (const item of decorators) {
    const importItem = await loadClass(item.path, Decorator, true);
    if (importItem == null) {
      continue;
    }
    try {
      instances.push(new importItem(...(item.args ?? [])));
    } catch (e) {
      logger.error(`[Guoba] load decorator error: ${chalk.red(path.basename(item.path))}`, e)
    }
  }
  guobaApp.globalDecorators = instances
  return instances
}
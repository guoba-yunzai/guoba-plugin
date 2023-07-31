import path from "path";
import chalk from "chalk";
import {Decorator} from "#guoba.framework";
import {loadClass} from "#guoba.framework.utils";

/**
 * 加载全局装饰器
 * @param app
 * @param {GuobaAppArgs} args
 * @return {Promise<*[]>}
 */
export async function useDecorator(app, args) {
  const {decorators} = args
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
  return instances;
}
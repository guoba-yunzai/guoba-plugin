import fs from "fs";
import path from 'path'
import lodash from 'lodash'
import {Preload, instancesMap} from "#guoba.framework";

const {_paths, loadClasses} = await Guoba.GI('@/utils/common.js')

const preloadPath = path.join(_paths.pluginRoot, 'server/preload')
export const preloads = await loadClasses(preloadPath, Preload, {})

const preloadKeys = []

/**
 * 依次创建页面预加载
 */
export function usePreload(app) {
  hookAppPreloads(app)
  let entries = Object.entries(preloads).sort((a, b) => a[1].priority - b[1].priority)
  for (const [name, PreloadItem] of entries) {
    const mapKey = lodash.camelCase(name)
    instancesMap.set(mapKey, new PreloadItem(app))
    preloadKeys.push(mapKey)
  }
}

function hookAppPreloads(app) {
  app.use(async (req, res, next) => {
    if (req.path === '/' || req.path === '/index.html') {
      await hookIndex(req, res, next)
    } else {
      next()
    }
  })
}

async function hookIndex(req, res, next) {
  const indexPath = path.join(_paths.pluginRoot, 'server/static/index.html')
  if (preloadKeys.length === 0) {
    res.sendFile(indexPath)
    return
  }
  const dirPath = path.join(_paths.pluginRoot, 'server/static/preload')
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }
  // 获取所有预加载脚本
  const preloadScripts = []
  for (const preloadKey of preloadKeys) {
    const instance = instancesMap.get(preloadKey)
    if (instance) {
      // TODO 后续可以改成hook的方式，不用每次都写入文件
      const tag = await instance.writeScript(dirPath);
      if (tag) {
        preloadScripts.push(tag)
      }
    }
  }
  // 替换 <!--#GUO{PRELOAD_JS}BA#-->
  let content = fs.readFileSync(indexPath, 'utf8');
  content = content.replace(/<!--#GUO\{PRELOAD_JS}BA#-->/, preloadScripts.join(''))
  res.send(content)
}

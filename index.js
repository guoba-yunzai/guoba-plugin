if (!global.segment) {
  global.segment = (await import("oicq")).segment
}
import {isV3} from './utils/adapter.js'
import {checkPackage} from './utils/adapter/check.js'
import {createImport, GI, GID} from './utils/guobaImport.js'

let passed = await checkPackage()

if (!passed) {
  throw 'Missing necessary dependencies'
}

global.Guoba = {GI, GID, createImport}

const apps = {}, rule = {}

let appRouter = null

if (isV3) {
  await (await import('./utils/adapter/initV3.js')).init(apps)
} else {
  appRouter = await (await import('./utils/adapter/initV2.js')).init(rule)
}

export {apps, rule, appRouter}

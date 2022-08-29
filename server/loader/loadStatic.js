import path from 'path'
import express from 'express'

const {_paths} = await Guoba.GI('@/utils/common.js')

/**
 * 注入静态资源
 */
export function useStatic(app) {
  let staticPath = path.join(_paths.pluginRoot, 'server/static')
  app.set('views', staticPath)
  app.use(express.static(staticPath))
}

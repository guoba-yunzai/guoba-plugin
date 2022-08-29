import fs from 'fs'
import path from 'path'

const {_paths} = await Guoba.GI('@/utils/common.js')

/**
 * preload
 */
export default class Preload {
  constructor(app, preloadName) {
    this.app = app
    this.preloadName = preloadName
    this.preloadPath = path.join(_paths.pluginRoot, 'server/static', this.preloadName)
    this.preloadContent = this.generateContent()
    fs.writeFileSync(this.preloadPath, this.preloadContent, 'utf8')
    this.created()
  }

  created() {
  }

  generateContent() {
    return ''
  }

  /** 加载优先级 */
  static priority = 1000

}

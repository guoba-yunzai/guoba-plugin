import fs from 'fs'
import path from 'path'

/**
 * preload：预加载js
 */
export default class Preload {
  constructor(app, preloadName) {
    this.app = app
    this.preloadName = preloadName
    this.scriptSrc = `/preload/${this.preloadName}`
    this.created()
  }

  created() {
  }

  async writeScript(dirPath) {
    const preloadPath = path.join(dirPath, this.preloadName)
    const preloadContent = `(function(){try{${await this.generateContent()}}`
      + `catch(e){console.warn('[Guoba] preload "${this.preloadName}" error',e)}})()`
    fs.writeFileSync(preloadPath, preloadContent, 'utf8')
    return this.createScriptTag()
  }

  createScriptTag() {
    return `<script src="${this.scriptSrc}"></script>`
  }

  /**
   * 生成预加载内容
   *
   * @returns {Promise<string> | string}
   */
  async generateContent() {
    return '/* TODO: 请重写 generateContent 方法 */'
  }

  /** 加载优先级 */
  static priority = 1000

}

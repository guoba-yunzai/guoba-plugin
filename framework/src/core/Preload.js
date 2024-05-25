/**
 * preload：预加载js
 */
export default class Preload {
  /**
   *
   * @param {GuobaApplication} guobaApp
   * @param preloadName
   * @param scriptSrc
   */
  constructor(guobaApp, preloadName, scriptSrc) {
    this.guobaApp = guobaApp
    this.app = this.guobaApp.app
    this.preloadName = preloadName
    this.scriptSrc = scriptSrc
    this.created()
  }

  created() {
  }

  contentCache = null

  async getPreloadContent() {
    if (this.contentCache) {
      return this.contentCache
    }
    return await this.regenerateContent()
  }

  async regenerate() {
    this.contentCache = this.regenerateContent();
  }

  async regenerateContent() {
    this.contentCache = `(function(){try{${await this.generateContent()}}`
      + `catch(e){console.warn('[Guoba] preload "${this.preloadName}" error',e)}})()`
    return this.contentCache
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

}

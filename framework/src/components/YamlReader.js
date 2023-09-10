import fs from 'fs'
import YAML from 'yaml'
import lodash from 'lodash'
import chokidar from 'chokidar'

export default class YamlReader {

  // 配置文件数字key
  static CONFIG_INTEGER_KEY = 'INTEGER__'

  /**
   * 读写yaml文件
   *
   * @param yamlPath yaml文件绝对路径
   * @param isWatch 是否监听文件变化
   */
  constructor(yamlPath, isWatch = false) {
    this.yamlPath = yamlPath
    this.isWatch = isWatch
    this.initYaml()
  }

  initYaml() {
    try {
      // parseDocument 将会保留注释
      this.document = YAML.parseDocument(fs.readFileSync(this.yamlPath, 'utf8'))
    } catch (error) {
      throw error
    }
    if (this.isWatch && !this.watcher) {
      this.watcher = chokidar.watch(this.yamlPath).on('change', () => {
        if (this.isSave) {
          this.isSave = false
          return
        }
        this.initYaml()
      })
    }
  }

  get jsonData() {
    if (!this.document) {
      return null
    }
    return this.document.toJSON()
  }

  has(keyPath) {
    return this.document.hasIn(keyPath.split('.'))
  }

  get(keyPath) {
    return lodash.get(this.jsonData, keyPath)
  }

  set(keyPath, value) {
    this.document.setIn(keyPath.split('.'), value)
    this.save()
  }

  delete(keyPath) {
    this.document.deleteIn(keyPath.split('.'))
    this.save()
  }

  /**
   * 设置 document 的数据并保存（递归式）
   * @param data 要写入的数据
   */
  setData(data) {
    this.setDataRecursion(data, [])
    this.save()
  }

  /**
   * 递归式设置数据，但不保存
   * @param data
   * @param parentKeys
   */
  setDataRecursion(data, parentKeys) {
    if (Array.isArray(data)) {
      this.document.setIn(this.mapParentKeys(parentKeys), data)
    } else if (typeof data === 'object' && data !== null) {
      for (const [key, value] of Object.entries(data)) {
        this.setDataRecursion(value, parentKeys.concat([key]))
      }
    } else {
      parentKeys = this.mapParentKeys(parentKeys)
      this.document.setIn(parentKeys, data)
    }
  }

  // 将数字key转为number类型，防止出现引号
  mapParentKeys(parentKeys) {
    return parentKeys.map((k) => {
      if (k.startsWith(YamlReader.CONFIG_INTEGER_KEY)) {
        return Number.parseInt(k.replace(YamlReader.CONFIG_INTEGER_KEY, ''))
      }
      return k
    })
  }

  // 彻底删除某个key
  deleteKey(keyPath) {
    let keys = keyPath.split('.')
    keys = this.mapParentKeys(keys)
    this.document.deleteIn(keys)
    this.save()
  }

  // 保存yaml文件，写入文件
  save() {
    this.isSave = true
    let yaml = this.document.toString()
    fs.writeFileSync(this.yamlPath, yaml, 'utf8')
  }
}

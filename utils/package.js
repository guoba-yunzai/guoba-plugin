import fs from 'fs'

let pluginName = 'Guoba-Plugin'
if (!fs.existsSync(`./plugins/${pluginName}`)) {
  pluginName = pluginName.toLowerCase()
}

export const yunzaiPackage = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
export const pluginPackage = JSON.parse(fs.readFileSync(`./plugins/${pluginName}/package.json`, 'utf8'))

export {
  pluginName,
}
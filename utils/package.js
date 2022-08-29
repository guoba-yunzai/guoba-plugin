import fs from 'fs'

export const pluginName = 'Guoba-Plugin'
export const yunzaiPackage = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
export const pluginPackage = JSON.parse(fs.readFileSync(`./plugins/${pluginName}/package.json`, 'utf8'))

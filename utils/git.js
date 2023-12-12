import path from 'path'
import {GitTools} from '#guoba.framework'
import {_paths, GitRepoMap} from '#guoba.platform'
import {mkdirSync} from './common.js'

const repos = [
  {name: 'PluginsIndex', url: 'https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index.git'},
  {name: 'GuobaResources', url: 'https://gitee.com/guoba-yunzai/resources.git'},

  // {name: 'GuobaTest', url: 'https://gitee.com/guoba-yunzai/test.git'},
]

export function initRepos() {
  const repoPath = path.join(_paths.pluginRoot, 'data/repo')
  mkdirSync(repoPath)
  for (let {name, url} of repos) {
    const directory = path.join(repoPath, name)
    const tools = new GitTools(directory, url, {
      strictMode: true,
      immediateClone: true,
    })
    GitRepoMap.set(name, tools)
  }
}

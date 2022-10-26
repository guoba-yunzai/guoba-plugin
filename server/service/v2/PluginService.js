import path from 'path'

const {_paths} = await Guoba.GI('@/utils/common.js')
const IPluginService = await Guoba.GID('#/service/interface/IPluginService.js')

export default class PluginService extends IPluginService {
  constructor(app) {
    super(app)
    this.exclude = []
    this.pluginsPath = path.join(_paths.root, 'plugins')
  }
}

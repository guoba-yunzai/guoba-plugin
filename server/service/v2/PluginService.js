import path from 'path'
import {_paths} from "#guoba.platform";

const IPluginService = await Guoba.GID('#/service/interface/IPluginService.js')

export default class PluginService extends IPluginService {
  constructor(app) {
    super(app)
    this.exclude = []
    this.pluginsPath = path.join(_paths.root, 'plugins')
  }
}

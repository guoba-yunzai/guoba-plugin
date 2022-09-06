import YAML from 'yaml'
import fetch from 'node-fetch'
import {exec} from 'child_process'
import {_paths} from '../utils/paths.js'
import {_version, sendToMaster} from '../utils/common.js'
import {compare} from '../lib/compareVersions.js'

const _STATUS = {
  FAIL: 'FAIL',
  SUCCESS: 'SUCCESS',
  NO_UPDATE: 'NO_UPDATE',
  HAS_UPDATE: 'HAS_UPDATE',
  GIT_NO_UPDATE: 'GIT_NO_UPDATE',
}

let isChecked = false

/**
 * 锅巴更新
 */
export class GuobaUpdate extends plugin {
  constructor(e) {
    super({
      name: '锅巴更新',
      dsc: '锅巴更新、升级',
      event: 'message',
      priority: 100,
      rule: [
        {
          reg: '^#锅巴版本$',
          fnc: 'getVersion',
        },
        {
          reg: '^#锅巴(强制)?(更新|升级|update)$',
          fnc: 'doUpdate',
          permission: 'master',
        },
      ],
    })
    // 创建定时任务
    this.task = {
      // 每天的凌晨4点执行
      cron: '0 0 4 * * ?',
      name: '锅巴自动更新任务',
      fnc: this.doUpdateTask.bind(this),
    }
    // 立即执行一次检查更新
    if (!isChecked) {
      isChecked = true
      setTimeout(this.doCheckUpdate.bind(this, true), 1500)
    }
  }

  async getVersion() {
    return this.reply(`[Guoba] 当前版本：${_version}`)
  }

  async doUpdate() {
    let isForce = this.e.msg.includes('强制')
    let response
    if (!isForce) {
      this.reply(`[Guoba] 正在检查更新，请稍候……`)
      response = await this.doAutoUpdate()
    } else {
      this.reply(`[Guoba] 正在检查强制更新，请稍候……`)
      response = await this.doGitPull(true)
    }
    let {status, message} = response
    if (status === _STATUS.NO_UPDATE || status === _STATUS.GIT_NO_UPDATE) {
      return this.reply(`[Guoba] 已经是最新版本啦`)
    } else if (status === _STATUS.SUCCESS) {
      return this.reply(`[Guoba] ${message}`)
    } else {
      if (message) {
        return this.reply(`[Guoba] 更新失败！\n${message}`)
      }
      logger.error(`[Guoba] 更新失败：`, {status, message})
      return this.reply(`[Guoba] 更新失败…… 请查看日志获取更多信息`)
    }
  }

  async doUpdateTask() {
    logger.mark(`[Guoba] 开始执行自动更新任务……`)
    let {status, remote, message} = await this.doAutoUpdate(true)
    if (status === _STATUS.NO_UPDATE) {
      logger.mark(`[Guoba] 自动更新任务执行完毕，没有发现新版本`)
    } else if (status === _STATUS.SUCCESS) {
      let msg = `[Guoba] 自动${message}`
      if (remote.needRestart) {
        logger.mark(`[Guoba] 自动更新任务执行完毕，需要重启才能生效`)
      } else {
        logger.mark(`[Guoba] 自动更新任务执行完毕，无需重启即可生效`)
      }
      return sendToMaster(msg)
    } else {
      logger.mark(`[Guoba] 自动更新任务执行完毕，更新失败:`, {status, message})
    }
  }

  async doAutoUpdate(isTask = false) {
    let response = await this.doCheckUpdate()
    let {status, remote} = response
    if (status === _STATUS.NO_UPDATE) {
      return response
    }
    // 需要重启的，自动更新模式下不进行git pull
    if (remote.needRestart && isTask) {
      return { status: _STATUS.SUCCESS, remote, message: '检查更新发现新版本，但是需要重启，本次不进行自动升级，请手动升级~' }
    }
    // 不是最新版本，执行git pull更新
    response = await this.doGitPull()
    status = response.status
    if (status === _STATUS.GIT_NO_UPDATE) {
      return {status: _STATUS.NO_UPDATE, remote}
    }
    // 更新成功
    if (status === _STATUS.SUCCESS) {
      // needRestart 的意思是需要重启云崽
      // false即不需要重启云崽，可直接重载锅巴服务
      // true即需要重启云崽，此时重载锅巴服务可能会出错，故不重载锅巴服务
      if (!remote.needRestart) {
        Guoba && Guoba.reload && Guoba.reload()
      }
      let restartMsg = '本次更新' + (remote.needRestart ? '需要重启才能生效' : '无需重启即可生效')
      let message = `更新成功，当前版本：${remote.version}\n${restartMsg}，更新日志：\n`
      message += remote.updateLogs.map((log, index) => `${index + 1}. ${log}`).join('\n')
      return {status: _STATUS.SUCCESS, remote, message}
    }
    return {...response, remote}
  }

  /**
   * 检查更新
   * @param tell 是否给master发送消息
   */
  async doCheckUpdate(tell = false) {
    let remotes = await this.getRemoteVersion()
    if (!remotes || !remotes[0]) {
      return {status: _STATUS.FAIL, message: '获取远程版本信息失败'}
    }
    let remote = remotes[0]
    // 判断远程版本是否小于等于本地版本
    if (compare(remote.version, _version, '<=')) {
      return {status: _STATUS.NO_UPDATE, remote}
    }
    tell && sendToMaster(`[Guoba] 发现新版本：${remote.version}，请发送“#锅巴更新”进行更新`)
    // 判断是否需要重启，不仅要判断当前远程版本，还要判断最近一次需要重启的远程版本是否大于本地版本
    for (let item of remotes) {
      if (!item.needRestart) continue
      if (compare(item.version, _version, '>')) {
        remote.needRestart = true
        break
      }
    }
    return {status: _STATUS.HAS_UPDATE, remote}
  }

  /**
   * 获取远程版本信息
   * @return {Promise<{
   *  version: string,
   *  needRestart: boolean,
   *  releaseTime: string,
   *  updateLogs: string[],
   * }[]>}
   */
  async getRemoteVersion() {
    let url = 'https://gitee.com/guoba-yunzai/resources/raw/master/yaml/version.yaml'
    let response = await fetch(url)
    if (response.status !== 200) {
      logger.warn(`[Guoba] 获取最新版本信息失败，status: ${response.status}`)
      return null
    }
    let rawText = await response.text()
    try {
      return YAML.parse(rawText)
    } catch (e) {
      logger.error(`[Guoba] 解析最新版本信息失败`)
      console.error(e)
      return null
    }
  }

  /**
   * 执行git pull更新
   * @param isForce 是否强制更新
   * @return {Promise<{status: number, message: string}>}
   */
  doGitPull(isForce = false) {
    return new Promise((resolve) => {
      let command = 'git pull'
      if (isForce) {
        command = 'git checkout . && git pull'
      } else {
      }
      exec(command, {cwd: _paths.pluginRoot}, function (error, stdout, stderr) {
        if (error) {
          let message = 'Error code: ' + error.code + '\n' + error.stack + '\n 请稍后重试。'
          resolve({status: _STATUS.FAIL, message})
          return
        }
        if (/Already up[ -]to[ -]date/.test(stdout)) {
          resolve({status: _STATUS.GIT_NO_UPDATE})
          return
        }
        resolve({status: _STATUS.SUCCESS, message: '更新成功' + (isForce ? '，由于是强制更新，本次更新需要重启才能生效' : '')});
      })
    })
  }
}

import path from 'path'
import moment from 'moment'
import child from 'child_process'
import {_paths} from '../../../../utils/paths.js'
import {isV2} from '../../../../utils/adapter.js'
import {ACTION_CODE, examplePath, checkJsCompatibility} from './child/constant.js'
import {sleep} from '../../../../utils/common.js'

const Result = await Guoba.GID('#/components/Result.js')
const RestController = await Guoba.GID('#/components/RestController.js')

/**
 * V2迁移
 */
export default class V2Transfer extends RestController {

  constructor(app) {
    super('/v2-transfer', app)
  }

  registerRouters() {
    if (isV2) {
      this.get('/status', this.getTransferStatus)
      this.post('/reset', this.resetTransfer)
      // 开始迁移
      this.post('/start', this.startTransfer)
      // 取消迁移
      this.put('/stop', this.stopTransfer)
      // 检查JS文件兼容性
      this.get('/check-js', this.checkJsFile)
    }
  }

  get status() {
    if (!global.GUOBA_TRANSFER_STATUS) {
      this.resetTransfer()
    }
    return global.GUOBA_TRANSFER_STATUS
  }

  log(l) {
    let time = moment().format('HH:mm:ss')
    this.status.logs.push(`[${time}] ` + l)
    logger.mark('[Guoba] ' + l)
  }

  getTransferStatus() {
    return Result.ok(this.status)
  }

  resetTransfer() {
    global.GUOBA_TRANSFER_STATUS = {
      // 0 = 未开始，1 = 进行中，2 = 成功， 3 = 失败
      state: 0,
      // 进度
      percent: 0,
      // 日志
      logs: [],
      // 失败原因
      reason: '',
    }
    return Result.ok()
  }

  async startTransfer(req, res) {
    if (this.status.state !== ACTION_CODE.wait) {
      return Result.error('请重启重置迁移状态')
    }
    await this.forkChildTransfer(req.body.config)
    return Result.ok('迁移已开始')
  }

  childProcess = null

  async stopTransfer(req, res) {
    if (this.status.state !== ACTION_CODE.ing || !this.childProcess) {
      return Result.error('没有正在迁移，无需停止')
    }
    this.childProcess.send({type: 'stop'})
    await sleep(150)
    this.childProcess.kill()
    this.childProcess = null
    this.log('迁移程序已被强行终止')
    this.status.state = ACTION_CODE.fail
    this.status.reason = '迁移程序已被强行终止'
    return Result.ok({}, this.status.reason)
  }

  forkChildTransfer(config) {
    return new Promise(resolve => {
      let modulePath = path.join(_paths.pluginRoot, './server/controller/other/v2/child/transfer.js')
      this.childProcess = child.fork(modulePath)
      this.childProcess.on('message', (e) => {
        if (e.type === 'mounted') {
          resolve()
          this.childProcess.send({type: 'start', config, BotConfig})
        } else if (e.type === 'log') {
          this.log(e.text)
          if (e.reason) {
            this.status.reason = e.text
          }
        } else if (e.type === 'state') {
          this.status.state = e.state
        } else if (e.type === 'percent') {
          this.status.percent = e.percent
        } else if (e.type === 'redis-execute') {
          let fn = redis[e.fn]
          if (typeof fn === 'function') {
            (async () => {
              let data = await fn.apply(redis, e.args)
              this.childProcess.send({type: 'redis-callback', id: e.id, data})
            })()
          } else {
            this.childProcess.send({type: 'redis-callback', id: e.id})
          }
        }
      })
    })
  }

  async checkJsFile() {
    let res = checkJsCompatibility(examplePath)
    return Result.ok(res)
  }

}
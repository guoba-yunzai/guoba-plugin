import fs from 'fs'
import path from 'path'
import moment from 'moment'
import child from 'child_process'
import {ACTION_CODE, RES_SET} from './constant.js'
import {_paths, dateDiff, mkdirSync, sleep} from '../../../../../utils/common.js'

/*
 * 迁移子进程。
 * 使用子进程的优点在于父进程可直接kill掉子进程，
 * 实现随时停止迁移。
 */

if (typeof process.send === 'function') {
  process.send({type: 'mounted'})
  process.on('message', (e) => {
    if (e.type === 'start') {
      doTransferV2(e.config).finally(() => setTimeout(() => process.kill(0), 100))
    }
  })
}

const steps = [
  doGitClone,
  doMoveData,
]

async function doTransferV2(config) {
  let beginTime = moment()
  try {
    updatePercent(2)
    updateState(ACTION_CODE.ing)
    log('迁移已开始……')
    await doGitClone(config)
    updatePercent(10)
    await sleep(1000)
    await doMoveData(config)
    updatePercent(20)

    await sleep(1500)
    // done
    updateState(ACTION_CODE.success)
    updatePercent(100)
    return true
  } catch (e) {
    if (e === ACTION_CODE.fail) {
      updateState(ACTION_CODE.fail)
    } else {
      log(e.message || e)
    }
  } finally {
    let endTime = moment()
    let diffs = dateDiff(beginTime, endTime)
    let timeTip = ''
    if (diffs.days) timeTip += diffs.days + '天'
    if (diffs.hours) timeTip += diffs.hours + '小时'
    if (diffs.minutes) timeTip += diffs.minutes + '分钟'
    timeTip += diffs.seconds + '秒'
    setTimeout(() => log('迁移已结束，耗时：' + timeTip), 2)
  }
  return false
}

// 克隆Git仓库
function doGitClone({installMode, gitAddress, installPath}) {
  if (installMode !== 'new') {
    log('使用现有V3目录：' + installPath)
    log('注：如选择的目录并非V3目录，则有可能会报错！')
    return Promise.resolve()
  }
  // 全新下载Yunzai-Bot项目
  return new Promise((resolve, reject) => {
    let repoURL = RES_SET.git[gitAddress]
    if (!repoURL) {
      return reject('gitAddress error')
    }
    log(`正在通过${gitAddress}克隆仓库……`)
    mkdirSync(installPath)
    let cmd = `git clone --depth=1 -b main ${repoURL} "${installPath}"`
    child.exec(cmd, {}, (error, stdout, stderr) => {
      if (error) {
        let tip = '仓库克隆失败，'
        if (/unable to access/.test(error.message)) {
          tip += '可能是因为网络不通畅的原因。'
          if (gitAddress === 'github') {
            setTimeout(() => log('若github多次失败，建议改用gitee'), 1)
          }
        } else if (/already exists and is not an empty directory/.test(error.message)) {
          tip += '选择的目录不是空的'
        } else {
          tip = '未知原因！\n' + error.message
        }
        log(tip, true)
        reject(ACTION_CODE.fail)
      } else {
        log('仓库克隆成功！')
        resolve(ACTION_CODE.success)
      }
    })
  })
}

// 移动data文件夹
async function doMoveData({mode, installPath, rubbishClean}) {
  let dataPath = {
    v2: _paths.data,
    v3: path.join(installPath),
  }
  mkdirSync(dataPath.v3)
  if (mode === 'full') {
    // 全量迁移 data 文件夹
    log('开始全量迁移“data”文件夹操作')
    if (rubbishClean) {
      await sleep(1000)
      log('已开启清理垃圾文件')
    }
    await recursiveDir(['data'], ({dirPaths, filePath, fileName}) => {
      if (rubbishClean && !filterJunkFiles(filePath)) {
        return
      }
      try {
        let toPath = path.join(dataPath.v3, ...dirPaths, fileName)
        mkdirSync(path.dirname(toPath))
        fs.copyFileSync(filePath, toPath)
      } catch (e) {
        log('复制 ' + filePath + '失败：' + (e.message || e))
      }
    })
  } else {
    //
    log('正在迁移“data”文件夹')
  }
}

function doMove() {

}

// 递归遍历目录
async function recursiveDir(dirPaths = [], cb, level = 0) {
  let dirPath = path.join(_paths.root, ...dirPaths)
  if (level <= 1) {
    log('正在迁移目录：' + dirPath)
    await sleep(500)
  }
  let items = fs.readdirSync(dirPath)
  for (let item of items) {
    let itemPath = path.join(dirPath, item)
    let stat = fs.statSync(itemPath)
    if (stat.isDirectory()) {
      await recursiveDir(dirPaths.concat(item), cb, level + 1)
    } else {
      cb({fileName: item, filePath: itemPath, stat, dirPaths})
    }
  }
}

// 过滤垃圾文件
function filterJunkFiles(filePath) {
  let extname = path.extname(filePath)
  if (extname === '.html') {
    return false
  } else if (extname === '.htm') {
    return false
  }
  return true
}

function log(t, reason = false) {
  process.send({type: 'log', text: t, reason})
}

function updateState(state) {
  process.send({type: 'state', state})
}

function updatePercent(percent) {
  process.send({type: 'percent', percent})
}

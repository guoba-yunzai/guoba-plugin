import fs from 'fs'
import path from 'path'
import {exec} from 'child_process'
import {cfg} from '#guoba.platform'

/**
 * git工具类
 */
export default class GitTools {

  static STATUS = {
    ERROR: -1,
    OK: 0,
    AUTH_ERROR: -2,
  }

  static CHECK_STATUS = {
    NOT_EXIST: 1,
    NOT_MATCH: 2,
  }

  static PULL_STATUS = {
    UP_TO_DATE: 0,
  }

  /**
   * 当前仓库是否存在错误
   * @type {boolean}
   */
  repoIsError = false

  /**
   *
   * @param directory 本地目录
   * @param repository 仓库地址
   * @param options 配置
   */
  constructor(directory, repository, options) {
    this.name = path.basename(directory)
    this.directory = directory
    this.repository = repository

    this.options = Object.assign({}, {
      // 严格模式，如果仓库不存在或者不是指定仓库，会删除目录重新克隆
      strictMode: false,
      // 是否在初始化时立即克隆
      immediateClone: false,
      // 备用链接
      fallbackUrl: null 
    }, options)

    if (this.options.immediateClone) {
      this.initPromise = this.init()
    }
  }

  async init() {
    // logger.debug(`[Guoba] 开始执行 "${this.name}" 仓库的初始化操作： ${this.directory} `)

    const checkRes = await this.checkRepo()
    if (checkRes === GitTools.CHECK_STATUS.NOT_EXIST) {
      const res = await this.cloneRepo()
      if (res.status !== GitTools.STATUS.OK) {
        logger.error(`[Guoba] 执行 "${this.name}" 仓库的clone操作时出现错误；stderr: ${res.stderr}`)
      }
    } else if (checkRes === GitTools.CHECK_STATUS.NOT_MATCH) {
      if (this.options.strictMode) {
        logger.warn(`[Guoba] 检测到 "${this.name}" 仓库损坏，执行删除并重新克隆操作`)
        await this.forceReClone()
      } else {
        logger.error(`[Guoba] 检测到 "${this.name}" 仓库损坏，非严格模式下不执行任何操作`)
        this.repoIsError = true
      }
    } else if (checkRes === GitTools.STATUS.OK) {
      const res = await this.pull()
      if (res.status === GitTools.STATUS.AUTH_ERROR) {
        logger.warn(`[Guoba] "${this.name}" 仓库更新被跳过(需账号验证且无备用链接)，直接保留并使用本地现有缓存。`)
      } else if (res.status === GitTools.STATUS.ERROR) {
        if (this.options.strictMode) {
          logger.warn(`[Guoba] 检测到 "${this.name}" 仓库损坏，执行删除并重新克隆操作`)
          await this.forceReClone()
        } else {
          logger.error(`[Guoba] 执行 "${this.name}" 仓库的pull操作时出现错误；stderr: ${res.stderr}`)
        }
      }
    }
  }

  async forceReClone() {
    const rmSync = fs.rmSync || fs.rmdirSync
    rmSync(this.directory, {recursive: true, force: true})
    const res = await this.cloneRepo()
    if (res.status === GitTools.STATUS.OK) {
      this.repoIsError = false
    } else {
      logger.warn(`[Guoba] 执行 "${this.name}" 仓库的强制重新Clone操作时出现错误，请手动删除 "${this.directory}" 目录并重启；stderr: ${res.stderr}`)
    }
    return res
  }

  /**
   * 检查仓库是否存在
   */
  async checkRepo() {
    const dirIsExist = fs.existsSync(this.directory)
    if (!dirIsExist) {
      return GitTools.CHECK_STATUS.NOT_EXIST
    }
    const gitIsExist = fs.existsSync(path.join(this.directory, '.git'))
    if (!gitIsExist) {
      return GitTools.CHECK_STATUS.NOT_MATCH
    }
    const res = await this.exec(`git -C "${this.directory}" remote -v`)
    if (res.error) {
      throw new Error(res.stderr)
    }
    if (res.stdout.includes(this.repository)) {
      return GitTools.STATUS.OK
    }
    return GitTools.CHECK_STATUS.NOT_MATCH
  }

  // 内部辅助方法：处理代理拼接
  _getProxyUrl(repoUrl) {
    const githubReverseProxy = cfg.get('base.githubReverseProxy');
    let githubProxyUrl = cfg.get('base.githubProxyUrl');

    if (githubProxyUrl && !githubProxyUrl.endsWith('/')) {
      githubProxyUrl += '/';
    }

    const isGithubRepo = /github\.com/.test(repoUrl);
    return isGithubRepo && githubReverseProxy && githubProxyUrl
      ? `${githubProxyUrl}${repoUrl}`
      : repoUrl;
  }

  async cloneRepo() {
    let repositoryUrl = this._getProxyUrl(this.repository);

    let res = await this.execSingle(
      'cloneRepo',
      `git clone --single-branch --depth=1 "${repositoryUrl}" "${this.directory}"`
    );

    let status = res.error 
      ? (res.stderr?.includes('[因需要账号验证已自动跳过]') ? GitTools.STATUS.AUTH_ERROR : GitTools.STATUS.ERROR) 
      : GitTools.STATUS.OK;

    // 失败自动切换备用链接 (Fallback)
    if (status === GitTools.STATUS.AUTH_ERROR && this.options.fallbackUrl && this.repository !== this.options.fallbackUrl) {
      if (typeof logger !== 'undefined') logger.warn(`[Guoba] "${this.name}" 仓库克隆受限，正在尝试切换至备用链接 (GitHub)...`);
      
      this.repository = this.options.fallbackUrl;
      repositoryUrl = this._getProxyUrl(this.repository);

      // 清理可能克隆到一半的残留空文件夹
      const rmSync = fs.rmSync || fs.rmdirSync;
      if (fs.existsSync(this.directory)) {
        try { rmSync(this.directory, { recursive: true, force: true }) } catch(e) {}
      }

      res = await this.execSingle(
        'cloneRepo_fallback',
        `git clone --single-branch --depth=1 "${repositoryUrl}" "${this.directory}"`
      );
      
      status = res.error 
        ? (res.stderr?.includes('[因需要账号验证已自动跳过]') ? GitTools.STATUS.AUTH_ERROR : GitTools.STATUS.ERROR) 
        : GitTools.STATUS.OK;
    }

    return { ...res, status };
  }

  /**
   * 重置仓库，一般用于强制更新
   */
  async reset() {
    const res = await this.execSingle('reset', `git -C "${this.directory}" reset --hard`)
    if (res.error) {
      return {
        ...res,
        status: GitTools.STATUS.ERROR,
      }
    }
    return {
      ...res,
      status: GitTools.STATUS.OK,
    }
  }

  async pull() {
    let res = await this.execSingle('pull', `git -C "${this.directory}" pull`)
    let status = GitTools.PULL_STATUS.UP_TO_DATE;

    if (res.error) {
      status = res.stderr?.includes('[因需要账号验证已自动跳过]') ? GitTools.STATUS.AUTH_ERROR : GitTools.STATUS.ERROR;
    }

    // 失败自动切换备用链接 (Fallback)
    if (status === GitTools.STATUS.AUTH_ERROR && this.options.fallbackUrl && this.repository !== this.options.fallbackUrl) {
      if (typeof logger !== 'undefined') logger.warn(`[Guoba] "${this.name}" 仓库更新受限，正在尝试切换至备用链接 (GitHub)...`);
      
      this.repository = this.options.fallbackUrl;
      
      // 修改本地仓库的 remote url 指向 GitHub
      await this.exec(`git -C "${this.directory}" remote set-url origin "${this.repository}"`);
      
      res = await this.execSingle('pull_fallback', `git -C "${this.directory}" pull`);
      
      if (res.error) {
        status = res.stderr?.includes('[因需要账号验证已自动跳过]') ? GitTools.STATUS.AUTH_ERROR : GitTools.STATUS.ERROR;
      } else {
        status = GitTools.PULL_STATUS.UP_TO_DATE;
      }
    }

    return { ...res, status };
  }

  /**
   * 执行单例任务
   * @param key
   * @param cmd
   */
  async execSingle(key, cmd) {
    let cacheKey = `execSingle_${key}`
    if (this[cacheKey]) {
      // console.log(`${key} 存在任务，等待任务完成`)
      return this[cacheKey]
    }
    this[cacheKey] = this.exec(cmd)
    const res = await this[cacheKey]
    this[cacheKey] = null
    return res
  }

  exec(cmd) {
    const beginTime = Date.now()
    return new Promise((resolve) => {
      exec(`${cmd}`, {
        windowsHide: true,
        // 添加 env 环境变量，强制 Git 不要弹出账号密码输入提示
        env: {
          ...process.env,
          GIT_TERMINAL_PROMPT: '0', // 禁用终端提示
          GIT_ASKPASS: 'echo'       // 即使尝试弹窗也会直接返回空并报错
        }
      }, (error, stdout, stderr) => {
        const timeMs = Date.now() - beginTime
        
        // 检测 stderr 中是否包含因缺少账号密码而导致的报错
        if (stderr && (stderr.includes('could not read Username') || stderr.includes('Authentication failed') || stderr.includes('terminal prompts disabled'))) {
          const warnStr = `[Guoba][GitTools] 仓库 "${this.name}" 访问受限！[目标地址]：${this.repository} [原因]：该仓库需要账号密码验证（可能是私有仓库或链接已失效）。系统将尝试干预处理。`;
          if (typeof logger !== 'undefined') {
            logger.warn(warnStr);
          } else {
            console.error(warnStr);
          }
          // 在 stderr 前面加上明确的标识，方便上层方法的 catch / log 也能清楚原因
          stderr = `[因需要账号验证已自动跳过] ${stderr}`;
        }

        resolve({error, stdout, stderr, timeMs});
      });
    });
  }

}


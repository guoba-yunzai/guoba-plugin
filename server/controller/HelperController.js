import { autowired, Result } from "#guoba.framework"
import { ApiController, cfg, _paths } from "#guoba.platform"
import { releasePath, verifyLocalRelease } from "../helper/localRelease.js"

const RedisDecorator = await Guoba.GID("#/decorator/RedisDecorator.js")

/**
 * 工具类Controller
 */
export default class HelperController extends ApiController {
  helperService = autowired("helperService")

  constructor(guobaApp) {
    super("/helper", guobaApp)
  }

  registerRouters() {
    // 中转请求，绕过跨域和防盗链
    this.all("/transit", this.transitRequest)
    // 获取天气信息（缓存6小时）
    this.get("/city_weather", this.getCityWeather, [
      new RedisDecorator("city_weather:${config.getCity()}", {
        EX: 60 * 60 * 6,
        getCity: this.getCity,
      }),
    ])
    // 仅允许持有本地共享密钥的新实例交接端口。
    this.delete("/release_port", this.tryReleasePort)
  }

  transitRequest(req, res) {
    return this.helperService.transitRequest(req, res)
  }

  getCity() {
    return cfg.get("base.city")
  }

  async getCityWeather() {
    try {
      let city = this.getCity()
      return Result.ok({
        weather: await this.helperService.getWeather(city),
      })
    } catch (e) {
      logger.error(e)
      return Result.error(e.message || e)
    }
  }

  tryReleasePort(req) {
    const path = releasePath(_paths.server.realMountPrefix)
    if (!verifyLocalRelease(req, cfg.getJwtSecret(), path)) return Result.noAuth()
    const server = Guoba.server
    if (typeof server?.close !== "function") {
      return Result.error("当前服务尚未就绪，无法释放端口", 503)
    }
    logger.mark("[Guoba] 服务已在另一处启动，正在尝试停止当前服务……")
    setTimeout(() => {
      server.close(error => {
        if (error) {
          logger.mark("[Guoba] 服务停止失败")
          logger.error(error)
        } else {
          logger.mark("[Guoba] 已停止当前服务，您如果想要多开锅巴，请更改不同的端口号~")
        }
      })
    }, 10)
    return Result.ok()
  }
}

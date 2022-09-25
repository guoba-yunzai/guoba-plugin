const cfg = await Guoba.GID('cfg')
const Result = await Guoba.GID('#/components/Result.js')
const {autowired} = await Guoba.GI('#/loader/injection.js')
const RedisDecorator = await Guoba.GID('#/decorator/RedisDecorator.js')
const RestController = await Guoba.GID('#/components/RestController.js')

/**
 * 工具类Controller
 */
export default class HelperController extends RestController {

  helperService = autowired('helperService')

  constructor(app) {
    super('/helper', app)
  }

  registerRouters() {
    // 中转请求，绕过跨域和防盗链
    this.all('/transit', this.transitRequest)
    // 获取天气信息（缓存6小时）
    this.get('/city_weather', this.getCityWeather, [
      new RedisDecorator('city_weather:${config.getCity()}', {EX: 60 * 60 * 6, getCity: this.getCity}),
    ])
    // 本地尝试释放端口
    // 假设用户关闭yunzai时，没有关干净，导致端口号被异常占用
    // 此时另一方启动的锅巴可以尝试调用此接口，来关闭当前的端口占用
    // 安全性：仅限 localhost 访问
    this.delete('/release_port', this.tryReleasePort)
  }

  transitRequest(req, res) {
    return this.helperService.transitRequest(req, res)
  }

  getCity() {
    return cfg.get('base.city')
  }

  async getCityWeather() {
    try {
      let city = this.getCity()
      return Result.ok({
        weather: await this.helperService.getWeather(city),
      })
    } catch (e) {
      logger.error(e)
      let msg = e.message || e
      return Result.error(msg)
    }
  }

  tryReleasePort(req) {
    if (req.hostname !== 'localhost') {
      return Result.noAuth()
    }
    logger.mark('[Guoba] 服务已在另一处启动，正在尝试停止当前服务……')
    setTimeout(() => {
      Guoba.server.close(err => {
        if (err) {
          logger.mark('[Guoba] 服务停止失败')
          logger.error(err)
        } else {
          logger.mark('[Guoba] 已停止当前服务，您如果想要多开锅巴，请更改不同的端口号~')
        }
      })
    }, 10)
    return Result.ok()
  }
}
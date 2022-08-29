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
      new RedisDecorator('city_weather', {EX: 60 * 60 * 6}),
    ])
  }

  transitRequest(req, res) {
    return this.helperService.transitRequest(req, res)
  }

  async getCityWeather() {
    try {
      let city = cfg.get('base.city')
      return Result.ok(await this.helperService.getWeather(city))
    } catch (e) {
      console.error(e)
      return Result.error(e.message || e)
    }
  }

}
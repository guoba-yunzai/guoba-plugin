# Copilot 编码指南 — Guoba-Plugin（锅巴插件）

## 项目概述

Guoba-Plugin 是 Yunzai-Bot（云崽机器人）的后台管理面板插件，提供基于 Web 的配置管理、插件管理和机器人控制功能。项目使用纯 JavaScript（ES Modules），运行在 Node.js 环境中，兼容 Miao-Yunzai V3/V4 和 TRSS-Yunzai。

## 技术栈

| 技术 | 用途 |
|------|------|
| **Express** | HTTP 服务器与路由 |
| **Socket.io** | WebSocket 实时通信 |
| **jsonwebtoken** | JWT 认证 |
| **multer** | 文件上传 |
| **body-parser** | 请求体解析 |
| **Redis** | 会话存储（由 Yunzai-Bot 提供，全局 `redis` 对象） |

## 项目结构

```
guoba-plugin/
├── index.js              # 主入口，检测平台版本并加载适配器
├── main.js               # alemonjs 框架入口（备用）
├── guoba.support.js      # 插件元数据、配置模式定义
├── package.json          # 依赖与 ES Module 配置
│
├── adapter/              # Yunzai 版本适配层（V2/V3/V4）
│   └── yunzai/           # 不同版本的适配逻辑
│
├── apps/                 # 机器人聊天命令处理
│   ├── helper.js         # 帮助命令
│   ├── login.js          # 登录命令
│   ├── update.js         # 更新命令
│   └── v2-adapter.js     # V2 兼容命令
│
├── framework/            # 自研 Web 框架（类 Spring Boot 架构）
│   └── src/
│       ├── core/         # Controller、Service、Interceptor 等基类
│       ├── helper/       # injection.js（依赖注入）
│       ├── loader/       # 组件加载器
│       └── utils/        # 框架工具函数
│
├── server/               # Web 服务器（核心业务逻辑）
│   ├── controller/       # REST 控制器
│   │   ├── system/       # 系统：登录、用户、权限、首页
│   │   ├── biz/          # 业务：配置、插件、机器人
│   │   ├── plugin/       # 第三方插件集成
│   │   └── other/        # V2 数据迁移
│   ├── service/          # 业务逻辑服务层
│   │   ├── both/         # 通用服务（LoginService 等）
│   │   ├── v2/           # V2 专用服务
│   │   └── v3/           # V3/V4 专用服务
│   ├── interceptor/      # 中间件拦截器（TokenInterceptor）
│   ├── decorator/        # 请求/响应装饰器
│   ├── preload/          # HTML 预加载注入
│   ├── constant/         # 常量定义
│   ├── helper/           # 辅助工具
│   ├── utils/            # 服务端工具函数
│   └── static/           # 前端 Web UI 静态资源（预编译）
│
├── utils/                # 全局工具函数
├── models/               # 平台抽象层（导出路径、配置、常量等）
├── lib/                  # 第三方工具库
├── defSet/               # 默认配置模板（YAML）
├── resources/            # 静态资源（图片、JSON）
└── components/           # UI 组件（Changelog 等）
```

## 模块系统与导入

项目使用 **ES Modules**（`"type": "module"`），通过 `package.json` 中的 `imports` 字段定义路径别名：

```javascript
// 使用路径别名导入
import { autowired, Result } from '#guoba.framework'
import { cfg, Constant, _paths } from '#guoba.platform'
import { getAllWebAddress } from '#guoba.utils'
import { ApiController } from '#guoba.platform'
```

**路径别名映射：**
- `#guoba.platform` → `./models/platform.js`（路径、配置、常量等）
- `#guoba.utils` → `./models/utils.js`（工具函数）
- `#guoba.libs` → `./models/libs.js`（库的再导出）
- `#guoba.adapter` → `./adapter/index.js`（适配器层）
- `#guoba.framework` → `./framework/index.js`（框架核心组件）
- `#guoba.framework.utils` → `./framework/src/utils/common.js`

## 核心架构模式

### Controller-Service-Interceptor 架构

项目使用类似 Spring Boot 的分层架构：

**创建控制器：**
```javascript
import { autowired, Result } from '#guoba.framework'
import { ApiController } from '#guoba.platform'

export class MyController extends ApiController {
  // 依赖注入：使用 autowired() 注入 Service 实例
  myService = autowired('myService')

  constructor(guobaApp) {
    super('/my-prefix', guobaApp)
  }

  // 在此方法中注册路由
  registerRouters() {
    this.get('/list', this.getList)
    this.post('/save', this.save)
    this.put('/update/:id', this.update)
    this.delete('/delete/:id', this.remove)
  }

  async getList(req) {
    const data = await this.myService.getList()
    return Result.ok(data)
  }

  async save(req) {
    const { name } = req.body
    await this.myService.save(name)
    return Result.ok(null, '保存成功')
  }
}
```

**创建服务：**
```javascript
import { Service, GuobaError } from '#guoba.framework'
import { cfg, Constant } from '#guoba.platform'

export class MyService extends Service {
  constructor(app) {
    super(app)
  }

  async getList() {
    // 业务逻辑
  }

  async save(name) {
    if (!name) {
      throw new GuobaError('名称不能为空')
    }
    // 保存逻辑
  }

  // 加载优先级（数字越小越先加载）
  static priority = 1000
}
```

### 依赖注入

使用 `autowired()` 函数实现依赖注入，基于 ES6 Proxy 延迟获取实例：

```javascript
import { autowired } from '#guoba.framework'

// 在类属性中声明，使用 camelCase 服务名（类名首字母小写）
loginService = autowired('loginService')    // → LoginService 实例
systemService = autowired('systemService')  // → SystemService 实例
```

### 错误处理

- 业务异常：抛出 `GuobaError`，会被自动捕获并转换为 `Result.error(message)`
- 响应格式：统一使用 `Result` 类
  - `Result.ok(data, message)` — 成功响应
  - `Result.error(message)` — 错误响应
  - `Result.noLogin()` — 未登录（HTTP 401）
  - `Result.unrealized()` — 未实现（HTTP 501）

### Redis 使用

Yunzai-Bot 提供全局 `redis` 对象，无需导入：

```javascript
// 读取
const value = await redis.get(key)
// 写入（带过期时间，单位：秒）
await redis.set(key, value, { EX: 3600 })
// 删除
await redis.del(key)
```

Key 前缀使用 `Constant.REDIS_PREFIX`（值为 `Yz:guoba:`）。

## 全局对象

Yunzai-Bot 运行时提供以下全局对象，无需导入即可使用：

| 全局对象 | 说明 |
|---------|------|
| `redis` | Redis 客户端 |
| `logger` | 日志工具（`.info()`, `.mark()`, `.error()`, `.debug()`） |
| `plugin` | 插件基类（`apps/` 目录下的命令类继承此类） |
| `segment` | 消息段构造工具（如 `segment.image(path)`） |
| `Bot` / `global.Bot` | 机器人实例 |
| `Guoba` | 锅巴插件全局实例 |

## 命令处理（apps/ 目录）

```javascript
export class MyCommand extends plugin {
  constructor(e) {
    super({
      name: '命令名称',
      dsc: '命令描述',
      event: 'message',
      priority: 100,
      rule: [
        {
          reg: '^#锅巴xxx$',     // 正则匹配消息
          fnc: 'methodName',     // 处理方法名
          permission: 'master',  // 权限：'master' 或空
        },
      ],
    })
  }

  async methodName() {
    return this.e.reply('回复消息')
  }
}
```

## 命名约定

| 类别 | 规则 | 示例 |
|------|------|------|
| 类名 | PascalCase | `LoginController`, `PluginService` |
| 方法名 | camelCase | `getList`, `signToken` |
| 服务注入名 | camelCase（类名首字母小写） | `autowired('loginService')` |
| 常量 | UPPER_SNAKE_CASE | `REDIS_PREFIX`, `TOKEN_KEY` |
| 文件名 | PascalCase（类文件）或 camelCase（工具） | `LoginController.js`, `common.js` |

## 配置管理

默认配置位于 `defSet/application.yaml`，运行时配置保存在 `config/` 目录（已被 `.gitignore` 忽略）。使用 `cfg` 对象读写配置：

```javascript
import { cfg } from '#guoba.platform'

// 读取配置
const city = cfg.get('base.city')
const port = cfg.get('server.port')

// 写入配置
cfg.set('base.guide', false)

// 获取 JWT 密钥
const secret = cfg.getJwtSecret()
```

## 构建、测试与运行

### 无构建步骤

项目是纯 JavaScript 运行时代码，无需编译或打包。

### 无测试框架

项目当前没有自动化测试基础设施（无测试文件、无测试框架配置）。`.gitignore` 中忽略了 `/test/` 目录。

### 无 CI/CD

项目没有 GitHub Actions 工作流或其他 CI/CD 配置。

### 无代码检查工具

项目没有配置 ESLint、Prettier 或其他代码检查工具。

### 依赖安装

```bash
# 推荐（在 Yunzai-Bot 工作区中使用 pnpm）
pnpm install --filter=guoba-plugin

# 备选方案
npm install express multer body-parser jsonwebtoken socket.io
```

### 运行方式

此插件不能独立运行，必须作为 Yunzai-Bot 的插件加载。插件安装在 `Yunzai-Bot/plugins/Guoba-Plugin/` 目录下，Yunzai-Bot 启动时自动发现并加载。

默认 Web 管理面板端口：**50831**。

## 版本兼容

项目需要兼容多个 Yunzai-Bot 版本：

- **V3**（Miao-Yunzai V3）：主要支持版本
- **V4**（Miao-Yunzai V4）：支持
- **V2**（旧版 Yunzai-Bot）：有限支持，仅数据迁移

版本检测逻辑在 `adapter/yunzai/version.js` 中，适配逻辑分别在 `adapter/yunzai/v3.js` 和 `adapter/yunzai/v4.js` 中。

## 注意事项

1. **不要修改 `server/static/` 目录** — 这是前端预编译产物，标记为 `linguist-generated`
2. **`data/` 和 `config/` 目录被 `.gitignore` 忽略** — 运行时生成的数据和配置不应提交
3. **全局对象依赖 Yunzai-Bot 运行时** — `redis`、`logger`、`plugin`、`segment` 等在独立环境中不可用
4. **路径别名（`#guoba.*`）是通过 `package.json` 的 `imports` 字段定义的** — 修改别名时需同步更新 `package.json`
5. **`server/static/` 中的静态资源文件使用 Git LFS 管理**（见 `.gitattributes`）
6. **注释和用户界面文本使用中文**
7. **许可证为 GPL-3.0-or-later** — 添加的代码需兼容此许可证

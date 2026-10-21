import express from "express"
import multer from "multer"
import { createUploadHandler } from "../helper/upload.js"

const smallBodyLimit = 16 * 1024
const createBodyParser = limit =>
  express.Router().use(express.json({ limit }), express.urlencoded({ limit, extended: true }))

function checkSmallBody(req, checkLength = false) {
  if (
    (checkLength && Number(req.headers["content-length"]) > smallBodyLimit) ||
    Buffer.byteLength(JSON.stringify(req.body || {})) > smallBodyLimit
  ) {
    return Object.assign(new Error("公开接口请求体过大"), { status: 413 })
  }
}

/**
 * 一些辅助工具
 * @param {GuobaApplication} guobaApp
 */
export function useHelper(guobaApp) {
  const { app, _args } = guobaApp
  if (_args.staticPath) {
    // 静态资源
    app.set("views", _args.staticPath)
    app.use(_args.prefix, express.static(_args.staticPath))
    app.get("/robots.txt", (req, res) => {
      res.type("text/plain").send("User-agent: *\nDisallow: /\n")
    })
  }
}

/**
 * 在拦截器之后、控制器之前注册请求解析，仅作用于当前应用的 API。
 * @param {GuobaApplication} guobaApp
 */
export function useRequestParsers(guobaApp) {
  const { app, _args } = guobaApp
  const router = express.Router()
  // 登录接口无需令牌，只允许提交小型表单；其他接口保持原有大小限制。
  const loginParser = createBodyParser("16kb")
  const apiParser = createBodyParser("50mb")
  router.use("/api", (req, res, next) => {
    // 本机端口交接不读取请求体，先由接口自身校验签名，避免匿名大包解析。
    if (req.method === "DELETE" && /^\/helper\/release_port\/?$/i.test(req.path)) return next()
    const isLogin = req.path.toLowerCase().startsWith("/login")
    const isPublicIcon = req.method === "GET" && /^\/plugin\/s\/[^/]+\/icon\/?$/i.test(req.path)
    const smallBody = isLogin || isPublicIcon
    const parser = smallBody ? loginParser : apiParser
    // 宿主可能已解析请求体，仍需补查公开接口的大小。
    parser(req, res, error => next(error || (smallBody ? checkSmallBody(req, true) : undefined)))
  })
  // 已登录 POST 保持原有 multipart 支持，不要求插件更换上传路径。
  const upload = createUploadHandler()
  const loginForm = multer({
    limits: { fieldSize: smallBodyLimit, fields: 8, files: 0, parts: 8 },
  }).none()
  router.post(/^\/api(?:\/|$)/i, (req, res, next) => {
    const isLogin = /^\/api\/login(?:\/quick|\/code\/(?:request|check))?\/?$/i.test(req.path)
    // 公开登录端点仅接收小型表单字段，不能借由上传文件写盘。
    const handler = isLogin ? loginForm : upload
    handler(req, res, error => next(error || (isLogin ? checkSmallBody(req) : undefined)))
  })
  app.use(_args.prefix || "/", router)
}

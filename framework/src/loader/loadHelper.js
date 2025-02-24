import express from "express";
import multer from 'multer'
import bodyParser from 'body-parser'

/**
 * 一些辅助工具
 * @param {GuobaApplication} guobaApp
 */
export function useHelper(guobaApp) {
  const {app, _args} = guobaApp
  if (_args.staticPath) {
    // 静态资源
    app.set('views', _args.staticPath)
    app.use(_args.prefix, express.static(_args.staticPath))
  }
  // parse application/json
  app.use(bodyParser.json({limit: '50mb'}))
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
  // 上传文件
  const upload = multer({dest: 'data/upload_tmp/'})
  app.post('*', upload.any(), function (req, res, next) {
    next()
  })
}

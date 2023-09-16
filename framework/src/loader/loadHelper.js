import express from "express";
import multer from 'multer'
import bodyParser from 'body-parser'

/**
 * 一些辅助工具
 * @param app
 * @param staticPath
 */
export function useHelper(app, staticPath) {
  // 静态资源
  app.set('views', staticPath)
  app.use(express.static(staticPath))
  // parse application/json
  app.use(bodyParser.json())
  // 上传文件
  const upload = multer({dest: 'data/upload_tmp/'})
  app.post('*', upload.any(), function (req, res, next) {
    next()
  })
}

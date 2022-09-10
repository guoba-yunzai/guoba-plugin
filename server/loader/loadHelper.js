import multer from 'multer'
import bodyParser from 'body-parser'

/**
 * 一些辅助工具
 * @param app
 */
export function useHelper(app) {
  // parse application/json
  app.use(bodyParser.json())
  // 上传文件
  const upload = multer({dest: 'data/upload_tmp/'})
  app.post('*', upload.any(), function (req, res, next) {
    next()
  })
}

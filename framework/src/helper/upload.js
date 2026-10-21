import fs from "fs"
import path from "path"
import { randomBytes } from "crypto"
import multer from "multer"

/** 已通过鉴权的上传保持原有限制行为，清理中断、拒绝和未使用文件。 */
export function createUploadHandler() {
  const destination = path.resolve("data/upload_tmp")
  fs.mkdirSync(destination, { recursive: true })
  const states = new WeakMap()
  const removeFile = filePath => {
    fs.unlink(filePath, error => {
      if (error && error.code !== "ENOENT") console.error("[Guoba] 清理上传临时文件失败", error)
    })
  }
  const storage = {
    _handleFile(req, file, callback) {
      const state = states.get(req)
      const filename = randomBytes(16).toString("hex")
      const filePath = path.join(destination, filename)
      const output = fs.createWriteStream(filePath, { flags: "wx", mode: 0o600 })
      state.files.add(filePath)
      state.streams.add(output)
      let completed = false
      const done = (error, info) => {
        if (completed) return
        completed = true
        callback(error, info)
      }
      output.once("error", done)
      output.once("finish", () =>
        done(null, {
          destination,
          filename,
          path: filePath,
          size: output.bytesWritten,
        }),
      )
      output.once("close", () => {
        state.streams.delete(output)
        if (!completed) done(new Error("上传已中止"))
        if (state.closed) state.cleanup()
      })
      file.stream.pipe(output)
      if (state.closed) output.destroy(new Error("上传已中止"))
    },
    _removeFile(req, file, callback) {
      fs.unlink(file.path, error => callback(error?.code === "ENOENT" ? null : error))
    },
  }
  const upload = multer({ storage }).any()
  return (req, res, next) => {
    const state = { files: new Set(), streams: new Set(), closed: false }
    states.set(req, state)
    const cleanup = () => {
      state.closed = true
      // 先关闭尚未完成的写入流；Windows 必须等文件句柄关闭后才能删除。
      for (const stream of state.streams) stream.destroy(new Error("上传已中止"))
      if (state.streams.size === 0) {
        for (const filePath of state.files) {
          state.files.delete(filePath)
          removeFile(filePath)
        }
      }
    }
    state.cleanup = cleanup
    req.once("aborted", cleanup)
    res.once("finish", cleanup)
    res.once("close", cleanup)
    upload(req, res, error => {
      if (error || req.aborted || res.destroyed) cleanup()
      next(error)
    })
  }
}

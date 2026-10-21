import fs from "fs"
import path from "path"
import GuobaError from "../../framework/src/components/GuobaError.js"

/** 校验单个目录名，保留中文、空格等已有合法名称。 */
export function validatePathSegment(name, label = "目录名称") {
  if (
    typeof name !== "string" ||
    !name ||
    [".", ".."].includes(name) ||
    path.parse(name).root ||
    /[\0/\\]/.test(name)
  ) {
    throw new GuobaError(`${label}不合法！`)
  }
  return name
}

function isWithinRoot(root, target) {
  let relative = path.relative(root, target)
  return !path.isAbsolute(relative) && relative !== ".." && !relative.startsWith(`..${path.sep}`)
}

/**
 * 将路径限制在指定根目录内，并校验已存在的父路径，防止符号链接越界。
 * @param {string} root 根目录
 * @param {string} targetPath 绝对路径或根目录内的相对路径
 * @returns {string} 校验后的绝对路径
 */
export function resolvePathWithinRoot(root, targetPath) {
  if (typeof targetPath !== "string" || !targetPath || targetPath.includes("\0")) {
    throw new GuobaError("路径不合法！")
  }
  let rootPath = path.resolve(root)
  let target = path.resolve(rootPath, targetPath)
  if (!isWithinRoot(rootPath, target)) {
    throw new GuobaError("不允许访问根目录之外的路径！")
  }
  let existing = target
  while (true) {
    try {
      fs.lstatSync(existing)
      break
    } catch (error) {
      if (error.code !== "ENOENT" || existing === rootPath) {
        throw error
      }
      existing = path.dirname(existing)
    }
  }
  if (!isWithinRoot(fs.realpathSync(rootPath), fs.realpathSync(existing))) {
    throw new GuobaError("不允许通过符号链接访问根目录之外的路径！")
  }
  return target
}

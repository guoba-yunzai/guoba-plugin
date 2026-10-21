import os from "os"
import fs from "fs"
import path from "path"
import { Service, GuobaError } from "#guoba.framework"
import { mkdirSync } from "#guoba.utils"
import { diskInfo } from "#guoba.libs"
import { liteToken } from "./model/tokens.js"
import { resolvePathWithinRoot, validatePathSegment } from "../../../utils/safePath.js"

const { GI } = Guoba.createImport(import.meta.url)
const { useMenuList } = await GI("./model/menus/index.js")

export class SystemService extends Service {
  async queryMenus() {
    return await useMenuList()
  }

  getLiteToken() {
    return liteToken
  }

  /**
   * 创建目录
   * @param parentPath
   * @param dirName
   */
  createDir(parentPath, dirName) {
    validatePathSegment(dirName)
    if (typeof parentPath !== "string" || !parentPath || !fs.statSync(parentPath).isDirectory()) {
      throw new GuobaError("父目录不存在！")
    }
    // 管理员可选择项目外目录和目录链接，但新目录不能脱离选定的父目录。
    parentPath = fs.realpathSync(parentPath)
    let joinPath = resolvePathWithinRoot(parentPath, dirName)
    if (fs.existsSync(joinPath)) {
      throw new GuobaError("目录已存在！")
    }
    return mkdirSync(joinPath)
  }

  /**
   * 获取文件系统树根路径
   * @returns {Promise}
   */
  async getFsTreeRoot() {
    if (os.platform().toLowerCase() === "linux") {
      return [{ title: "/", path: "/", isLeaf: false, children: null }]
    }
    return (await diskInfo.getDrives()).map(drive => ({
      title: drive.volumeName ? `${drive.volumeName}（${drive.mounted}）` : drive.mounted,
      path: drive.mounted + "\\",
      isLeaf: false,
      children: null,
    }))
  }

  /**
   * 获取文件系统树根路径
   * @param parentPath 父级路径
   * @param onlyDir 是否只返回目录
   * @returns {Promise}
   */
  async getFsTreeChildren(parentPath, onlyDir = true) {
    if (!fs.existsSync(parentPath)) {
      throw new GuobaError("目录不存在！")
    }
    let children = []
    for (const childName of fs.readdirSync(parentPath)) {
      let child = {
        title: childName,
        path: path.join(parentPath, childName),
        isLeaf: false,
        children: null,
      }
      let stat
      try {
        stat = fs.statSync(child.path)
      } catch {
        // 无权限的直接跳过
        continue
      }
      if (stat.isFile()) {
        if (onlyDir) continue
        child.isFile = true
        child.isLeaf = true
      }
      children.push(child)
    }
    return children
  }
}

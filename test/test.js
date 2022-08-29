import path from 'path'
import jwt from 'jsonwebtoken'
import lodash from 'lodash'
import fetch from 'node-fetch'
// import * as cheerio from 'cheerio'
//
// async function testGetGitHistory() {
//   let filePath = 'index.js'
//   let repoUrl = 'yoimiya-kokomi/miao-plugin'
//   let reqUrl = `https://gitee.com/${repoUrl}/commits/master/${filePath}`
//   let headers = {
//     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
//   }
//   const response = await fetch(reqUrl, {headers})
//   let text = await response.text()
//   console.log(text)
//   let $ = cheerio.load(text)
//   console.log($('#commits-list'))
//   let timeAgo = $('#commits-list .commit-content .commit-meta .timeago')
//   console.log(timeAgo)
//   console.log(timeAgo.text())
//   console.log(timeAgo.prop('title'))
// }

async function testGetGitHistory() {
  // let filePath = 'index.js'
  let filePath = 'tools/reli-data-sprider.js'
  let suffix = '/yoimiya-kokomi/miao-plugin'
  let url = `https://gitee.com/${suffix}/blob/master/${filePath}`
  let headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
  }
  const response = await fetch(url, {headers})
  let text = await response.text()
  let reg = /<span class='timeago commit-date' title='(.*)'>/
  let match = text.match(reg)
  let [, time] = match
  reg = new RegExp(`<a href="(${suffix}/commit/.*)">(.*)</a>`)
  match = text.match(reg)
  let [, commitUrl, commitMsg] = match
  console.log('更新时间：', time)
  console.log('commitUrl：', commitUrl)
  console.log('commitMsg：', commitMsg)
}

await testGetGitHistory()

process.exit(0)

function randomString(length) {
  let str = ''
  for (let i = 0; i < length; i++) {
    str += lodash.random(36).toString(36)
  }
  return str.substr(0, length)
}

console.log('1: ', Math.random().toString(36).substr(2))
console.log('randomString: ', randomString(999))

console.log('__filename: ', import.meta.url)
console.log('basename: ', path.basename(import.meta.url))

let secret = 'ajgomnhobi23u4b0rew9tf0rabi039wq8rnmq09srknh34hok3480teirjbs'

// 过期时间（秒数）
let expSeconds = 3
// 注册token
let token = jwt.sign({
  exp: Math.floor(Date.now() / 1000) + expSeconds,
  username: 'zhangSan',
}, secret)

await new Promise(resolve => setTimeout(resolve, 1500))

console.log(1, {
  token,
  verify: verifyToken(token),
  time: Math.floor(Date.now() / 1000),
  decode: jwt.decode(token),
})

await new Promise(resolve => setTimeout(resolve, 1500))

console.log(2, {
  token,
  verify: verifyToken(token),
  time: Math.floor(Date.now() / 1000),
  decode: jwt.decode(token),
})

function verifyToken(token) {
  try {
    jwt.verify(token, secret)
    return true
  } catch (e) {
    console.error('jwt: ', e.message)
    return false
  }
}
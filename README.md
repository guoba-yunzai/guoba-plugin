# Guoba-Plugin

`Guoba-Plugin`是`Yunzai-Bot`的扩展插件，主要提供后台管理界面。

> 目前仅支持V3版本的Yunzai

具体功能可在安装插件后，通过发送`#锅巴帮助`来进行查看。

## 已实现的功能

- [x] 主人登录
- [x] 更新插件
- [x] 自动升级
- [x] 配置文件管理
- [x] plugin插件管理
    - [x] plugin插件配置

[TODO代办](https://gitee.com/guoba-yunzai/resources/blob/master/other/TODO.md)

## 安装插件

1. 在BOT根目录下打开终端，运行

```
git clone --depth=1 https://gitee.com/guoba-yunzai/guoba-plugin.git ./plugins/Guoba-Plugin/
```

2. 安装依赖

如果你是使用`pnpm`安装的云崽，那就只需要在云崽根目录执行下`pnpm install`即可

如果你是用普通的npm或者cnpm，那就需要安装以下依赖：

```bash
npm install multer
npm install body-parser
npm install jsonwebtoken
```

3. 依赖安装完毕之后，直接运行即可，默认运行端口号是：50831
   > 可在 config/application.yaml 中修改

4、启动完成之后，可以在控制台中看到网页地址，复制到浏览器中即可访问。

## 更新插件

一般会自动更新，如需手动更新，请发送`#锅巴更新`指令

# 功能预览

- 主界面
![001](./resources/images/readme/001.png)

- 查看插件README
![002](./resources/images/readme/002.png)

- 基础配置
![003](./resources/images/readme/003.png)

- 群组配置
![004](./resources/images/readme/004.png)

# 免责声明

1. 功能仅限内部交流与小范围使用，严禁将Guoba-Plugin用于任何商业用途或盈利
2. 图片与其他素材均来自于网络，仅供交流学习使用，如有侵权请联系，会立即删除

# 其他

- 最后求个个star或者[爱发电](https://afdian.net/a/zolay-poi)
  你的支持是维护本项目的动力~

* Yunzai-Bot
    - [gitee](https://gitee.com/Le-niao/Yunzai-Bot)
    - [github](https://github.com/Le-niao/Yunzai-Bot)
* Yunzai插件索引
    - [gitee](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)
    - [github](https://github.com/yhArcadia/Yunzai-Bot-plugins-index)
* Miao-Plugin
    - [gitee](https://github.com/yoimiya-kokomi/miao-plugin)
    - [github](https://github.com/yoimiya-kokomi/miao-plugin)

# onface/project

## Install

- [安装 yarn](https://yarnpkg.com/zh-Hans/docs/install)

```shell
# 你可以将 yarn切换 taobao 源
# yarn config set registry https://registry.npm.taobao.org
yarn global add fis3 babel-core babel-watch webpack@4
```

```shell
yarn install
```

## File Directory Description

### basic

```s
# 编译
compile/
# 发布配置
deploy/
# 模块
m/
	# 数据模拟服务器
	m/mock/
# 默认页面
view/
# 移动端页面
view_mobile/
# redux示例页面
view_mobile/
# 用户编译配置（可自行根据项目进行适当更改）
compile.js 	# 默认
# 编译后的文件目录
output/
```


## Develop

### default

```shell
npm run dev
npm run js
npm run s
```

### mobile

> mobile use rem

[onface/less-rem](https://github.com/onface/less-rem)  
[m/base/rem/README.md](./m/base/rem/README.md)

```shell
npm run dev
npm run js
mode=mobile npm run s
```

### redux

```shell
npm run dev
npm run js
mode=redux npm run s
```

## Manual

> 必须阅读

1. [m/base/README.md](./m/base/README.md)
2. [m/icons/README.md](./m/icons/README.md)

## Deploy

> 安装cpy-cli

```shell
yarn global add cpy-cli
```

```shell
# 打包生产环境代码
npm run online
# 更新 svn (每个项目只需要运行一次)
sh ./deploy/svn-co.sh
# 发布
sh ./deploy/svn.sh
```

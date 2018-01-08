# onface/project

[Mock server console](/fms/)

[module](./m/README.md)

## Install

- [安装 yarn](https://yarnpkg.com/zh-Hans/docs/install)
- [Install yarn](https://yarnpkg.com/en/docs/install)

```shell
# 你可以将 yarn切换 taobao 源
# yarn config set registry https://registry.npm.taobao.org
yarn global add fis3 nodemon webpack@1.13.2
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
# 数据路由模拟
mock/
	default/	# 默认
	mobile/		# 移动端
	render/		# php渲染脚本
# 默认视图
view/	
# 移动端视图
view_mobile/
# 用户编译配置（可自行根据项目进行适当更改）
compile.js 	# 默认
# 用户编译配置
compile-mobile.js 	# 移动端
```


## Develop
> 暂时不要同时运行多环境

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
npm run dev:m
npm run js:m
npm run s:m
```

## Manual

> 必须阅读

1. [m/base/README.md](./m/base/README.md)
2. [m/icons/README.md](./m/icons/README.md)

## Deploy

> 安装cpy-cli

```shell
npm install -g cpy-cli
## or yarn global add cpy-cli
```

```shell
# 打包生产环境代码
npm run online
# 发布
npm run dp
```

















































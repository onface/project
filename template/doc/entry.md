# entry

onface-project 使用 [webpack](http://webpack.js.org/) 作为 JS 构建工具。

`entry` 用来配置 `JavaScript` 页面入口文件。

> 页面入口文件的定义是：项目中会将 JS 按页面划分文件，但**不是每个JS文件都需要在页面中**通过 `<script>` 加载。只有在页面中被直接加载的文件才是页面入口文件、

`entry` 的默认配置是

```js
entry: [
    `{${process.env.e || 'view,view_**,m'},_}/**/**entry.js`
]
```

> ,_ 是为了兼容 glob 语法，防止出现 `{view}/**/**entry.js` 导致的无法匹配，`{view,m}/**/**entry.js` 可以正常匹配 `view/` 目录下以 `entry.js` 为后缀的 JS 文件。

默认运行 `npm run js` 运行时 entry 配置是

```js
[
    "{view,view_**,m,_}/**/**entry.js"
]
```


> `{` `}` `*` `,` 等符号是 [glob](http://fis.baidu.com/fis3/docs/api/config-glob.html) 语法

项目代码越来越多时，开发阶段编译所有页面入口文件会变得很慢。

使用 `process.env.e` 可以只编译部分文件从而达到提速的目的。

## process.env.e

当只需要开发 `view/react/index.html` 页时，运行 `e=view/react npm run js` 会赋值 `process.env.e`

此时 `entry` 在运行时将变成

```js
[
    "{view/react,_}/**/**entry.js"
]
```

## release.default.entry

`release.default.entry` 和 `release.mobile.entry` 是发布阶段的页面入口文件配置。

分别对应运行  `npm run release` 和 `compile=mobile npm run release` 时候的页面入口文件

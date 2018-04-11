# entry

`entry` 用来配置 `JavaScript` 入口文件。项目中会将 JS 按功能划分文件，但不是每个文件都需要在页面中通过 `<script>` 引用或异步加载使用。

并且配置 `entry` 后编译速度大幅度提高。

`entry` 的默认配置是

```js
[
    '{view,view_**,m}/{common,common_**}/**entry.js',
    `{view,view_**,m}/${process.env.e || '**'}/**entry.js`
]
```

> `{` `}` `*` `,` 等符号是 [glob](http://fis.baidu.com/fis3/docs/api/config-glob.html) 语法

## process.env.e

`process.env.e` 是 `e=example npm run js` 中的 `"example"`

如果运行时候配置了 `e=example` `entry` 在运行时将变成

```js
[
    '{view,view_**,m}/{common,common_**}/**entry.js',
    "{view,view_**,m}/example/**entry.js"
]
```

没有配置在运行时会变成

```js
[
    '{view,view_**,m}/{common,common_**}/**entry.js',
    "{view,view_**,m}/**/**entry.js"
]
```

项目代码越来越多时，开发阶段编译所有入口文件会变得很慢。

使用 `process.env.e` 可以值编译部分文件从而达到提速的目的。

## online.default.entry

`online.default.entry` 和 `online.mobile.entry` 是发布阶段的入口配置。

分别对应运行  `npm run online` 和 `compile=mobile npm run online` 时候的入口

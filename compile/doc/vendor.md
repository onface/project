# vendorFile

[entry](./entry.md) 中提到：根据 entry 配置的页面入口文件会被 webpack编译。

没有在 entry 配置中的 JS 文件不会被编译，也不会生成到 `output/` 目录下。

有时候项目选中需要引入一些第三方 JS 代码，这些代码不需要被 webpack 编译。需要直接在页面中引用。

这些文件应该配置在 `vendor` 中。

`vendor` 的默认配置是：

```js
vendor: [
    'm/base/rem/meta.js',
    'm/vendor/**'
]
```

`m/base/rem/meta.js` 是用来实现 rem 的，需要在 `<head>` 中加载运行。所以需要单独存放。不适合放在 `view/common/entry.js` 中，并且不需要 webpack 编译。放在 `vendor` 配置中最合适。

相关链接：[less-rem](https://github.com/onface/less-rem)

`m/vendor/**` 是为了方便，第三方的文件都放在 `m/vendor/` 目录下就不需要经常修改  `compile.js` 中的 `vendor`参数了。

**`entry` `vendor`** 配置不包含的 JS 文件开发阶段和线上编译阶段都不能在页面中引用。

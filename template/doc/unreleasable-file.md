# unreleasable-file

unreleasable file 是 [fis](http://fis.baidu.com/) 提供的概念。在 `compile/fis-conf.js` 中配置了

```js
.match('glob规则', {
    release: false
})
```

`release: false` 控制了这些文件不会**产出到 `output/` 目录，也无法在其他文件中被引用**。

---

除了 [entry](./entry.md) 和 [vendor](./vendor.md) 配置包含的文件。

**开发阶段：**

所有的 JS 文件属于 unreleasable file。（为了提高 webpack 编译速度，不编译非入口文件）

**部署阶段：**

因为 `compile.js` 的 `online`中默认配置了：

```js
unreleasable: [
    '**.md',
    'm/**/**.{less,css}'
]
```

并且非 `entry.js` 后缀的 JS 文件都属于 unreleasable file，  
所以`m/` 目录下的 `css,less,js` 都属于 unreleasable file。 （模块的文本代码资源都应该通过 `{view,view_**}/**.{js,css}` 引用，图片除外）

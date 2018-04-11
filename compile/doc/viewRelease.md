# viewRelease

[entry](./entry.md) 用于配置哪些 JS 文件被编译生成到磁盘， `viewRelease` 用于配置**发布阶段**哪些非 JS 文件被编译生成到磁盘。


`viewRelease` 的默认配置一般是

`['view/**']` `['view_dirname/**']` `['view_mobile/**']`

值所以是个数组，是因为你可以这样配置

```js
[
    'view/index/**',
    'view/login/**',
    'view/common/**'
]
```
但一般情况下，我们统一配置为 `[view/**]` 就可以了。

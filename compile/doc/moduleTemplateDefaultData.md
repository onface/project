# moduleTemplateDefaultData


模块默认模板数据

可以配置 `m/` 文件夹下的所有 `*.md` 文件的默认渲染数据。

这个数据是

比如 `m/base/rem/README.md` 自定义了

```html
<!-- MR-D{tpl: 'view_mobile'} -->
```

那么在 `http://127.0.0.1:{port}/m/base/rem/README.html` 是以 `m/template.html` 作为模板渲染
渲染数据是

```js
{
    tpl: 'view_mobile'
}
```

这样就能让页面使用 `view_mobile/` 的公用头底

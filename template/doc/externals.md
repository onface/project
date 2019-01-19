# externals


[外部扩展(Externals)](https://doc.webpack-china.org/configuration/externals/)

`externals` 可以将底层库或文件体积大的库缓存，从而达到减少JS文件体积的目的。

通过 `externals` 配置

```js
{
   'jquery': 'jQuery',
   'react': 'React',
   'react-dom': 'ReactDOM',
   'vue': 'Vue'
}
```

则可以将 `var React = require('react')` 在发布阶段编译成 `var React = window.React`。

再结合 `expose-loader` 。

```js
// view/common/entry.js
require('!expose-loader?React!react')
require('!expose-loader?ReactDOM!react-dom')
require('!expose-loader?jQuery!jquery')
require('!expose-loader?Vue!vue')
```
页面引用 `/view/common/entry.js` 将会在 `window` 增加全局变量 `React` `ReactDOM` `jQuery` `Vue`

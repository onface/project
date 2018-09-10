# clear


 `.CLEAR` 的用途是替代 .clearifx 等工具类，在 html 中增加 `.clearifx` 会增加代码维护难度。

 ```less
.wrap {
    .CLEAR; // 清除浮动
}
.wrap-sidebar {
    float: left;
}
.wrap-content {
    float: right;
}
 ```

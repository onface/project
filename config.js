const LessPluginFunctions = require('less-plugin-functions');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');


module.exports = {
	// 需编译的文件入口
	entry: [
		'{view_,m}**/**/*{entry.js,.vue}'
	],
	vendorFile: ['m/base/rem/meta.js'] , // 直接产出不需编译
	relative: false ,  // true : 让fis3产出能够支持相对路径
	moduleTemplateDefaultData:{
		type:'pc', // 模块开发模板预览 默认类型pc
	},
	less: {
		plugins: [
			// less中支持自定义函数
            new LessPluginFunctions() , 
            // 浏览器私有属性前缀补全 
            new LessPluginAutoPrefix({
                browsers: ["not ie < 8"]
            }) 
        ]
	}
}
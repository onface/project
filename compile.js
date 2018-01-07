const LessPluginFunctions = require('less-plugin-functions');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');


module.exports = {
	// 需编译的文件入口
	entry: [
		'{view,view_,m}**/**/**entry.js'
	],
	vendorFile: ['m/base/rem/meta.js'] , // 直接产出不需编译
	// 需要css module的文件
	cssModules:{
		less:/\-m\.less$/,
		css:/\-m\.css$/,
	},
	relative: false ,  // true : 让fis3产出能够支持相对路径
	moduleTemplateDefaultData:{
		type:'view',
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
	},
	babel:{
		"presets": [
			"es2015"
		],
		"plugins": [
			"react-hot-loader/babel",
			[
				 "transform-react-jsx",
				 {"pragma": "require(\"react\").createElement"}
			],
			"transform-flow-strip-types",
			"syntax-flow",
			"syntax-jsx",
			"transform-react-display-name",
			"transform-decorators-legacy",
			"transform-class-properties"
		]
	},
	online:{
		useHash:true
	}
}

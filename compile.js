const LessPluginFunctions = require('less-plugin-functions');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');

module.exports = {
	// 需编译的文件入口
	entry: [
		'{view,m}/**/**entry.js'
	],
	vendorFile: ['m/base/rem/meta.js'] , // 直接产出不需编译
	// 需要css module的文件
	cssModules:{
		less:/\-m\.less$/,
		css:/\-m\.css$/,
	},
	fis: function (fis) {

	},
	online: {
		domain: '/',
		hash: false,
		relative: false,
	},
	moduleTemplateDefaultData:{
		type:'view',
	},
	less: {
		plugins: [
            new LessPluginFunctions() ,
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
	}
}

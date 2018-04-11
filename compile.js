const LessPluginFunctions = require('less-plugin-functions');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
var mode = process.env.compile || 'default'

module.exports = {
	// 开发阶段 JS 文件入口 /compile/doc/entry.md
	entry: [
		'{view,view_**,m}/{common,common_**}/**entry.js',
		`{view,view_**,m}/${process.env.e || '**'}/**entry.js`
	],
	// 发布阶段配置
	online: {
		'default': {
			// /compile/doc/entry.md#online.default.entry
			entry: ['view/**/**entry.js'],
			// /compile/doc/viewRelease.md
			viewRelease: ['view/**'],
			domain: '/',
			hash: false,
			noHashFile: [
				'**.html'
			],
			relative: false,
			compress:false,
			externals: {
			   'jquery': 'jQuery',
			   'react': 'React',
			   'react-dom': 'ReactDOM',
			   'vue': 'Vue'
		    }
		},
		mobile: {
			entry: ['view_mobile/**/**entry.js'],
			viewRelease: ['view_mobile/**'],
			domain: '/',
			hash: false,
			noHashFile: [
				'**.html'
			],
			relative: false,
			compress:false,
			externals: {
			   'jquery': 'jQuery',
			   'react': 'React',
			   'react-dom': 'ReactDOM',
			   'vue': 'Vue'
		    }
		}
	},
	fis: function () {

	},
	// 过滤文件
	ignoreFile: [
	    'm/template.html',
	    '**.vue',
	    'deploy/**',
	    'compile/**',
	    'mock/**',
	    'package.json',
	],
	// 直接产出不需要编译
	vendorFile: [
		'm/base/rem/meta.js'
	],
	// css modules
	// http://www.ruanyifeng.com/blog/2016/06/css_modules.html
	cssModules:{
		less:/\-m\.less$/,
		css:/\-m\.css$/,
	},
	moduleTemplateDefaultData:{
		tpl:'view',
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

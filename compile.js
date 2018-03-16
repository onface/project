const LessPluginFunctions = require('less-plugin-functions');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
var mode = process.env.compile || 'default'

var domainMap =
module.exports = {
	// 需编译的js文件入口
	entry: [
		'{view,view_**,m}/**/**entry.js'
	],
	online: {
		'default': {
			entry: ['view/**/**entry.js'],
			viewRelease: 'view/**',
			domain: '/',
			hash: false,
			relative: false,
			externals: {
			   'jquery': 'jQuery',
			   'react': 'React',
			   'react-dom': 'ReactDOM',
			   'vue': 'Vue'
		    },
			uglify: true,
		},
		mobile: {
			entry: ['view_mobile/**/**entry.js'],
			viewRelease: 'view_mobile/**',
			domain: '/',
			hash: false,
			relative: false,
			externals: {
			   'jquery': 'jQuery',
			   'react': 'React',
			   'react-dom': 'ReactDOM',
			   'vue': 'Vue'
		    },
			uglify: true,
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

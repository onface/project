const LessPluginFunctions = require('less-plugin-functions')
const LessPluginAutoPrefix = require('less-plugin-autoprefix')
const extend = require('safe-extend')
module.exports = {
	name: '{{ name }}',
	// 开发阶段入口文件
	entry: [
		`{${process.env.e || 'view,view_**,m'},_}/**/**entry.js` // 后缀必须使用 entry.js
	],
	// 不需要 webpack 编译但是需要在页面使用 <script> 引用的文件
	vendor: [
		'm/base/rem/meta.js',
		// 	vendor 中不要包含 md,如果一定要包含
		// 	请删除  online[mode].release.unreleasable 中的 md 匹配规则
		'm/vendor/**/**!(.md)'
	],
	// 发布阶段配置
	online: {
		// view/**
		default: onlineConfig(),
		// view_mobile/**
		mobile: onlineConfig(),
		// view_redux/**
		redux: onlineConfig()
	},
	moduleTemplateDefaultData:{
		tpl: 'view',
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
			"@babel/preset-env",
			"@babel/preset-react"
		],
		"plugins": [
			"react-hot-loader/babel",
			"@babel/plugin-transform-runtime",
		    "@babel/plugin-proposal-class-properties",
		    "@babel/plugin-proposal-object-rest-spread",
		    "@babel/plugin-syntax-dynamic-import",
		    ["@babel/plugin-proposal-decorators", { "legacy": true }]
		]
	},
	fis: function (fis) {
		// fis.match('*.css',
		//   useSprite: true
		// })
	},
	webpackConfigDev: function (webpackConfig) {
		return webpackConfig
	},
	webpackConfigOnline: function (webpackConfig) {
		return webpackConfig
	},
	ignore: [
	    'm/template.html',
	    '**.vue',
	    'deploy/**',
	    'compile/**',
	    'mock/**',
	    'package.json',
		'nodemon.json',
		'yarn.lock',
		'Dockerfile',
		'output_online'
	]
}
function onlineConfig(config) {
	config = config || {}
	return extend(
		{
			domain: '/',
			// 不会被编译到 output/ 目录的文件。
			// （无法在html中加载文件调用，但可以在 css 中 import 或在 JS 中 import require)
			// entry vendor 文件除外
			unreleasable: [
				'**.md',
				'm/**/**.{less,css}'
			],
			hash: false,
			hashIgnore: [ '**.html', 'fis-source-map.json' ],
			relative: false,
			compress:false,
			externals: {
			   'jquery': 'jQuery',
			   'react': 'React',
			   'react-dom': 'ReactDOM',
			   'vue': 'Vue'
			}
		},
		config
	)
}

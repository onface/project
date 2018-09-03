const LessPluginFunctions = require('less-plugin-functions');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
var mode = process.env.compile || 'default'
module.exports = {
	// 开发阶段入口配置
	entry: [
		`{${process.env.e || 'view,view_**,m'}}/**/**entry.js`
	],
	// 发布阶段配置
	online: {
		'default': {
			entry: ['view/**/**entry.js'],
			viewRelease: ['view/**'],
			domain: '/',
			hash: true,
			noHashFile: [
				'**.html',
				'fis-source-map.json'
			],
			relative: false,
			compress:true,
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
				'**.html',
				'fis-source-map.json'
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
	fis: function (fis) {
		// fis.match('*.css',
		//   useSprite: true
		// })
	},
	ignoreFile: [
	    'm/template.html',
	    '**.vue',
	    'deploy/**',
	    'doc/**',
	    'compile/**',
	    'mock/**',
	    'package.json',
		'nodemon.json',
		'yarn.lock',
		'Dockerfile',
		'output_online'
	],
	vendorFile: [
		'm/base/rem/meta.js'
	],
	cssModules:{
		less:/\.\m\.less$/,
		css:/\.\m\.css$/,
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
	webpackConfigDev: function (webpackConfig) {
		return webpackConfig
	},
	webpackConfigOnline: function (webpackConfig) {
		return webpackConfig
	}
}

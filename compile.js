const LessPluginFunctions = require('less-plugin-functions');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
var mode = process.env.compile || 'default'
module.exports = {
	// 开发阶段入口文件
	entry: [
		`{${process.env.e || 'view,view_**,m'}}/**/**entry.js`
	],
	// 不需要 webpack 编译但是需要在页面使用 <script> 引用的文件
	vendor: [
		'm/base/rem/meta.js',
		'm/vendor/**'
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
	],
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

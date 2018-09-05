const LessPluginFunctions = require('less-plugin-functions');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
module.exports = {
	// 开发阶段入口文件
	entry: [
		`{${process.env.e || 'view,view_**,m'},_}/**/**entry.js`
	],
	// 不需要 webpack 编译但是需要在页面使用 <script> 引用的文件
	// vendor 中不要包含 md,如果一点要包含
	// 请删除  online[mode].release.unreleasable 中的 md 匹配规则
	vendor: [
		'm/base/rem/meta.js',
		'm/vendor/**/**!(.md)'
	],
	// 发布阶段配置
	online: {
		// view/**
		default: {
			domain: '/',
			release: {
				// 不会被编译到 output/ 目录的文件，
				// entry vendor 文件除外
				unreleasable: [
					'{view,view_**}/**',
					'**.{md,js}',
					'm/**/**.{less,css}'
				],
				// view/ 下的  entry.js 后缀的文件会被编译
				releasable: [ '**/**entry.js' ]
			},
			hash: true,
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
		// view_mobile/**
		mobile: {
			domain: '/',
			release: {
				unreleasable: [
					'{view,view_**}/**',
					'**.{md,js}',
					'm/**/**.{less,css}'
				],
				releasable: [ '**/**entry.js' ]
			},
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
		// view_redux/**
		redux: {
			domain: '/',
			release: {
				unreleasable: [
					'{view,view_**}/**',
					'**.{md,js}',
					'm/**/**.{less,css}'
				],
				releasable: [ '**/**entry.js' ]
			},
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
		}
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

const LessPluginFunctions = require('less-plugin-functions')
const LessPluginAutoPrefix = require('less-plugin-autoprefix')
module.exports = {
	name: '{{ name }}',
	// 开发阶段入口文件
	entry: [
		`{${process.env.e || 'view,view_**,m'},_}/**/**entry.js` // 后缀必须使用 entry.js
	],
	// 不需要 webpack 编译但是需要在页面使用 <script> 引用的文件
	vendor: [
		'm/base/rem/meta.js',
		'm/vendor/**/**',
	],
	// 发布阶段配置
	release: {
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
		sourceMap: 'source-map', // or false
		externals: {
		   'jquery': 'jQuery',
		   'react': 'React',
		   'react-dom': 'ReactDOM',
		   'vue': 'Vue'
		}
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
	moduleTemplateDefaultData:{
		tpl: 'view',
	},
	ignore: [
	    'm/template.html',
	    '**.vue',
		'*.log',
	    'deploy/**',
	    'compile/**',
	    'mock/**',
	    'package.json',
		'nodemon.json',
		'yarn.lock',
		'Dockerfile',
		'output_release',
		'doc/**'
	]
}

// // compile.default.js
// module.exports = function (config, info) {
//   // webpack js 文件入口
//   config.entry = {
//     dev: `{view,m}/**/**entry.js`,
//     release: `view/**/**entry.js`
//   }
//   // 编译哪些非 js 文件
//   config.releasable = {
//     dev: `{view,m}/**`,
//     release: [
//       `view/**`,
//       `m/**/**.!(md|less|css|vue)`
//     ]
//   }
//   // 不需要走webpack或 less 编译的第三方库文件
//   config.vendor = [
//     'm/base/rem/meta.js',
//     'm/vendor/**'
//   ]
//   // 静态资源页面路径
//   config.domain = {
//     dev: '/',
//     release: '/'
//   }
//   // 文件 hash 是否压缩 sourceMap
//   config.release = {
//     hash: false,
//     compress: false,
//     sourceMap: 'source-map'
//   }
//   // less 配置
//   config.less = {
//     plugins: [
//         new LessPluginFunctions() ,
//         new LessPluginAutoPrefix({
//             browsers: ["not ie < 8"]
//         })
//     ]
//   }
//   // babel 配置
//   config.babel = {
//     "presets": [
//       "@babel/preset-env",
//       "@babel/preset-react"
//     ],
//     "plugins": [
//       "react-hot-loader/babel",
//       "@babel/plugin-transform-runtime",
//         "@babel/plugin-proposal-class-properties",
//         "@babel/plugin-proposal-object-rest-spread",
//         "@babel/plugin-syntax-dynamic-import",
//         ["@babel/plugin-proposal-decorators", { "legacy": true }]
//     ]
//   }
//   // markrun 配置
//   config.markrun = {
//     templateDefaultData: {
//       tpl: 'view'
//     }
//   }
//   // 哪些文件永远不会编译
//   config.ignore = [
//     'm/template.html',
//     '**.vue',
//     '*.log',
//     'deploy/**',
//     'compile/**',
//     'mock/**',
//     'package.json',
//     'nodemon.json',
//     'yarn.lock',
//     'Dockerfile',
//     'output_release',
//     'doc/**'
//   ]
//   return config
// }
// // webpack.config.js
// // webpack.release.config.js

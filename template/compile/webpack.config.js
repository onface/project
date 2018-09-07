const path = require('path')
const fs = require('fs')
const glob = require("glob")
const config = require('./getConfig.js')()
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


// 扫描获取所有js文件列表
var entryFiles = []
config.user.entry.forEach(function(fileReg){
	entryFiles = entryFiles.concat(glob.sync(fileReg) || [])
})
var entryMap = {}
entryFiles.forEach(function(filePath){
	entryMap[filePath] = [
		'./' + filePath,
		'webpack-hot-middleware/client'
	]
})
if (JSON.stringify(entryMap) === '{}') {
	console.log('⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄')
	throw new Error(`compile/webpack.config.js: must have entry\r\n entry: ${JSON.stringify(config.user.entry)}`)
}
function filterName(file) {
	let pathName = '[path]'
	if (/node_modules/.test(file)) {
		pathName = config.viewPath + '/[path]'
	}
	var hashName = ''
	if (config.user.online[config.mode].hash) {
		hashName = '_[hash:7]'
	}
	return `${pathName}[name]${hashName}.[ext]`
}
const webpackConfig =  {
	mode: 'development',
	entry: entryMap,
	output: {
		path: path.resolve(__dirname, '../output'),
		publicPath: '/',
	    chunkFilename: config.viewPath + '/__chunk/[id].js',
	    filename: '[name]',
	},
	module: {
	    rules: [
			{
		        test: /\.css$/,
		        use:[
			        'style-loader',
			        'css-loader',
			        {
			            loader:"postcss-loader",
			            options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
			                plugins: (loader) => [
			                    require('autoprefixer')(), //CSS浏览器兼容
			                ]
			            }
			        }
		        ]
		    },
 	        {
		        test: /\.vue$/,
		        use: 'vue-loader',
		        exclude: /node_modules/,
		    },
		    {
		        test: /\.js$/,
		        loader: 'babel-loader',
		        options: config.user.babel ,
		        exclude: /node_modules/
		    },
		    {
		    	test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'less-loader',
						options: {
							plugins: config.user.less.plugins
						}
					}
				],
		        exclude: /node_modules/,
		    },
			{ test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1,
							minetype: 'application/font-woff',
							name: filterName
						}
					}
				]
			},
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1,
							minetype: 'application/octet-stream',
							name: filterName
						}
					}
				]
			},
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: filterName
						}
					}
				]
			},
		    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1,
							minetype: 'image/svg+xml',
							name: filterName
						}
					}
				]
			},
		    { test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1,
							name: filterName
						}
					}
				]
			},
		    { test: /\.json$/, loader: 'json-loader' }
	    ],
	},
	/*
		Question : [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build. (found in <Root>)
		Official Explanation : 运行时构建不包含模板编译器，因此不支持 template 选项，只能用 render 选项，但即使使用运行时构建，在单文件组件中也依然可以写模板，因为单文件组件的模板会在构建时预编译为 render 函数。
		Reference : http://www.imooc.com/article/17868
		Brief : 官方提供了多版本 , 默认使用的不是开发版 , 添加别名解决这一问题
	*/
	resolve: {
		alias: {
			'vue': 'vue/dist/vue.js'
		}
	},
	devServer:{
		historyApiFallback:true,
	    overlay: true, // 在编译出错的时候，在浏览器页面上显示错误
	    hot: true,
        colors: true
	},
	plugins:[
		new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
    ]
	// ,
	// devtool: '#eval-source-map'
}
module.exports = webpackConfig

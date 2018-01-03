const path = require('path');
const fs = require('fs');
const getConfig = require('./getConfig.js')();
const webpack = require('webpack');
var userConfig = require("../compile.js");

 
// 扫描获取所有js文件列表
const glob = require("glob");
var entryFiles = [];
userConfig.entry.forEach(function(fileReg){
	entryFiles = entryFiles.concat(glob.sync(fileReg) || [])
})
var entryMap = {}
entryFiles.forEach(function(filePath){
	entryMap[filePath] = [
		'./' + filePath,
		'webpack-hot-middleware/client'
	]
})
// console.log('entryMap :',entryMap)


const webpackConfig =  {
	entry: entryMap,
	output: {
		path: path.resolve(__dirname, '../output'), // 产出路径
		publicPath: '/',
	    chunkFilename: '__chunk/[name]-[id]-chunk.js', // online : chunkFilename: '__chunk/[name]-[id]-[hash]-chunk.js', 
	    filename: '[name]',
	},
	module: {
	    rules: [
		    {
		        test: /\.json$/,
		        loader: "json-loader"
		    },
			{
		        test: /[^m]\.css$/,
		        // loader: ["style-loader","css-loader","postcss-loader"]
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
		        options: userConfig.babel ,
		        exclude: /node_modules/
		    },
		    {
		    	test: /[^m]\.less$/,
		        loader: ['style-loader','css-loader','less-loader'],
		        exclude: /node_modules/,
		    },
		    {
		    	test:userConfig.cssModules.less,
		        loader: [
			        'style-loader',
			        'css-loader?modules&localIdentName=[local]__[hash:base64:5]',
			        'less-loader',
			        {
			            loader:"postcss-loader",
			            options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
			                plugins: (loader) => [
			                    require('autoprefixer')(), //CSS浏览器兼容
			                ]
			            }
			        }
		        ],
		        exclude: /node_modules/,
		    },
			{
		        test: userConfig.cssModules.css,
		        loader: "style-loader!css-loader?modules&localIdentName=[local]__[hash:base64:5]"
		    },
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
		},
		// extensions: ['*', '.js', '.vue', '.json'] // 配置默认扩展名 
	},
	devServer:{
		historyApiFallback:true,
		// contentBase: path.join(__dirname, "../output"),
	    // port:getConfig.wepbackServerPort,
	    // quiet: false, // true:控制台只输出第一次编译的信息，当你保存后再次编译的时候不会输出任何内容，包括错误和警告
		// noInfo: true, // false : 命令行打印编译信息
	    // compress: true, // true的时候对所有的服务器资源采用gzip压缩
	    overlay: true, // 在编译出错的时候，在浏览器页面上显示错误
	    // stats: "errors-only", // 命令行只打印错误
	    hot: true,
        colors: true,
	    // inline:true
	},
	plugins:[
        // enable HMR globally
        new webpack.HotModuleReplacementPlugin(),
		// prints more readable module names in the browser console on HMR updates
		new webpack.NamedModulesPlugin(),
		// do not emit compiled assets that include errors
		new webpack.NoEmitOnErrorsPlugin()
    ],
	// devtool: '#eval-source-map'
};


module.exports = webpackConfig
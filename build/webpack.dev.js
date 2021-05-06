const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		filename: 'js/[name].[contenthash].js',
		path: path.resolve(__dirname, '../dist')
	},
	devServer: {
		contentBase: './dist',
		// 启动gzip 压缩
		compress: true,
		// 端口号
		port: 8080,
		open: true,
		hot: true,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:10].css',
			chunkFilename: '[id].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.((c|sa|sc)ss)$/i,
				use: [
					"style-loader",
					"css-loader",
					'sass-loader'
				]
			}
		]
	},
});
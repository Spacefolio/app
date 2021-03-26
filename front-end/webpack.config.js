const { O_DIRECT } = require('constants');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
require('dotenv').config();
var webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: process.env.NODE_ENV,
	entry: ['./src/index.tsx'],
	optimization: {
		minimizer: [new UglifyJsPlugin({ parallel: true })],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
			},
			{
				test: /\.(scss|css)$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|jp2|webp)$/,
				loader: 'file-loader',
				options: {
					name: 'images/[name].[ext]',
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg|otf)$/,
				loader: 'url-loader?limit=100000',
			},

			{
				test: /\.(tsv|dsv)$/,
				loader: 'dsv-loader',
			},
		],
	},
	plugins: [
		new CheckerPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new webpack.DefinePlugin({
			API_DOMAIN: JSON.stringify(
				process.env.NODE_ENV == 'DEVELOPMENT'
					? process.env.DEV_SERVER_IP || 'http://localhost:4000'
					: '/api'
			),
			DEV_SERVER: JSON.stringify(process.env.NODE_ENV),
		}),
	],
	devServer: {
		historyApiFallback: true,
	},
	externals: {},
};

const path = require('path');
const webpack = require('webpack');
// const generalEntries = require('./generalEntries');

// extract text from a bundle into a separate file
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
//cp dir/files to build dir
const copyWebpackPlugin = require('copy-webpack-plugin');
// shows notifications for wp build errors/warnings
const WebpackBuildNotifierPlugin = require('webpack-notifier');

// post css plugin parses css/ adds vendor prefixes
const autoprefixer = require('autoprefixer');

const merge = require('webpack-merge');
const modules = ['./node_modules'];

const BUILD_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

const SOURCE_MAP = process.env.SOURCE_MAP === 'true';

const isProd = process.env.NODE_ENV === 'production';
const version = require('./package.json').version;

const isCommon = {
	resolve: { modules, extensions: ['.js', '.jsx'] },
	context: process.cwd(),
	node: { __filename: true },
	entry: path.join(SRC_DIR, 'js', 'index.jsx'),
	devServer: {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': 'content-type, X-LVS-PriceFormat, X-LVS-HSToken',
			'Access-Control-Expose-Headers': 'X-LVS-HSToken',
		},
		proxy: {
			'/fdjgs/api': {
				target: 'https://mex-master-test.lvs.co.uk:8443',
				pathRewrite: { '^/fdjgs/api': '/abp/m' },
				secure: false,
			},
		},
		disableHostCheck: true,
	},
	output: {
		path: BUILD_DIR,
		filename: `fdjgs/${version}/j/[name]-[hash].js`,
		publicPath: '/',
		crossOriginLoading: 'anonymous',
		jsonpFunction: 'fdjgsJsonp',
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader' },
					{ loader: 'sass-loader' },
				],
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
				},
				include: SRC_DIR,
			},
			{
				test: /\.(jpg|png|svg)$/,
				loader: 'file-loader',
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			test: /\.js$/,
			exclude: /(node_modules|bower_components|dist)/,
			include: __dirname,
		}),
		copyWebpackPlugin([
			{
				from: 'src/html/index.html',
				to: 'index.html',
				force: true,
			},
		]),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					autoprefixer({
						browsers: ['last 3 versions', '> 1%'],
					}),
				],
			},
		}),
		new WebpackBuildNotifierPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isProd ? JSON.stringify('production') : JSON.stringify('development'),
			},
		}),
	],
};

const dev = {
	devtool: SOURCE_MAP ? 'inline-source-map' : '',

};

const prod = {
	optimization: {
  minimize: true,

	},
};

module.exports = isProd ? merge(isCommon, prod) : merge(isCommon, dev);

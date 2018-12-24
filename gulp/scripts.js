const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const gulp = require('gulp');
const config = require('../config');
const named = require('vinyl-named');
const browserSync = require('browser-sync');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

// utils
const pumped = require('./utils/pumped');
const notifaker = require('./utils/notifaker');
const logStats = require('./utils/webpackLogStats');

// config
const definePlugin = new webpack.DefinePlugin({
		__DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});

/**
 * Production
 */
gulp.task('script:prod', () => {
		return gulp.src(config.path.js.src)
				.pipe(plumber())

		.pipe(named())

		.pipe(gulpWebpack({
				mode: 'production',
				optimization: {
						minimizer: [
								new UglifyJsPlugin({
										uglifyOptions: {
												comporess: {
														drop_console: true
												},
												cache: false,
												parallel: true,
												sourceMap: false,
												minify: {}
										}
								})
						]
				},
				resolve: {
						extensions: ['.js', '.jsx']
				},
				output: {
						chunkFilename: 'chunk-[name].js'
				},
				module: {
						rules: [{
								test: /\.jsx?$/,
								exclude: [
										/bower_components/,
										/vendor/,
										/polyfills/,
										/node_modules/
								],
								use: [{
										loader: 'babel-loader',
										options: {
												presets: [
														['@babel/preset-env', { modules: false }]
												]
										}
								}]
						}]
				},
				plugins: [
						new LodashModuleReplacementPlugin,
						definePlugin
				]
		}))

		.pipe(gulp.dest(config.path.js.dest))

		.pipe(notify({
				message: pumped('JS Packaged & Minified!'),
				onLast: true
		}));
});

/**
 * Develop
 */
gulp.task('script:dev', () => {
		return gulp.src(config.path.js.src)
				.pipe(plumber())

		.pipe(named())

		.pipe(gulpWebpack({
				mode: 'development',
				cache: true,
				resolve: {
						extensions: ['.js', '.jsx']
				},
				output: {
						chunkFilename: 'chunk-[name].js'
				},
				module: {
						rules: [{
								test: /\.jsx?$/,
								exclude: [
										/bower_components/,
										/vendor/,
										/polyfills/,
										/node_modules/
								],
								use: [{
										loader: 'babel-loader',
										options: {
												presets: [
														['@babel/preset-env', { modules: false }]
												]
										}
								}]
						}]
				},
				plugins: [
						new LodashModuleReplacementPlugin,
						definePlugin
				]
		}, null, function(err, stats) {
				logStats(err, stats);

				browserSync.reload();
				notifaker(pumped('JS Packaged'));
		}))

		.pipe(gulp.dest(config.path.js.dest))
});
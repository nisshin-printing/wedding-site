'use strict';

require('es6-promise').polyfill();

let gulp = require('gulp'),
		runSequence = require('run-sequence');

// タスクの読み込み
let tasks = require('./gulp/load'),
		config = require('./config');

/**
 * 監視タスク
 */
gulp.task('watch', () => {
		gulp.watch(config.path.ejs.watch, ['html']);
		gulp.watch(config.path.style.watch, ['style']);
		gulp.watch(config.path.js.watch, ['preJs']);
		gulp.watch(config.path.svg.watch, ['svg']);
		gulp.watch(config.path.image.watch, ['image:dev']);
});

/**
 * build タスク
 */
gulp.task('build', ['clean'], (callback) => {
		return runSequence(['html', 'style', 'preJs', 'svg', 'image:prod', 'copy'], callback);
});

/**
 * production タスク
 */
gulp.task('production', (callback) => {
		config.IS_PRODUCTION = true;
		return runSequence('build', callback);
});

/**
 * default タスク
 */
var defaultTasks = ['server', 'watch'];
gulp.task('default', () => {
		return runSequence(defaultTasks);
});
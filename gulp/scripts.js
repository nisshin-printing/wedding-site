'use strict';

/**
 * スクリプトタスク
 * JSファイルをwebpackを使ってコンパイルして出力する
 */

let gulp = require('gulp'),
		config = require('../config'),
		$ = require('./plugins'),
		handleErrors = () => {
				let args = Array.prototype.slice.call(arguments);
				$.notify.onError('<%= error.message %>')
						.apply(this, args);
				this.emit('end');
		};


/*
 * Precompress JS
 */
gulp.task('preJs', () => {
		gulp.src(config.path.js.src)

		.pipe($.plumber())

		.pipe($.uglify())

		.pipe(gulp.dest(config.path.js.dest))
				.pipe($.browser.reload({ stream: true }));
})
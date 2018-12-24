'use strict';

/**
 * Image圧縮
 */
let gulp = require('gulp'),
		config = require('../config'),
		$ = require('./plugins');

gulp.task('image:prod', () => {
		return gulp.src(config.path.image.src)
				.pipe($.plumber({
						errorHandler: $.notify.onError('<%= error.message %>')
				}))
				.pipe($.imagemin({
						progressive: true,
						interlaced: true
				}))
				.pipe(gulp.dest(config.path.image.dest));
});

gulp.task('image:dev', () => {
		return gulp.src(config.path.image.src)
				.pipe($.plumber())

		.pipe(gulp.dest(config.path.image.dest))

		.pipe($.browser.stream());
});
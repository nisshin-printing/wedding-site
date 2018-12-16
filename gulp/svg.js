'use strict';

/**
 * Imageタスク&SVGタスク
 */
let gulp = require('gulp'),
		config = require('../config'),
		$ = require('./plugins');

gulp.task('svg', () => {
		return gulp.src(config.path.svg.src)
				.pipe($.plumber())

		.pipe($.svgSprite(config.options.svgSprite))

		.pipe($.svgmin(config.options.svgmin))

		.pipe(gulp.dest(config.path.svg.dest))
				.pipe($.browser.stream());
});
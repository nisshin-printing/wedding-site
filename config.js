'use strict';
/**
 * タスク設定ファイル
 */
module.exports = {
		dest: './build',
		IS_PRODUCTION: false,
		dist: 'public',
		autoTest: false,
		options: {
				svgmin: {
						multipass: true,
						plugins: [
								{ cleanupIDs: false },
								{ removeAttrs: { attrs: 'fill' } }
						]
				},
				svgSprite: {
						mode: {
								inline: true,
								symbol: {
										dest: '.',
										sprite: 'sprite.svg'
								}
						},
						shape: {
								id: {
										geneartor: 'icon-%s'
								}
						}
				}
		},
		ejs: {
				minify: {
						collapseWhitespace: true,
						conservativeCollapse: true,
						decodeEntities: true,
						html5: true,
						minifyCSS: true,
						minifyJS: true,
						minifyURLs: false,
						preserveLineBreaks: false,
						preventAttributesEscaping: false,
						quoteCharacter: "",
						removeEmptyAttributes: true,
						removeRedundantAttributes: true,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true
				},
				ejsOptions: {}
		},
		style: {
				sass: {
						errLogToConsole: true,
						outputStyle: 'compressed',
						sourcemap: true,
						souceComments: 'normal',
						includePaths: [
								'sass',
								'node_modules/foundation-sites/scss'
						]
				},
				autoprefixer: {
						browsers: ['last 3 version']
				},
				soucemaps: './maps'
		},
		js: {
				sourcemaps: './maps'
		},
		copy: {
				src: ['./assets/font/*'],
				dest: './build/assets/font'
		},
		browserify: {
				bundleOption: {
						cache: {},
						packageCache: {},
						fullPaths: false,
						debug: true,
						entries: ['assets/js/**/*.js', '!assets/js/**/_*.js'],
						extensions: 'js'
				},
				output: './js',
				filename: 'main.js'
		},
		server: {
				baseDir: './build',
				index: 'index.html'
		},
		path: {
				ejs: {
						src: ['dev/**/*.ejs', '!dev/**/_*.ejs'],
						watch: 'dev/**/*',
						dest: './build'
				},
				style: {
						src: ['assets/scss/**/*.scss', '!assets/scss/**/_*.scss'],
						watch: 'assets/scss/**/*',
						dest: 'build/assets/css'
				},
				svg: {
						src: 'assets/svg/sprite/*.svg',
						watch: 'assets/svg/sprite/*.svg',
						dest: 'build/assets/svg'
				},
				js: {
						src: ['assets/js/*.js', '!assets/js/_*.js'],
						watch: 'assets/js/**/*.js',
						dest: 'build/assets/js'
				},
				image: {
						src: 'assets/img/**/*',
						watch: 'assets/img/**/*',
						dest: 'build/assets/img/'
				}
		}
}
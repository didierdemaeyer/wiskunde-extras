'use strict';

var gulp = require('gulp'),
	//	del = require('del'),
	maps = require('gulp-sourcemaps'),
	//	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	//	uglify = require('gulp-uglify'),
	//	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	browserSync = require('browser-sync').create();

var options = {
	scripts: 'scripts',
	scriptsDist: 'js',
	styles: 'sass',
	stylesDist: 'css',
	bower: 'bower_components'
};

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(options.styles + '/**/*.scss', ['compileStyles']);
	//	gulp.watch(options.scripts + '/**/*.js', ['compileScripts']);
});

gulp.task('serve', ['watch']);

gulp.task('compileStyles', function () {
	console.log('compilesass');

	gulp.src(options.styles + '/**/*.scss')
		.pipe(maps.init())
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(options.stylesDist))
		.pipe(browserSync.stream());
});


// Static server
gulp.task('serve', function () {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	gulp.watch(options.styles + '/**/*.scss', ['compileStyles']);
	gulp.watch("./*.html").on('change', browserSync.reload);
});

//gulp.task('compileScripts', function(){
//	console.log('compileScripts');
//
//	var prefix = options.scripts;
//	var scriptsToCompile = [ 
//		prefix + '/graphDrawer.js',
//		prefix + '/appleTvCard.js',
//		prefix + '/app.js', 
//		prefix + '/services/anchorSmoothScroll.js', 
//		prefix + '/controllers/homeController.js',
//		prefix + '/controllers/graphController.js'
//	];
//
//	gulp.src(scriptsToCompile)
//	.pipe(maps.init())
//	.pipe(concat('app.js'))
//	.pipe(gulp.dest(options.scriptsDist))
//	.pipe(plumber())
//	.pipe(uglify({compress: false}))
//	.pipe(rename({ suffix: '.min' }))
//	.pipe(maps.write('./'))
//	.pipe(gulp.dest(options.scriptsDist))
//	.pipe(livereload());
//});

//gulp.task('clean', function(){
//	del([options.scriptsDist, options.stylesDist]);
//});

//gulp.task('build', ['compileStyles', 'compileScripts']);
gulp.task('build', ['compileStyles']);

gulp.task('default', ['build'], function () {
	gulp.start('serve');
});
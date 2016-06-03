var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade');

var devDir = "builds/development/",
	prodDir = "builds/production/"; 
	
gulp.task('jade', function(){
	gulp.src(devDir + 'html/*.jade')
		.pipe(jade())
		.pipe(gulp.dest(prodDir));
});
	
gulp.task("sass", function(){
	return gulp.src(devDir+'css/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(prodDir+'/css'));
});

gulp.task('js',function(){
	gulp.src(devDir+'js/*.js')
		.on('error', gutil.log)
		.pipe(gulp.dest(prodDir+'/js'));
});

gulp.task("serve", function(){
	browserSync.init({
		server: {
			baseDir: prodDir
		}
	});
});

gulp.task('watch', function(){
	gulp.watch(devDir + "**/*.*", ['jade', 'js', 'sass',  browserSync.reload]);
});


gulp.task('default', ['jade', 'sass', 'js', 'serve', 'watch']);



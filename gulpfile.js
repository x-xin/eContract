var gulp        = require('gulp'),
	less        = require('gulp-less'),
	uglify      = require('gulp-uglify'),
	minifycss   = require('gulp-minify-css'),
	sprite      = require('gulp.spritesmith'),
	// imagemin    = require('gulp-imagemin'),
	postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),

	clean       = require('gulp-clean'),
	plumber     = require('gulp-plumber'),
	concat      = require('gulp-concat'),
	cache       = require('gulp-cache'),
	path       	= {
					dev: 'dev/',
					dest: 'dest/'
				};


//less
gulp.task('less', function () {
    gulp
		.src(path.dev+'less/styles.less')
		.pipe(plumber(function(error){
			console.log(error);
			console.log('--------------------------  less Syntax Error! --------------------------');
		}))
		.pipe(less())
		.pipe(minifycss())
		.pipe(postcss([ autoprefixer({ browsers: [
			'last 20 versions'
		] }) ]))
        .pipe(gulp.dest(path.dest+'css'));
});

//清理图片
gulp.task('clean', [/*'clean:css', 'clean:js', */'clean:imagesDefault', 'clean:imagesSprite']);

gulp.task('clean:css', function() {
	gulp
		.src([
			path.dest+'css/**'
		], {read: false})
		.pipe(clean({force: true}));
});

gulp.task('clean:jsMerge', function() {
	gulp
		.src([
			path.dest+'js/merge/**/*'
		], {read: false})
		.pipe(clean({force: true}));
});

gulp.task('clean:jsDefault', function() {
	gulp
		.src([
			path.dest+'js/default/**/*'
		], {read: false})
		.pipe(clean({force: true}));
});

gulp.task('clean:imagesDefault', function() {
	gulp
		.src([
			path.dest+'img/default/*.{png,jpg,jpeg,gif}'
		], {read: false})
		.pipe(clean({force: true}));
});

gulp.task('clean:imagesSprite', function() {
	gulp
		.src([
			path.dest+'img/sprite/*.{png,jpg}'
		], {read: false})
		.pipe(clean({force: true}));
});



//复制文件
gulp.task('copy', ['clean', 'copy:jsMerge', 'copy:jsDefault', 'copy:images']);

gulp.task('copy:jsMerge', function(){
	gulp
		.src(path.dev+'js/merge/**.js')
		.pipe(plumber(function(error){
			console.log(error);
			console.log('--------------------------  js Syntax Error! --------------------------');
		}))
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest(path.dest+'js/'));
});

gulp.task('copy:jsDefault',function(){
    gulp
		.src(path.dev+'js/default/**.js')
		.pipe(plumber(function(error){
			console.log(error);
			console.log('--------------------------  js Syntax Error! --------------------------');
		}))
		.pipe(uglify())
		.pipe(gulp.dest(path.dest+'js/'));
})

gulp.task('copy:images', function(){
	gulp
		.src(path.dev+'img/default/**/*.{png,jpg,jpeg,gif}')

		.pipe(gulp.dest(path.dest+'img/'));
});


//sprite
gulp.task('sprite', ['sprite:png', 'sprite:jpg']);

//合并png
gulp.task('sprite:png', ['clean:imagesSprite'], function () {	
	var spriteData = gulp
						.src(path.dev+'img/sprite/**.png')
						.pipe(sprite({
							imgName: 'sprite.png',
							cssName: 'sprite-png.css',
							cssTemplate: path.dev+'less/core/handlebarsStr.css.handlebars',
							imgPath: '../img/sprite.png',
							padding: 10
						}));
		spriteData
			.img

			.pipe(gulp.dest(path.dest+'img/'));
		
		spriteData
			.css
			.pipe(gulp.dest(path.dev+'less/core/'));
});

//合并jpgy
gulp.task('sprite:jpg', ['clean:imagesSprite'], function () {
	var spriteData = gulp
						.src(path.dev+'sprite/*.jpg')
						.pipe(sprite({
							imgName: 'sprite.jpg',
							cssName: 'sprite-jpg.css',
							cssTemplate: path.dev+'less/core/handlebarsStr.css.handlebars',
							imgPath: '../img/sprite.jpg'
						}));
		spriteData
			.img

			.pipe(gulp.dest(path.dest+'img/'));
		
		spriteData
			.css
			.pipe(gulp.dest(path.dev+'less/core/'));
});


gulp.task('default', ['clean', 'copy', 'sprite'], function(){
	
	//监听不合并图片
	gulp.watch(path.dev+'img/default/**/*.*', ['copy:images']);
	
	//监听sprite png
	gulp.watch(path.dev+'img/sprite/*.png', ['sprite:png']);
	
	//监听js
	gulp.watch(path.dev+'js/merge/**.js', ['copy:jsMerge']);
	gulp.watch(path.dev+'js/default/**.js', ['copy:jsDefault']);

    //监听less
    gulp.watch(path.dev+'less/**/*.*', ['less']);
	
});
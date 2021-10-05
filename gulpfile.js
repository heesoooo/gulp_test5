const gulp = require('gulp'),
	del = require('del'),
	sass = require('gulp-sass'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	ejs = require('gulp-ejs'),
	spritesmith = require('gulp.spritesmith-multi'),
	merge = require('merge-stream'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;

const DIR = {
	SRC: './src',
	DEST: './dist'
};

const SRC = {
	JS: DIR.SRC + '/assets/js/*.js',
	SCSS: DIR.SRC + '/assets/scss/*.scss',
	EJS:  DIR.SRC + '/views/**/*.ejs',
	SPRITE: DIR.DEST + '/assets/image/*.png'
};

// 실서버 이미지 경로
const EJSdata = {
	/* LOCAL */
	//imgUrl: '/dist/assets/image'
	
	/* 실서버 */
	imgUrl: 'https://hunetdown.cdn.hunet.co.kr/Resources/HunetDev/HRD_DEV/Images/edu/legal-estimate'
};

const Sprite = {
	/* LOCAL */
	imgUrl: '/dist/assets/image'
}

const EJSoption = {
};

function clean() {
	return del([DIR.DEST]);
}

function cleanCss() {
	return del([`${DIR.DEST}/assets/css/style.css`]);
}

function cleanJs() {
	return del([`${DIR.DEST}/assets/js/all.js`]);
}

function cleanHtml() {
	return del([`${DIR.DEST}/views/**/*.html`]);
}

function cleanSprite() {
	return del([`${DIR.DEST}/assets/image/sprite/*.png`]);
}

// .scss -> .css 압축 저장
function cssTask() {
	return gulp.src(SRC.SCSS)
		.pipe(sass().on('error', sass.logError))
		.pipe(cssnano())
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest([`${DIR.DEST}/assets/css`]));
}

// 모든 js 파일 -> all.js 압축 저장
function jsTask() {
	return gulp.src([
		'./node_modules/jquery/dist/jquery.min.js',
		SRC.JS
	])
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest(`${DIR.DEST}/assets/js`));
}

function htmlsTask() {
	return gulp.src(SRC.EJS)
	.pipe(ejs(EJSdata, EJSoption))
	.pipe(rename({ extname: '.html' }))
	.pipe(gulp.dest(`${DIR.DEST}/views`));
  }

// sprite templete
const templateFunction = function (data) {
	var shared = ".sprite_comm{background-image:url('I');-webkit-background-size:Spx auto;background-size:SSpx auto}"
		.replace('I', data.sprites[0].image)
		.replace('S', data.sprites[0].total_width)
		.replace('SS', data.sprites[0].total_width);

	var perSprite = data.sprites.map(function (sprite) {
		return '.N{width:Wpx;height:Hpx;background-position:Xpx Ypx}'
			.replace('N', sprite.name)
			.replace('W', sprite.width)
			.replace('H', sprite.height)
			.replace('X', sprite.offset_x)
			.replace('Y', sprite.offset_y);
	}).join('\n');

	return shared + '\n' + perSprite
}

// 자동 이미지 스프라이트
function spriteTask() {
	let opts = {
		spritesmith: function (options, sprite) {
			options.imgPath = `${Sprite.imgUrl}/sprite/image.png`;
			options.cssName = `_${sprite}-sprite.scss`;
			options.cssTemplate = templateFunction;
			options.cssSpritesheetName = sprite;
			options.padding = 10;
			options.cssVarMap = function (sp) {
				sp.name = `sp_${sp.name}`;
			};

			return options; 
		}
	};
	const spriteData = gulp.src(`${DIR.SRC}/assets/image/**/*.png`).pipe(spritesmith(opts)).on('error', function (err) {
		console.log(err)
	});

	const imgStream = spriteData.img.pipe(gulp.dest(`${DIR.DEST}/assets/image/sprite`));
	const cssStream = spriteData.css.pipe(gulp.dest(`${DIR.SRC}/assets/scss/sp`));

	return merge(imgStream, cssStream);	
}

function watchTask() {
	gulp.watch(SRC.SCSS, gulp.series(cleanCss, cssTask)).on('change', reload);
	gulp.watch(SRC.JS, gulp.series(cleanJs, jsTask)).on('change', reload);
	gulp.watch(SRC.EJS, gulp.series(cleanHtml, htmlsTask)).on('change', reload);
	gulp.watch(SRC.SPRITE, gulp.series(cleanSprite, spriteTask)).on('change', reload);
}

function serve() {
	browserSync.init({
		server: {
			baseDir: "./",
			index: "worksheet.html"
		}
	});
	watchTask();
}

const build = gulp.series(clean, gulp.parallel(spriteTask, cssTask, jsTask, htmlsTask));

exports.clean = clean;
exports.spriteTask = spriteTask;
exports.cssTask = cssTask;
exports.jsTask = jsTask;
exports.htmlsTask = htmlsTask;
exports.build = build;
exports.watchTask = watchTask;
exports.serve = serve;
exports.default = build;
const gulp = require('gulp'),
	del = require('del'),
	sass = require('gulp-sass'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	spritesmith = require('gulp.spritesmith-multi'),
	merge = require('merge-stream'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;
	path = require('path');

const DIR = {
	DEST: 'img.hunet.co.kr/edu',
	SRC: 'img.hunet.co.kr/_assets'
}

// 연수원 html 폴더
const worksheetNAME = {
	worksheetInstitute: '7629_mmaedu'
}

// 이미지 폴더
const NAME = {
	spInstitute: 'mmaedu'
	// 신규 ex) orion
	// 버전이 있는 경우 ex ) orion/v2
}

// spriteScss 파일명
const SPSCSS = {
	spScssName: 'mmaedu'
	// 버전이 늘어날 경우 ex) spScssName: 'hitejinro_v3'
}

// 기능별 경로
const SRC = {
	SCSS: DIR.SRC + '/edu/css/custom/scss/7629*.scss',
	CSS: DIR.SRC + '/edu/css/custom/7629*.min.css',
	SPRITE: DIR.DEST + `/customize/${NAME.spInstitute}/sprite/sp_*.png`,
};

// 실서버 이미지 경로
const IMGdata = {
	imgUrl: 'https://hunetdown.cdn.hunet.co.kr/Resources/HunetDev/HRD_DEV/Images/edu/customize'
};

//////////////////////// function ↓ //////////////////////////

function clean() {
	return del([`${DIR.SRC}/**/custom/`]);
}

function cleanCss() {
	return del([SRC.CSS]);
}

function cleanSprite() {
	return del([`${DIR.DEST}/customize/${NAME.spInstitute}/sprite/sprite.png`]);
}

// .scss -> .css 압축 저장
function cssTask() {
	return gulp.src(SRC.SCSS)
		.pipe(sass().on('error', sass.logError))
		.pipe(cssnano())
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest([`${DIR.SRC}/edu/css/custom/`]));
}

async function spriteTask() {
	let opts = {
		spritesmith: function (options, sprite) {
			options.imgPath = `${IMGdata.imgUrl}/${NAME.spInstitute}/sprite/${options.imgName}`;
			options.cssName = `_${SPSCSS.spScssName}-sprite.scss`;
			options.imgName = 'sprite.png';
			options.cssSpritesheetName = sprite;
			options.padding = 10;
			options.cssVarMap = function (sp) {
				sp.name = `${sp.name}`;
			};
			options.algorithm = 'top-down';
			options.algorithmOpts = {
				sort: false
			};
			options.cssTemplate = "sprites.scss.handlebars";

			return options;
		}
	};
	const spriteData = gulp.src(SRC.SPRITE).pipe(spritesmith(opts)).on('error', function (err) {
		console.log(err)
	});


	const imgStream = spriteData.img.pipe(gulp.dest(`${DIR.DEST}/customize/${NAME.spInstitute}/sprite`));
	const cssStream = spriteData.css.pipe(gulp.dest(`${DIR.SRC}/edu/css/custom/scss/sp`));

	return merge(imgStream, cssStream);
}

// .on('change', reload); ->모든브라우저에 변경사항이 통보된다.
// Streams는 Browsersync에서 지원
function watchTask() {
	gulp.watch(SRC.SCSS, gulp.series(cleanCss, cssTask)).on('change', reload);
	gulp.watch(SRC.SPRITE, gulp.series(cleanSprite, spriteTask)).on('change', reload);
}

// serve는 index.html을 기본 파일설정으로 가진다.
// 목차페이지 생성시 다른 파일명으로 지정gul하고 싶으면 아래와 주석과같이 index의 파일명을 설정해 주면 된다.
function serve() {
	browserSync.init({
		server: {
			baseDir: `edu.hunet.co.kr/customize/${worksheetNAME.worksheetInstitute}`,
			index: "worksheet.html"
		}
	});	
	watchTask();
}

const build = gulp.series(clean, gulp.parallel(spriteTask, cssTask));

exports.clean = clean;
exports.cleanSprite = cleanSprite;
exports.spriteTask = spriteTask;
exports.cssTask = cssTask;
exports.build = build;
exports.watchTask = watchTask;
exports.serve = serve;
exports.default = build;
// -------------------- ok ---------- gulp-uglify (minificar arquivos js)
// -------------------- ok ---------- gulp-rename(pra renomear e deixar tanto o original como o minificado a cima)
// -------------------- ok ---------- gulp-less (converter less css)
// -------------------- ok ---------- gulp-sass (converer sass css)
// less > css  ok ok
// less > sass ok ok
// css > less  ?? ??
// css > sass  ok ok
// sass > less ok ok
// sass > css  ok ok
// -------------------- ok ---------- gulp-watch (monitorar mudanças de arquivos)
// -------------------- ok ---------- gulp-browser-sync (live reload nas paginas)
// -------------------- ok ---------- gulp "hints":'css,less,sass,js,html'
// -------------------- ok ---------- gulp-csso, gulp-clean-css (minificador css)
// -------------------- ok ---------- gulp-jscs (padronizador js, padronizar usando o airbnb, recomendo)
// -------------------- ok ---------- gulp-imagemin / gulp-tinypng (compressao de img)
// não instalado, talvez não necessário: gulp-grunt - ( rodar tasks do grunt no gulp...util?)
// não instalado, talvez não necessário: gulp-bower-files (injeta bower packages)
//
// -------------------- ok ---------- https://github.com/vol7/shorthand simplifica muito CSSs!
// critical - remover styles inline e os salva em um arquivo css
// gulp-concat - concatena todos os arquivos (js por exemplo) em um arquivo só
// gulp del - deletar arquivos e pastas ( a ideia é fazer uma pasta pre dist, onde serao jogado os arquivos, e depois eles irão para o dist, e essa pasta sera deletada)
// gulp-inject - para injetar js e css no html, junto a streams de merge, pode pegar os arquivos minificados e concatenar, e depois injetar
// http://ypereirareis.github.io/blog/2015/10/22/gulp-merge-less-sass-css/ merge de arquivos, adicionar depois isso

var gulp        = require('gulp');

//browsersync
var browserSync = require('browser-sync').create();

//uglify
var uglify = require('gulp-uglify');
var pump = require('pump');

//gulp-rename
var rename = require("gulp-rename");

//gulp-less
var less = require('gulp-less');
var path = require('path');

//gulp-less-to-scss(sass)
var lessToScss = require('gulp-less-to-scss');

//gulp-sass
var sass = require('gulp-sass');

//gulp--css-scss
const cssScss = require('gulp-css-scss');

//gulp-scss-to-less
// var scssToLess = require('gulp-scss-to-less');

//html, js, css, less and sass hints
var htmlhint = require("gulp-htmlhint");
var csslint = require('gulp-csslint');
var scsslint = require('gulp-scss-lint');
var lesshint = require('gulp-lesshint');
var jshint = require('gulp-jshint');

//gulp-clean-css
var cleanCSS = require('gulp-clean-css');

//gulp-jscs
const jscs = require('gulp-jscs');

//gulp-imagemin
const imagemin = require('gulp-imagemin');

//gulp-shorthand , simplica os arquivos css
var shorthand = require('gulp-shorthand');

//gulp-contats
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');

//gulp-inject
var inject = require('gulp-inject');


//browsersync
const reload = browserSync.reload;


//-------------------------------------------------------------------------------------
//------------------------------------------tasks--------------------------------------
//-------------------------------------------------------------------------------------


gulp.task('serve', function() {
    browserSync.init({
      server: {
      baseDir: ['app'],
      routes: {'/bower_components': 'bower_components'}
      }
    });
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.{js,html,less,scss,css}', ['htmlLint','jsLint','cssLint','lessLint','scssLint']).on('change', reload);
});

//uglify
gulp.task('minify-js', function (cb) {
  pump([
        gulp.src('app/**/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});

//gulp-rename
//isso é apenas uma das formas de se renomear....funcional, mas sem uso por enquanto.
gulp.task('rename', function() {
  gulp.src("app/index.html")
    .pipe(rename("app/renameExample.html"))
    .pipe(gulp.dest("dist"));
});

//gulp-less
gulp.task('less', function () {
  return gulp.src('app/assets/styles/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('dist/assets/styles'));
});

//gulp-sass
gulp.task('sass', function () {
  return gulp.src('app/assets/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/assets/styles'));
});

//gulp-less-to-scss(sass)
gulp.task('lessToScss',function(){
    gulp.src('app/assets/styles/*.less')
		.pipe(lessToScss())
		.pipe(gulp.dest('dist/scss'));
});

//gulp-css-scss'
gulp.task('css-scss', () => {
  return gulp.src('app/assets/styles/*.css')
    .pipe(cssScss())
    .pipe(gulp.dest('dist/scss'));
});

//gulp-scss-to-less
// gulp.task('scssToLess',function(){
//     gulp.src('app/assets/styles/*.scss')
//         .pipe(scssToLess())
//         .pipe(gulp.dest('dist/less'));
// });

//html, js, css, less and sass hints
gulp.task('cssLint', function() {
  return gulp.src('app/**/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter());
});
gulp.task('htmlLint', function() {
  return gulp.src('app/**/*.html')
    .pipe(htmlhint())
  	.pipe(htmlhint.reporter());
});
gulp.task('scssLint', function() {
  return gulp.src('app/**/*.scss')
    .pipe(scsslint())
    .pipe(scsslint.reporter());
});
gulp.task('lessLint', function() {
  return gulp.src('app/**/*.less')
    .pipe(lesshint())
    .pipe(lesshint.reporter());
});
gulp.task('jsLint', function() {
  return gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter());
    // .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
});

//gulp-clean-css
gulp.task('minify-css', function() {
  return gulp.src('app/assets/styles/*.css','dist/assets/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/assets/styles/'));
});

//gulp-jscs, checa os js, um task a parte tambem.
gulp.task('checkJs', () => {
    return gulp.src('app/modules/app.js')
        .pipe(jscs({fix: true}))
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'))
        .pipe(gulp.dest('dist'));
});

//gulp-imagemin
gulp.task('compressImg', () =>
	gulp.src('app/assets/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/assets/img'))
);

//gulp-shorthand , simplica os arquivos css, task a parte das principais
gulp.task('cssShort', function () {
	return gulp.src('app/assets/styles/*.css')
		.pipe(shorthand())
		.pipe(gulp.dest('dist/assets/styles'));
});


//gulp-concats
gulp.task('concatJs', function() {
  return gulp.src('app/assets/js/*.js')
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('concatCss', function () {
  return gulp.src('dist/assets/styles/*.css')
    .pipe(concatCss("main.min.css"))
    .pipe(gulp.dest('dist/assets/styles'));
});

//gulp inject
gulp.task('inject', function () {
  var target = gulp.src('dist/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['dist/assets/js/*.js', 'dist/assets/styles/*.css'], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest('dist'));
});



//default gulp task - Gulp only on cmd
gulp.task('default', ['serve', 'watch']);

//build prod task
gulp.task('build', ['compressImg','sass','less','minify-css','minify-js','concatJs','concatCss','inject']);

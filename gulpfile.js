var gulp = require('gulp')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var sourcemaps = require('gulp-sourcemaps')
var rename = require('gulp-rename')
var cssnano = require('cssnano')

gulp.task('styles', function () {
  return gulp.src('./src/*.css')
    .pipe(postcss([ autoprefixer({browsers: ['last 10 versions'],cascade: false})] ))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest('dest/'))
})


gulp.task('rename',['styles'], function () {
  return gulp.src('./dest/main.css')
    .pipe(postcss([ cssnano()] ))
    .pipe(rename('main.min.css'))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest('dest/'))
})

gulp.task('default',['styles','rename'])

var watch=gulp.watch('src/*.css',['default'])
watch.on('change',function (e) {
  console.log('====================================');
  console.log(e.path);
  console.log('====================================');
  console.log(e.type);
})
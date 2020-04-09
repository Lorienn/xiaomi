//引入gulp插件
const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const minifyCSS = require('gulp-minify-css');
const connect = require('gulp-connect');

//index.scss => index.css + index.min.css
gulp.task("sassIndex", function () {
    return gulp.src("stylesheet/index.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(minifyCSS())
        .pipe(rename("index.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload())
})

//编译并打包scss
gulp.task("sass", function () {
    return gulp.src(["stylesheet/*.scss", "!stylesheet/index.scss"])
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload())
})

//打包js
gulp.task("script", function () {
    return gulp.src(["*.js", "!gulpfile.js"])
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload())
})

//打包html
gulp.task("html", function () {
    return gulp.src("*.html")
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload())
})

//打包json数据
gulp.task("data", function () {
    return gulp.src(["*.json", "!package.json"])
        .pipe(gulp.dest("dist/data"))
        .pipe(connect.reload())
})

//打包图片
gulp.task("image", function () {
    return gulp.src("images/**/*")
        .pipe(gulp.dest("dist/images"))
        .pipe(connect.reload())
})

//一次性打包
gulp.task("build", ["sassIndex", "sass", "script", "html", "data", "image"], function () {
    console.log('OK')
})

//建立监听
gulp.task("watch", function () {
    gulp.watch("stylesheet/index.scss", ['sassIndex'])
    gulp.watch(["stylesheet/*.scss", "!stylesheet/index.scss"], ['sass'])
    gulp.watch(["*.js", "!gulpfile.js"], ['script'])
    gulp.watch("*.html", ['html'])
    gulp.watch(["*.json", "!package.json"], ['data'])
    gulp.watch("images/**/*", ['images'])
})

//启动服务器
gulp.task("server", function () {
    connect.server({
        root: "dist",
        port: 8888,
        livereload: true //启用实时更新
    })
})

//设置默认任务
gulp.task("default", ["watch", "server"])
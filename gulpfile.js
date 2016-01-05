// gulp
var gulp = require('gulp');
// plugins
var connect = require('gulp-connect');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');


/* 自动刷新 live load */
// 定义 html 
gulp.task('html', function() {
    gulp.src('./app/*.html')
        .pipe(connect.reload());
});
// 定义 css 
gulp.task('css', function() {
    gulp.src('./app/css/*.css')
        .pipe(connect.reload());
});
// 定义 js 
gulp.task('js', function() {
    gulp.src('./app/js/*.js')
        .pipe(connect.reload());
});
// 定义 watch任务
gulp.task('watch', function() {
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/css/*.css', ['css']);
    gulp.watch('app/js/*.js', ['js']);
});

// js 语法检查
gulp.task('lint', function() {
    gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

// 清理路径下的文件
gulp.task('clean', function() {
    gulp.src('./dist/*')
        .pipe(clean({
            force: true
        }));
});

// 压缩css
gulp.task('minify-css', function() {
    var opts = {
        comments: true,
        spare: true
    };
    gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('./dist/'))
});

//压缩js
gulp.task('minify-js', function() {
    gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
        .pipe(uglify({
            // inSourceMap:
            // outSourceMap: "app.js.map"
        }))
        .pipe(gulp.dest('./dist/'))
});

// 拷贝bower下的文件到dist
gulp.task('copy-bower-components', function() {
    gulp.src('./app/bower_components/**')
        .pipe(gulp.dest('dist/bower_components'));
});

// 拷贝 html文件到dist
gulp.task('copy-html-files', function() {
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('dist/'));
});

//本地服务器
gulp.task('connect', function() {
    connect.server({
        root: 'app/',
        port: 8080,
        livereload: true
    });
});

// 合并dist中的文件，发布上线
gulp.task('connectDist', function() {
    connect.server({
        root: 'dist/',
        port: 9999
    });
});

gulp.task('default', ['connect', 'watch', 'lint']);

gulp.task('build', function() {
    runSequence(
        ['clean'], ['lint', 'minify-css', 'minify-js', 'copy-html-files', 'copy-bower-components', 'connectDist']
    );
});

var gulp = require('gulp'),
    connect = require('gulp-connect');

//本地服务器
gulp.task('webserver', function() {
    connect.server({
        livereload: true
    });
});

// 定义 html 
gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(connect.reload());
});
// 定义 css 
gulp.task('css', function() {
    gulp.src('*.css')
        .pipe(connect.reload());
});
// 定义 js 
gulp.task('js', function() {
    gulp.src('*.js')
        .pipe(connect.reload());
});
// 定义 watch任务
gulp.task('watch', function() {
    gulp.watch('*.html', ['html']);
    gulp.watch('*.css', ['css']);
    gulp.watch('*.js', ['js']);
});

gulp.task('default', ['webserver', 'watch']);


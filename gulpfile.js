const { src, task, series } = require('gulp');
const eslint = require('gulp-eslint');

task('eslint', () => {
    return src(['./src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// task('test', () => {
//
// });

task('validate', series('eslint', (done) => {
    done();
}));
const { src, task, series } = require('gulp');
const eslint = require('gulp-eslint');
const jest = require('jest-cli');

task('eslint', () => {
    return src(['./src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

task('test', () => {
    process.env.NODE_ENV = 'test';

    return jest.runCLI({}, ['./test']);
});

task('validate', series('eslint', 'test', (done) => {
    done();
}));
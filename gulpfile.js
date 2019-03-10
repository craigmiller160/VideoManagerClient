/* eslint-disable */
const { src, task, series, dest } = require('gulp');
const eslint = require('gulp-eslint');
const jest = require('jest-cli');
const run = require('gulp-run');

task('eslint', () => {
    return src(['./src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

task('test', () => {
    process.env.NODE_ENV = 'test';

    return jest.runCLI({}, ['./test'])
        .then(({ results }) => {
            if (results.numFailedTestSuites > 0) {
                throw new Error('Test suites finished with errors');
            }
        });
});

task('validate', series('eslint', 'test', (done) => {
    done();
}));

task('build', series('validate', () => {
    return run('node scripts/build.js', {}).exec();
}));


/* eslint-disable */
const { src, task, series, dest } = require('gulp');
const eslint = require('gulp-eslint');
const jest = require('jest-cli');
const run = require('gulp-run');
const zip = require('gulp-zip');
const clean = require('gulp-clean');

const packageJson = require('./package.json');

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

task('clean', () => {
    return src(['./build', './dist'], { allowEmpty: true })
        .pipe(clean({ force: true }));
});

task('validate', series('eslint', 'test'));

task('build', () => {
    return run('node scripts/build.js', {}).exec();
});

task('zip', () => {
    return src('./build/**/**')
        .pipe(zip(`${packageJson.name}-${packageJson.version}.zip`))
        .pipe(dest('./dist'));
});

task('dist', series('clean', 'validate', 'build', 'zip'));
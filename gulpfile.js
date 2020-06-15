const { src, task, series, dest } = require('gulp');
const eslint = require('gulp-eslint');
const jest = require('jest-cli');
const run = require('gulp-run');
const zip = require('gulp-zip');
const clean = require('gulp-clean');

const packageJson = require('./package.json');
const name = packageJson.name.replace('@craigmiller160', '');

task('eslint', () => {
    return src(['./src/**/*.js', './test/**/*.js'])
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
    return src(['./build', './dist', './deploy/build'], { allowEmpty: true })
        .pipe(clean({ force: true }));
});

task('validate', series('eslint', 'test'));

task('build', () => {
    return run('node scripts/build.js', {}).exec();
});

task('zip', () => {
    return src('./build/**/**')
        .pipe(zip(`${name}-${packageJson.version}.zip`))
        .pipe(dest('./deploy/build'));
});

task('dist', series('clean', 'validate', 'build', 'zip'));
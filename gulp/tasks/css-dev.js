const   {src, dest}     = require('gulp'),
        autoprefixer    = require('autoprefixer'),
        sass            = require('gulp-sass'),
        postcss         = require('gulp-postcss');
    
sass.compiler = require('node-sass');

const   sassGlob        = './app/assets/styles/**/*.scss',
        outputCssPath   = './app/temp/styles/';

//  styles task

function styleTask(){
    return src(sassGlob, {sourcemaps: true})
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(dest(outputCssPath, {sourcemaps: true}))
};

module.exports = {
    styleTask: styleTask,
    sassGlob: sassGlob
}
const   {series, watch, parallel, src, dest} = require('gulp'),
        bs              = require('browser-sync').create(),
        styles          = require('./stylesTask'),    // import styleTaskObject
        jsTask          = require('./jsTask'),        // import jsTask
        build           = require('./buildTask');     // import buildTask

// project filePaths

const   sassFiles   = styles.sassGlob,    //'./app/assets/styles/**/*.scss',
        jsFiles     = './app/assets/scripts/**/*.js',
        mainFiles   = ['./app/*.html', './app/temp/scripts/*.js'],
        configFiles = ['./package.json', './package-lock.json', './README.md', './webpack.config.js'];

//  watch tasks

function bsReload(cb){
    bs.reload();
    cb();       // whithout reload would only run once
};

function watchFiles(){
    browserSync.init({
        tunnel: 'dev-site',
        server: {
            baseDir: './app'
        }
    });
    watch(sassFiles, styles.styleTask);
    watch(jsFiles, jsTask);
    watch(mainFiles).on('change', bsReload);
}

//  public gulp tasks, npx gulp <task>

exports.styles = styles;
exports.jsCompile = jsCompile;
exports.watch = watchFiles;
exports.build = build;
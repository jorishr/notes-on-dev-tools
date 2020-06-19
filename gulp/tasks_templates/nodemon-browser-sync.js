//  REFERENCE: https://github.com/sogko/gulp-recipes/tree/master/browser-sync-nodemon-expressjs

const   { series, watch, parallel, src, dest} = require('gulp'),
        nodemon     = require('nodemon'),
        browserSync = require('browser-sync');

function startNodemon (cb) {
    let called = false;
    return nodemon({
        // nodemon our expressjs server
        script: './app/app.js',
        // watch core server file(s) that require server restart on change
        watch: ['./app/app.js']
    })
    .on('start', function onStart() {
        // ensure start only got called once
        if (!called) { cb(); }
        called = true;
    })
    .on('restart', function onRestart() {
        // reload connected browsers after a slight delay
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, BROWSER_SYNC_RELOAD_DELAY);
    });
};

function startBrowserSync (){
    browserSync({
      proxy: 'http://localhost:3000',
      port: 4000
    });
};

exports.watch = series(startNodemon, startBrowserSync);
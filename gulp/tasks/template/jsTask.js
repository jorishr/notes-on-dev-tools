const   {series, src, dest} = require('gulp'), 
        modernizr           = require('gulp-modernizr'),
        webpack             = require('webpack');
//  globs
const   sassGlob        = './app/assets/styles/**/*.scss',
        modernizrPath   = './app/temp/scripts/modernizr';

//  apply Modernizr for CSS compatibility check with end-user browser
function applyModernizr(){
    return src(sassGlob)
        .pipe(modernizr({
            'options': ['setClasses']   //  sets classes to HTML header
        }))
        .pipe(dest(modernizrPath));
        //  dedicated folder to seperate output from main bundle js files
};

//  webpack configured to bundle js files
function compileJs(cb){
    webpack(require('../webpack.config'), function(err, stats){
        if (err){console.log(err.toString());};
        console.log(stats.toString());
        cb();       
    });
};

const jsTask = series(applyModernizr, compileJs);

module.exports = jsTask;
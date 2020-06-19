const   {src, dest} = require('gulp'), 
        del         = require('del'),
        imageMin    = require('gulp-imagemin'),
        cssnano     = require('gulp-cssnano'),
        rev         = require('gulp-rev'),
        revReplace  = require('gulp-rev-replace'),
        uglify      = require('gulp-uglify'),
        replaceInFile = require('replace-in-file'),
        htmlMin     = require('gulp-htmlmin');

//  globs and paths
const   distFolder      = './dist',
        devImgsGlob     = ['./app/assets/images/**/*', '!./app/assets/images/icons/**'],
        distImgs        = './dist/assets/images/',
        devHtml         = './app/index.html',
        distHtml        = './dist/index.html',
        devCss          = './app/temp/styles/styles.css',
        distCssFolder   = './dist/assets/styles',
        devJsGlob       = './app/temp/scripts/*.js',
        distJsFolder    = './dist/assets/scripts';

//  start clean        
function startClean(){
    return del('./dist');
};

function minifyHtml(){
    return src(devHtml)
        .pipe(htmlMin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(dest(distFolder));
};

//  update path of stylesheet and js files 
async function replacePaths(){
    let options = {
        files: distHtml,
        from: [/href="temp/g, /src="temp/g],    //regExp
        to: ['href="assets', 'src="assets']
    }
    try {
        const results = await replaceInFile(options)
        console.log('Replacement results:', results);
    }
    catch (error) {
       console.error('Error occurred:', error);
    }
};

function optimizeImages(){
    return src(devImgsGlob)
        .pipe(imageMin({
            progressive: true,  // jpeg
            interlaced: true,   // gif
            multipass: true     // svg
        }))
        .pipe(dest(distImgs));
};

function cssBuild(){
    return src(devCss)
        .pipe(cssnano())    
        .pipe(rev())
        .pipe(dest(distCssFolder))
        .pipe(rev.manifest())   // produces rev-manifest.json
        .pipe(dest(distCssFolder))
};

function revCssUpdate(){
    let manifest = src(distCssFolder + '/rev-manifest.json');
    return src(distHtml)
        .pipe(revReplace({manifest: manifest}))
        .pipe(dest(distFolder));
};

function jsBuild(){
    return src(devJsGlob)
        .pipe(uglify())
        .pipe(rev())
        .pipe(dest(distJsFolder))
        .pipe(rev.manifest())   // produces rev-manifest.json
        .pipe(dest(distJsFolder));
};

function revJsUpdate(){
    let manifest = src(distJsFolder + '/rev-manifest.json');
    return src(distHtml)
        .pipe(revReplace({manifest: manifest}))
        .pipe(dest(distFolder));
};

// delete rev-manifest.json
function endClean(){
    return del([distCssFolder + '/*.json', distJsFolder + '*.json']);
};

function build(){
    series(
        startClean, 
        parallel(minifyHtml, optimizeImages), 
        parallel(
            series(cssBuild, revCssUpdate), 
            series(jsBuild, revJsUpdate), 
            replacePaths), 
        endClean
    );
};

module.exports = build;
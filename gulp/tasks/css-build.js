const temp = './dist/temp';
function cssBuild(){
    return src('./app/temp/styles/styles.css')
        .pipe(cssnano())    
        .pipe(rev())
        .pipe(dest('./dist/assets/styles'))
        .pipe(rev.manifest())   // produces rev-manifest.json
        .pipe(dest(temp));
};
/* 
    rev-manifest.json contains the mapping that stores the original name and the
    current name of each file.
    gulp-rev-replace updates the file(s) with the hash appended filenames
*/
function revReplaceCss(){
    let manifest = src('./dist/assets/styles/rev-manifest.json');
    return src('./dist/index.html')
        .pipe(revReplace({manifest: manifest}))
        .pipe(dest('./dist'));
};
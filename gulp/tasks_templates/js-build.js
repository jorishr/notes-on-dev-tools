function jsBuild(){
    return src('./app/temp/scripts/*.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(dest('./dist/assets/scripts'))
        .pipe(rev.manifest())   // produces rev-manifest.json
        .pipe(dest('./dist/assets/scripts'));
};

function updateHtmlrevJs(){
    let manifest = src('./dist/assets/scripts/rev-manifest.json');
    return src('./dist/index.html')
        .pipe(revReplace({manifest: manifest}))
        .pipe(dest('./dist'));
};
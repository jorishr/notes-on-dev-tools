//  globs
const   sassGlob        = './app/assets/styles/**/*.scss',
        modernizrpath   = './app/temp/scripts/modernizr';

//  apply Modernizr for CSS compatibility check with end-user browser

function applyModernizr(){
    return src(sassGlob)
        .pipe(modernizr({
            'options': ['setClasses']   //  sets classes to HTML header
        }))
        .pipe(dest(modernizrpath));
        //  dedicated folder to seperate output from main bundle js files
};

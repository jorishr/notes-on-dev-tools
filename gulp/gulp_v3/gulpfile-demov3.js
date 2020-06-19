// this is Gulp v3 Some methods like gulp.start are no longer
// supported in v4

var gulp = require("gulp");
var watch = require("gulp-watch");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssVars = require("postcss-simple-vars");
var cssNested = require("postcss-nested");
var cssImport = require("postcss-import");
var browserSync = require("browser-sync").create();

gulp.task("default", function() {
    console.log("Default task!");
});

gulp.task("html", function() {
    console.log("We will make changes to the html!")
});

gulp.task("styles", function() {
    return gulp.src("./app/assets/styles/styles.css")
        .pipe(postcss([cssImport, cssNested, cssVars, autoprefixer])) 
            //postcss expects an array
            //the array items refer to the var created above
        .pipe(gulp.dest("./app/temp/styles/"));
}); //return is necessary because gulp.src is a asynchronous function, by
    //adding return gulp is aware when this function completes.
    //the first pipe connects src and dest
    //next step is to run our code through PostCSS filters
    //Note: put each pipe on a seperate line BUT MIND the "."!

//GULP WATCH
gulp.task("watch", function() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
    watch("./app/index.html", function() {  // ./ root folder
        browserSync.reload();
        gulp.start("html"); // start the task created above
    });
    watch("./app/assets/styles/**/*.css", function(){
        gulp.start("cssInject");
        //gulp.start("styles"); //watch all folders inside styles + all css files
    }); 
}); //we now watch for changes in the index-html and the css files. When change
    //is detected in html, the function html is run. When changes is detected
    //in CSS, the styles function is triggered.
gulp.task("cssInject", ["styles"], function() {
    return gulp.src(".app/temp/styles/styles.css").pipe(browserSync.stream());
});


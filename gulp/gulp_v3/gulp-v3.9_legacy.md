# GULP v3.9 -Legacy

INSTALL GULP-POSTCSS via NPM
npm install gulp-postcss --save-dev

var postcss = require("gulp-postcss"); 	// in gulpfile.js 

By itself PostCSS does not do much, you use it in combination with packages such as autoprefixer, PostCSS Variables, nesting support in PostCSS, importing partial files in PostCSS, mixins support,  

npm install autoprefixer --save-dev
npm install postcss-simples-vars --save-dev
npm install postcss-nested --save-dev
npm install postcss-import --save-dev
npm install postcss-mixins --save-dev


var autoprefixer = require("autoprefixer");		// gulpfile.js
var cssvars = require("postcss-simple-vars"):	
var cssnested = require("postcss-nested");
var import = require("postcss-import");
var import = require("postcss-mixins");


PARTIAL CSS FILES SETUP
-create new files in the .app/styles/base/_partial.css OR
-create new files in the .app/styles/modules/_partial.css

MIXINS SETUP
pipe(postcss([cssImport, cssNested, cssVars, cssMixins , autoprefixer]))

- create a new partial CSS file _mixins in styles/base
- define mixin:
@define-mixin atSmall {
    @media (min-width: 530px) {
        @mixin-content;
    }
}

- add import to style.css: @import "base/_mixins.css";


V. ORGANIZATION OF GULP FILES
- create a root folder gulp, subfolder tasks
- in tasks folder: styles.js for css tasks
- you also seperate the var, only the once for the css task are needed
- same thing for the watch.js
- what is left in the main gulpfile.js:
require("./gulp/tasks/watch");
require("./gulp/tasks/styles"); 


VI. GULP ERROR HANDLING
- to avoid errors in css to cause an interruption in the gulp tasks and our workflow add to the styles.js:

before the .pipe(gulp.dest 

add 

.on("error", function(){
    this.emit("end");
}) 
	// this refers to this task (the pipe stream postcss), this 	emit (tells) gulp that the task has ended.
	// exactly what the watch tasks needs, tasks that have 	ended. Thus the watch task does not perceives the error and 	continues.

- add errorInfo: as a parameter to the function and a console.log:
.on("error", function(errorInfo){
    console.log(errorInfo.toString()); 
	// the .toString() compact the error info
    this.emit("end");


VII. BROWSER SYNC

Auto-refresh when changes are made to CSS and HTTML files.
BrowserSync runs a virtual server in the background.

Benefits: 
- cross browser compatibility check is easy, scroll in 
one browser is matched by the other browsers
- state of the browser does not change when new JS or CSS is injected
- generates an external URL that, when on the same wifi can be used on mobile or tablet

- INSTALL
npm install browser-sync --save-dev

var browserSync = require("browser-sync").create() 

NOTE: 
- we only import the method .create() NOT the entire package
- see legacy file in gulp folder for precise code example

BrowserSync is incoportated in the watch task, not the individual
html or styles task in the gulpfile.js:

browserSync.init({ 
    server: {   
        baseDir: "app" // where the server can find the site
    }
});

- Add the reload task to the index.html watch task:

browserSync.reload();

- BrowserSync can automatically inject our CSS, even without a refresh! Setup a NEW TASK, with a new pipe that takes the contents of our css file, pipes it over to browserSync

gulp.task("cssInject", function(){
    return gulp.src(".app/temp/styles/styles.css")
        .pipe(browserSync.stream()); 
});	// .stream() method makes everything you pipe into it 	available in the browser

- the question is, when to run this task? Well, each time you save
changes to css: see inside the gulp watch task code. There we point to running the styles task each time changes are made.

gulp.start("styles"); 
// That styles task in turn, runs all our postcss tasks such as autoprefixer, import, nested, etc.

Instead, of "styles" we run the newly created "ccsInject" task AND we make the "styles" task into a DEPENDENCY of the cssInject:

gulp.task("cssInject",["styles"], function(){
    return gulp.src(".app/temp/styles/styles.css")
        .pipe(browserSync.stream()); 
});
	// Thus before gulp runs the cssInject it now must run AND 	complete the dependency tasks we indicated, here "styles".

The full rundown is as follows: 
- gulp watch looks for changes in the css files
- a change is made and this triggers the cssInject task BUT this task will only be run when the temporary styles.css is updated in the temp/styles folder
- once updated this styles.css in the temp folder is run through the pipe with browserSync
- browserSync.stream() injects the css into the browser display. 


PRE-v4.0 GULP
See legacy files in the Gulp folder for code examples of older version of Gulp

- In gulpfile.json: 

var gulp = require("gulp");

- create tasks for Gulp to run.

gulp.task(a,b)	// the method task is built in, the first 					argument is the name of the task, the second 				argument is what we want to happen (a function)

- Gulp Watch plugin: 
watch for changes in a specific file and trigger an action when that happens.

npm install gulp-watch --save-dev

var gulp-watch = require('gulp-watch');	// in gulpfile.js 


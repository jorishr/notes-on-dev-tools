# Gulp Task Runner
Table of contents
- [Gulp Task Runner](#gulp-task-runner)
	- [About](#about)
	- [Gulp File](#gulp-file)
	- [Gulp API](#gulp-api)
		- [Task functions](#task-functions)
		- [Task order: Series and parallel](#task-order-series-and-parallel)
	- [Paths and globs](#paths-and-globs)
		- [Project folder structure](#project-folder-structure)
		- [GLOBS](#globs)
			- [Glob patterns](#glob-patterns)
## About
GulpJS is a toolkit for automating painful or time-consuming tasks in your development workflow. 

NOTE: The following is based on Gulp v4.0. 

Add the GULP commands to the NPM `package.json` under scripts:
```
"start": "gulp"	
"build": "gulp"	
-> default task for dev
-> build task when preparing for deploy
```
Use node's NPX for local install of GULP: `npx gulp <task>`

## Gulp File
Create a GULP file in the project root folder: `gulpfile.js`

To split up the gulp file:
- create a folder named gulpfile.js
- inside: index.js (the main file with imports)
- seperate files `<task>.js` for each task whereby you export the function tasks.

## Gulp API
All dependencies you install need to be imported as variables with the `require()` function in the gulpfile.js:
```javascript
const 	sass 		= require('gulp-sass'), 
		autoprefix 	= require('gulp-autoprefixer'),
		...; 
```
Gulp APIs, like `src()`, `dest()`, `series()`, or `parallel()`, are part of asynchronous functions that represent the tasks that have to be performed. Any exported functions will be registered into gulp's task system as task that can be run in the CLI as PUBLIC tasks. To see the list of public tasks available: `gulp --tasks`.

Tasks that are not exported are considered to be PRIVATE and are part of `series()` or `parallel()` API's. 

### Task functions
Each gulp task is an asynchronous JavaScript function. Each function accepts an error-first callback OR RETURNS a stream, a promise, an event emitter, a child process, or an observable.

The basic syntax:
```Javascript
function task(){
	return gulp.src('file input path')
		.pipe()
		.pipe()
		.pipe()
		.pipe(gulp.dest('output path'))
}
```
Thus the task function returns a value, otherwise gulp wouldn't know the task is finished. The `src()` method locates the files it has to perform the task onto. Each pipe can be a part of the task. When all tasks are performed the resulting value is piped through the `dest()` method which produces the final value in the desired location. 

### Task order: Series and parallel
To run tasks in a certain order on the same files you can use `series()`. The second function will run only after the first one is complete. Or you can have the tasks run in parallel.
```javascript
series(fn1, fn2)
parallel(fn1, fn2)

watch(`glob`, series(fn1, fn2))
```

## Paths and globs
### Project folder structure
Here is an example directory structure in which the source code (src) is separated from temporary precompiled assets (.tmp). The final distribution folder is dist. The src folder can contains higher level languages such as jade, typescript and scss. The `.tmp` folder contains compiled js, css and html files that can be run on a development server. The dist folder contains only concatenated and minified files optimized to be served in production.

Take a good look at the path of the (s)css and js files you are working with, as well as the folder structure. It is advisable to store those paths into VARIABLES for easier references in the various gulp function.

NOTE: it is not recommended to use NODEJS PATH methods inside globs because of the escape char \\ notation and / segmentation.

### GLOBS
Globs are strings of literal characters to MATCH filepaths. Globbing is the act of locating files on a filesystem using one or more globs. The example GLOB below will match all `.js` files inside the public/scripts folder AND all subfolders.
```javascript
let jsFiles = './app/public/scripts/**/*.js'
```
The gulp API functions such as `src()` expect a glob or an ARRAY of GLOBS `src(['glob', glob'])`. When an array of globs is used, files are matched in array order. This is especially useful for excluding files (negative globs).

#### Glob patterns
Single star <*> matches all files in the directory or all files of a specific type. The double star <**> matches all files across segments, thus inside nested folders.
```
'*.js'
'.app/**'
'.app/scripts/**/*js'
```
The NEGATIVE <!> glob can exclude files or folders when part of an array of globs. The first glob in the array matches files, the second one excludes some of the result. To exclude all files in that folder use **.
```
['.app/scripts/**/*js', '!.app/scripts/vendor/**']
['**/*js', '!node_modules/**']
```
To exclude entire folders:
```
[
'src/**/*',         // select all files
'!src/**/_*/',      // exclude folders starting with '_'
'!src/**/_*/**/*'   // exclude files/subfolders in folders 
]
```
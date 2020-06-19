# Common Gulp Task
Table of contents
- [Common Gulp Task](#common-gulp-task)
	- [CSS related tasks](#css-related-tasks)
		- [SASS](#sass)
		- [Sourcemaps](#sourcemaps)
		- [Autoprefixer](#autoprefixer)
		- [Broweser Sync](#broweser-sync)
		- [UNCSS](#uncss)
	- [Javascript related tasks](#javascript-related-tasks)
		- [Modernizer](#modernizer)
		- [Terser](#terser)
		- [Webpack](#webpack)
	- [Watch files](#watch-files)
	- [Auto-inject CSS and JS files](#auto-inject-css-and-js-files)
	- [Other gulp tasks](#other-gulp-tasks)
		- [Sprites](#sprites)
		- [Line-ending-correction.](#line-ending-correction)
		- [Manipulating project files](#manipulating-project-files)
			- [Copy files and folders](#copy-files-and-folders)
			- [Delete files and folders](#delete-files-and-folders)
	- [References](#references)
  

Think carefully about the tasks you want to have performed and in which order. A well thought-through process will make the actual programming easier.

## CSS related tasks
### SASS 
Bundle the partial `.scss` files into a single `.css` file each time you save changes to a file. Then inject those styles with `Browser-sync` into to the page. It is recommended to add the SASS LOGS to the code, so you can easily find where you may have made a mistake.
```javascript        
.pipe(sass().on('error', sass.logError))
```
### Sourcemaps
Sourcemaps allow you to source the exact `_partial.scss` file where you have to make a change. Gulp has some sourcemap capability built-in but the `gulp-sourcemaps` plugin is more advanced. In GULP `src()` and `dest()` you can add an options object as second argument to add sourcemaps and that's it!
```	
src(<glob>, { sourcemaps: true })
dest(<glob>, { sourcemaps: true })
```
When using the GULP-SOURCEMAPS package you INITIATE it before the first `.pipe()` and WRITE before the `dest()`
```
src()
.pipe(sourcemaps.init())
...
...
...
.pipe(sourcemaps.write())
pipe(dest());
```
### Autoprefixer
Since you as a developper will probably work with the newest browser version you can leave this step for the build process. But it doesn't hurt either to do it in development. Add the BROWSERLIST object to customize what to support.

### Broweser Sync
After the stream reached it's destination at `.pipe(dest())` you can add the `.pipe(bs.stream())` method to inject new css into the browsers.

### UNCSS
Uncss removes the css selectors that you did not use in your project. Use the `gulp-uncss` plugin. However, this plugin does not seem to work with template html files.

## Javascript related tasks
### Modernizer
This plugin checks your css code for features that are not 100% supported by all browsers and adds classes to the header of the html. Use in combination with differentiated css styles.

Run before JS compilation and import to the `vendor.js`.

### Terser
The `gulp-uglify` package is does not support ES6 and you would have to work around it with Babel first to convert your JS into ES2015: `(.pipe(babel()).pipe(uglify()))`.

Terser is a better option.

### Webpack
Webpack is capable of doing almost all GULP tasks but in combination with GULP you use it for compiling the JS file into a `app-[bundle].js` and `vendor-[bundle].js`. See notes on webpack.

## Watch files
The watch task is asynchronous and it is best to wrap multiple watch tasks into a function together with the browser-sync server configuration. You can watch for file changes and run a GULP TASK function. Or you can run the watch task for changes without a gulp task and add an event listener to it.
```javascript 	
watch('glob', function);
watch('*.html').on('change', bsReload);
```

## Auto-inject CSS and JS files
Instead of manually adding the css and js script tags to your html you can automate this process by using GULP-INJECT. See doc for details and setup.

## Other gulp tasks
### Sprites
Automatically generate sprites from image files, see notes on sprites.

### Line-ending-correction.
If you work on different operating systems on the same project and push files to GitHub, take into account that the line-endings in files are not identical. To avoid problems with this use the package `gulp-line-ending-corrector`.

### Manipulating project files
#### Copy files and folders
Copying and deleting files is a simple stream whereby a GLOB is used to match the files that have to be processed. The `dest('glob', {options})` is the destination path. In the options you specifcy the base: 'app' folder from where the recursion starts. 
```	
src('./app/**/*, {base: '.'})
dest('build')

//-> Will result in build/app/<folder1>, build/app/<folder2>. etc.
```
#### Delete files and folders
It's often best to work with CLEAN or empty folders instead of overwriting existing ones. The `del()` method can be part of a delete function and accepts a GLOB to know what to delete: `del('glob');`

## References
- [Gulp introduction](https://www.sitepoint.com/introduction-gulp-js/)
- [Gulp CSS tasks](https://www.sitepoint.com/automate-css-tasks-gulp/)
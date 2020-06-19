## Build task with Gulp
Table of contents
- [Build task with Gulp](#build-task-with-gulp)
- [Clean start](#clean-start)
- [Concatenate CSS Reset with main css file](#concatenate-css-reset-with-main-css-file)
- [Minification](#minification)
- [Image tasks](#image-tasks)
- [Revisioning](#revisioning)
- [Replace-in-file](#replace-in-file)
- [End clean](#end-clean)

The build of the project is the final production code that goes to the server. The most common tasks to run on the development files are: copy to dist folder, optimize images, minfy/uglify, concatenate files, update paths inside files, add hashes to files.

Note that in build you use diferent GLOBS as you only select the finished endpoint files for html, css and js.

## Clean start
Start with a clean directory so remove existing dist folders by using `del()`. 

## Concatenate CSS Reset with main css file
Concatenate various css files into ONE minified css file using the `concat()` method from the GULP-CONCAT package. In the `src()` you define the array of files to concatenate. In the `concat()` method you can specify the filename of the resulting css file.
```	
src(['','',''])
.pipe(concat('main.min.css'))
.pipe(cssnano())
```
Note that CSS3 Animations may brake after minification. Fix this by using the options: 
```
reduceIdents: { keyframes: false }, discardUnused: { keyframes: false }
```
## Minification
Minify the css files using the package GULP-CSSNANO and the method `.pipe(cssnano());`. 

The Same process for the js files with GULP-UGLIFY and the method `.pipe(uglify());`. 

The GULP-HTMLMIN package with `.pipe(htmlMin());` accepts an OBJECT with options: 
```
htmlMin({ 
	collapseWhitespace: true, removeComments: true
})
```
## Image tasks
The GULP-IMAGEMIN package minifies the images and comes bundled with the following lossless optimizers: gifsicle, jpegtran, optipng, and svgo. 

Using the `imagemin()` method is enough but you can customize further. See documentation for options.

## Revisioning
The benefit of adding content hashes has to do with server caching and load times. You indicate to the server to cache the main files and never reload them again, thus speeding up the site.

Only when a new file is detected, a new load happens.

The GULP-REV package adds asset revisioning by appending a CONTENT HASH to filenames. Do this after minification and other tasks.

To log the changes and original filenames you can add another pipe that stores the `rev-manifest.json` in the folder you want.

Then in another function you use that data to update the HTML file where the hashed js and css files are referenced. Using the `rev-replace()` method from the REV-REPLACE package.
```javascript
.pipe(rev())
.pipe(dest())
.pipe(rev.manifest())   // produces rev-manifest.json
.pipe(dest())

function revCssUpdate(){
	let manifest = src(distCssFolder + '/rev-manifest.json');
	return src(distHtml)
		.pipe(revReplace({ manifest: manifest }))
		.pipe(dest(distFolder));
};
```
## Replace-in-file	
Copy the index.html and adjust the PATHS/FILENAMES/attributes if necessary with the REPLACE-IN-FILE package. 

## End clean
End the build by removing unnecessary files that may have been generated. The final build task can be stored as function or variable:
```javascript
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
```
# Gulp + Webpack
Table of contents
- [Gulp + Webpack](#gulp--webpack)
	- [Use case](#use-case)
	- [Install](#install)
	- [File and folder structure](#file-and-folder-structure)
		- [Bundling js modules](#bundling-js-modules)
		- [External packages](#external-packages)
	- [Gulp task: bundle with Webpack](#gulp-task-bundle-with-webpack)
	- [Configure Webpack](#configure-webpack)

## Use case
Webpack makes it a lot easier to manage dependencies, especially for more complex projects. When using Webpack together with the Gulp taskrunner we only use parts of the Webpack capabilities. In this setup Webpack is only used as a transpiler and bundler for JS files using the BABEL loader.

## Install
IMPORTANT: setup webpack LOCALLY only to avoid conflicts! You already learned the hard way.
```
`npm install --save-dev webpack webpack-cli`	

//NPM script:	
"webpack": "webpack"

npm run webpack	
```
Configure the `webpack.config.js` in the PROJECT root folder: see documentation for details. 

## File and folder structure
### Bundling js modules
You can use a TEMP folder in development where the compiled js file is located together with the temporary index.html and main.css files. Or let all files live next to each other as long as you don't confuse the file you develop your code into versus the file that is bundled by webpack and used in the html.

In webpack.config.js: 
```javascript  
output: {
	path: path.resolve(__dirname, './app/temp'),
	filename: '[name]-bundle.js' 
}
```
### External packages
The idea of using external packages that are intertwined with your code goes against the webpack philosophy of creating seperate modules for each functionality. See [shimming](https://webpack.js.org/guides/shimming/).

It is better to manage packages seperately and bundle into a vendor.bundle.js with seperate vendor.js ENTRY POINT.


## Gulp task: bundle with Webpack
To use Webpack as a JS Bundler create a GULP TASK. A function `jsCompile(cb)`, that takes a callback function to report to Gulp when the task is done running.

Inside the function you run just one method: `webpack()`:
```javascript
require('webpack');
const webpackConfig = require('webpack.config.js');
function jsCompile(cb){
	webpack(webpackConfig, (err, stats) =>{
		if(err){ log };
		log(stats); 
		cb();
	})
}
```	
## Configure Webpack
This is preferable to setting up GULP with BABEL manually because webpack makes it easier to automatically track and transpile imports.

See documentation for install instructions: [babel-loader](https://github.com/babel/babel-loader).

You need three components: `babel-loader` `@babel/core` `@babel/preset-env`.

Next, set the webpack.config.js MODULE - RULES
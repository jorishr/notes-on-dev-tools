# Webpack tasks and loaders
Table of contents
- [Webpack tasks and loaders](#webpack-tasks-and-loaders)
	- [CSS and SCSS Files](#css-and-scss-files)
	- [Manage Vendor Packages](#manage-vendor-packages)
	- [Content Hashing and Cache Busting](#content-hashing-and-cache-busting)
	- [HTML Webpack Plugin](#html-webpack-plugin)
	- [Production versus Development](#production-versus-development)
		- [Webpack dev server](#webpack-dev-server)
		- [Split and merge config files](#split-and-merge-config-files)
		- [Production: Start clean](#production-start-clean)
		- [Extract CSS for production](#extract-css-for-production)
		- [Handling Images in production](#handling-images-in-production)
		- [Minify the main files](#minify-the-main-files)

Loaders allow webpack to process other types of files than js and convert them into valid modules that can be consumed by your application and added to the dependency graph.

Install the respective loaders through NPM.

## CSS and SCSS Files
IMPORTANT: 
- import the main.scss into the INDEX.JS
- node-sass needs to be installed

Loaders have two properties in the webpack configuration:
- The TEST property identifies which file or files should be transformed, using a RegExp. Files that end in .scss: `test: /\.scss$/`. 
- The USE property indicates which loader should be used to do the transforming.
`use: [loader3, loader2, loader1]`. The order is important!
```
"style-loader", //  3. inject styles into DOM
"css-loader",   //  2. turn css into commonjs
"sass-loader"   //  1. turn sass into css
```
Thus the scss is compiled into regular css through sass-loader, the css-loader puts into commonjs inside the index.js file. The style-loader injects a style into the HTML so the browser can import the css styles.

You still have to import the `main.bundle.js` into the HTML file.


## Manage Vendor Packages
The vendor.js is used to import external libraries such as Bootstrap or jQuery. Put the vendor.js in the `./src` folder and simply import the packages.

Webpack will automatically update the index.html with the required script tags.

## Content Hashing and Cache Busting
To avoid issues with browser caching during the dev or build process you can add content hashes to the main files. Each time the files have changed webpack adds a new hash and updates the references in other files. This process is called cache busting.

To add this functionality add `[contenthash]` to the filename in output: 
`filename: '[name].bundle.[contenthash].js'`

In order to have the HTML update each time there is a new contenthash generated you have to use an HTML template and a plugin to let the HTML file be build by webpack.

## HTML Webpack Plugin
Install: `npm install --save-dev html-webpack-plugin`
- require in the package in the webpack config file
- PLUGINS in the webpack config accepts an ARRAY of plugins.
```	
new htmlWebpackPlugin({ template: 'path/template.html' })
```
The plugin will generate an index.html file in the dist folder with the updated contenthash AND use the template.html content as a basis.


## Production versus Development
### Webpack dev server
Install and run the webpack-dev-server. It will automatically update the bundle files and inject it into the browser, just as Gulp+BrowserSync.
```
npm install --save-dev webpack-dev-server

//NPM script
"start": "webpack-dev-server --config webpack.dev.js --open
```
### Split and merge config files
Install the webpack-merge package and split the webpack.config.js into three files: `npm install --save-dev webpack-merge`.

In the COMMON webpack config file:
- define entry points
- define output
- html-loader and file-loader

In the DEV webpack config file:
- mode: 'development
- html plugin
- scss loaders

In the PROD webpack config file:
- mode: 'production'
- optimization
- style plugins and loaders

### Production: Start clean
Start each build with a clean dist folder with the Clean Webpack Plugin: `npm install --save-dev clean-webpack-plugin`.

### Extract CSS for production
Injecting CSS through JS is not good for performance in the browser. Thus generate a normal `.css` file through webpack in the build process. A link tag will injected into the HTML as well: `npm install --save-dev mini-css-extract-plugin`.

This plugin comes with a loader you can use to adjust the style-loader rules. 

### Handling Images in production
Files and images will get copied from the assets folder to the dist folder with a contenthash added. Also the filepaths in the final HTML will be updated automatically. The HTML loader will search the HTML file for files and images. Once found, Webpack will handle all those files through the `require('')` method.

But for this to work you need an additional loader: `file-loader`. The file-loader will copy the files from the asset folder to the dist folder with a specific name that you can configure through the options. Other options would be compression, for example. See documentation for full list.
`npm install --save dev html-loader file-loader`
```javascript	
//common config file
test: html
use: html loader

test: files
use: {
	loader: file-loader
	options: {
		name:[name].[hash].[ext]
		outputPath
		}
	}
```
### Minify the main files
Optimize CSS/JS and HTML files through minification: `npm install --save-dev optimize-css-assets-webpack-plugin`.

By adding the optimize-css plugin the default webpack settings for the build process are overruled. That is why you have to manually configure the terser-plugin to minify JS. Since the plugin is part of webpack you don't have install it through NPM. You can also use other plugins such as uglify but that requires an additional npm install.
```
optimization: {
	minimizer: [
		new OptimizeCssAssets()	// css minification
		new TerserPlugin()		// js minification
		new HtmlWebpackPlugin()	// html template+min
			template
			minify:{collapsewhite: true, removeCom:true
```
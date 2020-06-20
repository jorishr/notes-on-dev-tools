# Webpack module bundler
Table of contents
- [Webpack module bundler](#webpack-module-bundler)
	- [About Webpack](#about-webpack)
	- [Webpack setup](#webpack-setup)
		- [Install](#install)
		- [File and folder structure](#file-and-folder-structure)
		- [Configuration options](#configuration-options)

## About Webpack
Webpack is an open-source JavaScript module bundler. Webpack takes modules with dependencies and generates static assets representing those modules. 

It allowes web developers to use a modular approach for their web application development purposes. The bundler can be used from the command line, or can be configured using a config file which is named webpack.config.js.

Through "loaders", modules can be CommonJs, AMD, ES6 modules, CSS, Images, JSON, Coffeescript, LESS, ... and your custom stuff. Thus at it's core Webpack manages all dependencies and bundles all modules (mainly css, js) into single files like main.css or main.js. It also forms part of the React app setup.

By default WEBPACK is a JS bundler and only supports JS and JSON files. That can be extended to CSS or other filetypes with LOADERS under MODULE {rules:[{}]}. PLUGINS can be installed to add extra task functionality.

There is a distinction between code used and generated during the development process and the build process. The latter is the final version that goes to the server and is minified for optimal performance. This build process requires a seperate setup through Gulp and/or Webpack.

## Webpack setup
### Install
- Install: `npm install --save dev webpack webpack-cli`
- Npm Scripts: 
``` 
start: webpack --config webpack.dev.js
build: webpack --config webpack.build.js
```
### File and folder structure
Webpack will take control over CSS, HTML and JS files through the index.js file, by default in the `./src/index.js`. You can use a template.html file that serves as a basis to build the final HTML with all css and js file links. No need for a temp folder as with GULP. Webpack runs its own dev-server that does most of the work from memory.

Thus you end up with only a `./src` folder where you have your working files. The `./dist` folder where Webpack puts its output files will only be generated when you run the final build process.

The dist folder does show up if you run default settings. 

For the JS files you use modules that export the relevant functions and you import them in the modules that depend on them. With webpack you can use ES6 syntax.You put the calling of the main JS commands for starting the app in the index.js and from there onwards Webpack will sniff through app.js and the individual modules to built a dependency tree AND manage it from now onwards.

The output file is a main.js (or the filename you specify in the config file) in the dist folder (only generated in production mode when so configured). 

The name of the entry point is used in the build of the bundled.js file with `[name].bundle.js`. Thus you get for example main.bundle.js or app.bundle.js. Best to use main.bundle.js to avoid confusion with the app.js in the assets or script folder. 

### Configuration options
See [webpack.config_example.js](./webpack.config_example.js) for working example.

Webpack can run in Mode: 'development' or Mode: 'build'. In the build mode it automatically performs tasks on js files, such as minification. 

Entry points can defined and indicate the main js files that have to be evaluated to build a dependency graph from. Thus all files that are directly or indirectly needed to perform all functions defined in that main file. This dependency graph will include other js files, images, html and css.

Output is the output path and filename structure you want to use for the end-result of all the webpack tasks. 

Modules contains the rules for loaders to be used on certain files. Thus you 'test' for conditions to SELECT FILES and 'use' a specific set of LOADERS to perfform tasks on those files.

Plugins extend the functionality of webpack.

Optimization is used to define the configuration for various optimization tasks such as minifying, making use of plugins.
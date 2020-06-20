# Node Package Manager
Table of contents
- [Node Package Manager](#node-package-manager)
- [About NPM](#about-npm)
	- [Adding dependencies](#adding-dependencies)
		- [NPM Prune](#npm-prune)
	- [NPX](#npx)
	- [NPM Versioning](#npm-versioning)
	- [NPM Troubleshooting](#npm-troubleshooting)

# About NPM
Lot's of package have already been written and are available through the Node Package Manager. A package manager holds all the available code packages and can manages updates. NPM contains:

- specific Node packages for automation, build tools and server tasks
- other JS and CSS packages (JQuery, Bootstrap, Normalize, etc.)
- lot's of crazy, useless and redundant packages 

For each new project you can select and use different packages that are stored the file local `packages.json` file. The  `npm init` command will walk you through the setup of the packages.json file in the root project directory.

The packages.json needs to be included in the git repo. If you need to work on a different machine you can simply run `<npm install>` in the project folder with this package.json file and NodeJs will use the json file to download all the necessary packages/modules.

The `node_modules` folder is ignored by GIT, all the info it needs is in the packages.json file

The package.json records the minimum version your app needs. If you update the versions of a particular package, the change is not going to be reflected here.

The package-lock.json records the exact version of each installed package which allows you to re-install them. Future installs will be able to build an identical dependency tree. 

By default the scripts in package.json can be executed and this a security concern as it could contain a virus (event-stream vulnerability).

To prevent this edit the global npm config settings: `npm config set ignore-scripts true`.

## Adding dependencies
In the local project folder: 
```
npm install jquery normailize.css --save 
// those packages will be bundled into the project code. 

npm i <package>
//shorthand

npm install gulp --save-dev 
// part of the devDependencies, required for development and not part of the final production code

npm i -D <package>
//shorthand
```
Development dependencies are intended as development-only packages that are not needed in production. For example testing packages, webpack or Babel.

By default it is assumed you are in development mode. Thus when you go in you run `npm install` both development dependencies and normal dependencies are installed.

When using the `--production` flag the evelopment dependencies are ignored.

### NPM Prune
This command removes unused npm packages automatically. During development you may have tried packages that are still lingering around, so you can apply this command at the end of development process to clean up lighten the node_modules.

## NPX
Along with npm 5.2 came a new utility, npx, to help with a few popular npm binary execution tasks and give your workflow a boost. Normally, if you want to run a binary that's installed locally with your project instead of globally on the machine, you'd have to type the following: `./local/path/binary`.

With NPX:
```
npx cowsay 'hello' 	
// runs a locally installed binary without having to install and keep up-to-date a global installation

npx http-server		
// starts a server in the local dir
```
Using NPX you can run specific version of let's say GULP for each project.

## NPM Versioning
When you make a new release, you don't just make up a version number as you please. Follow guidelines:
- you up the major version when you make incompatible API changes.
- you up the minor version when you add functionality in a backward-compatible manner.
- you up the patch version when you make backward-compatible bug fixes.

Thus 7.4.5 means major version 7, minor update 4 and patch version 5.

In the NPM package.json you can indicate which updates are allowed:
- if you write `^0.13.0` then running npm update is allowe update to patch and minor releases: 0.13.1 , 0.14.0 and so on. For full list see NPM docs.

## NPM Troubleshooting
Packages will trow ENOENT errors.
Possible solutions to try:
- run the package manually: 
```
node node_modules/pngquant-bin/lib/install.js
node node_modules/zopflipng-bin/lib/install.js
node node_modules/jpegoptim-bin/lib/install.js
node node_modules/optipng-bin/lib/install.js
node node_modules/jpeg-recompress-bin/lib/install.js

- rebuil the package: `npm rebuild pngquant-bin`
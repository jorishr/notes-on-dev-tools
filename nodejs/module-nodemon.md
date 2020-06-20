# Node Monitor
Nodemon can run as an npm script that executes your JS file and watches continously for updates. You can use it in combination with BABEL to auto-transpile to ES2015 JS code, since some features are not supported by NodeJs (ES6 imports).

Install: `npm install nodemon --save-dev`

In package.json add NPM script:
```javascript
"scripts": {
    "start": "nodemon --exec babel-node src/index.js",
}
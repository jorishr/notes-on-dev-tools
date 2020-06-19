const path = require('path');   

const webpack = {
  mode: 'development',        //  or build
  entry: {
    main: './src/index.js',   //  entry point for main js file of the project
    vendor: "./src/vendor.js" 
  },
  output: {
    path: path.resolve(__dirname, 'dist'),  
    filename: '[name].bundle.js'
  },                          //  creates an absolute path in the project(NPM) root folder
  module: {
    rules: [                  //  array of objects that have 'test' and 'use' properties
      {
        test: / /,            //  regEx to test for which files to use, single file -> '' 
        use: ['loaders']      //  array of loaders to use OR objects with loader + options
      }
    ]
  },
  optimization: {},
  plugins: []
};
module.exports = webpack;

/*  
  NOTE: a webpack.config file can get very large very fast and not all tasks 
  have to be performed during the development process. 
  
  Thus, create three files: 
  webpack.common.js, webpack.dev.js and webpack.build.js
  the common.js is shared by both dev and build. 
  
  For example, during dev you use a dev-server that is not needed in build,
  while during dev we don't need to minify our code.

  Use different NPM scripts to either run in dev mode or buil mode.
*/
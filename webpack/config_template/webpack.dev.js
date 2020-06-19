// const path = require("path");
const   common = require('./webpack.common'),
        merge = require('webpack-merge'),
        htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.scss$/,   
                use: [
                    'style-loader', //  3. inject styles into DOM
                    'css-loader',   //  2. turn css into commonjs
                    'sass-loader'   //  1. turn sass into css
                ]
            }
        ]
    },
    plugins: [
       new htmlWebpackPlugin({
           template: './src/template.html'
       }) 
    ]
});
const   common = require('./webpack.common'),
        merge = require('webpack-merge'),
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        {CleanWebpackPlugin} = require('clean-webpack-plugin'),
        MiniCssExtractPlugin = require('mini-css-extract-plugin'),
        OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
        TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.scss$/,   
                use: [
                    MiniCssExtractPlugin.loader,   //  3. extract css into .css files
                    'css-loader',           //  2. turn css into commonjs
                    'sass-loader'           //  1. turn sass into css
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css'
        }),
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
            new HtmlWebpackPlugin({
                template: './src/template.html',
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true                    
                }
            })
        ]
    }
});
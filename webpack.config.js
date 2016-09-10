"use strict";

let webpack = require('webpack');
let PROD = JSON.parse(process.env.PROD_ENV || '0');


module.exports = {
    entry: {
        test : "./tests/suite.js",
        eBus : './build.js',
        nodeBuild: './build.js'
    },
    output: {
        path: PROD ? __dirname + '/release' : __dirname + '/build',
        filename: PROD ? "[name].min.js" : "[name].js"
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ] : [],
    devtool: 'source-map'
};
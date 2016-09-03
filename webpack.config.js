module.exports = {
    entry: {
        test : "./tests/suite.js",
        eBus : './build.js',
        nodeBuild: './build.js'
    },
    output: {
        path: __dirname + '/build',
        filename: "[name].js"
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    devtool: 'source-map'
};
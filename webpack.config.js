module.exports = {
    entry: "./tests/suite.js",
    output: {
        path: __dirname + '/build',
        filename: "test.js"
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    devtool: 'source-map'
};
const path = require('path');
const webpack = require("webpack");

module.exports = {
    entry: {
        'socketIndoorLocationProvider': './src/index.ts',
        'socketIndoorLocationProvider.min': './src/index.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'SocketIndoorLocationProvider',
        libraryTarget: 'umd'
    },
    devtool: 'source-map',

    module: {
        //noParse: /socket.io-client/, // Try to fix nodejs use
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    externals: {
        'socket.io-client': {
            commonjs: 'io',
            commonjs2: 'io',
            amd: 'io',
            root: 'io'
        }
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            sourceMap: true
        })
    ]
};
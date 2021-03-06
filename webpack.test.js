'use strict';

const path = require( 'path' );

module.exports = {
    mode: 'development',
    entry: {
        unittest : './test/unittest.js',
    },
    output: {
        filename: "[name].js",
        path: __dirname + '/dist',
    },
    node : false,
    module: {
        rules: [
            // Something has changed in Webpack, to be investigated
            {
                test: [
                    path.resolve( __dirname, 'index.js' ),
                ],
                use: 'null-loader',
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-env' ],
                        plugins: [ "@babel/transform-object-assign" ],
                    },
                },
            },
        ],
    },
    externals : {
        'futoin-asyncsteps' : {
            root: "$as",
            amd: "futoin-asyncsteps",
            commonjs: "futoin-asyncsteps",
            commonjs2: "futoin-asyncsteps",
        },
        'futoin-request' : {
            root: "$as_request",
            amd: "futoin-request",
            commonjs: "futoin-request",
            commonjs2: "futoin-request",
        },
    },
};

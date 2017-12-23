'use strict';

const path = require( 'path' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );

module.exports = {
    entry: {
        'futoin-request': './lib/browser.js',
    },
    output: {
        library: {
            root: "$as_request",
            amd: "futoin-request",
            commonjs: "futoin-request",
        },
        libraryTarget: "umd",
        filename: "[name].js",
        path: __dirname + '/dist',
    },
    node : {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        process: 'mock',
        zlib: 'empty',
        crypto: 'empty',
        path: 'empty',
    },
    module: {
        rules: [
            {
                test: [
                    path.resolve( __dirname, 'node_modules/tough-cookie/lib/pubsuffix.js' ),
                    path.resolve( __dirname, 'node_modules/uuid/v1.js' ),
                ],
                use: 'null-loader',
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ 'babel-preset-env' ],
                        plugins: [ "transform-object-assign" ],
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
        sshpk: '{}',
        ajv: '{}',
        'har-validator' : '{}',
        'http-signature': '{}',
        'mime-types': '{}',
        hawk: '{}',
        aws4: '{}',
        'aws-sign2': '{}',
        randomfill: '{}',
        'public-encrypt': '{}',
        'create-ecdh': '{}',
        'tunnel-agent': '{}',
        'oauth-sign': '{}',
    },
    plugins: [
        new UglifyJsPlugin( {
            sourceMap: true,
        } ),
    ],
};

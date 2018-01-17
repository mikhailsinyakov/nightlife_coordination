const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './app/src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
             test: /.jsx?$/,
             loader: 'babel-loader',
             exclude: '/node-modules/',
             query: {
                 presets: ["react", "env"]
             }
        }]
    }
};
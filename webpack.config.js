const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './app/src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            use: 'babel-loader'
        }]
    },
    mode: 'development'
};
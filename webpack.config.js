const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        root: path.resolve(__dirname, 'src'),
        extensions: ['', '.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
      }),
    ],
    devtool: 'source-map',
    cache: true,
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loaders: ['babel-loader'],
        }, {
            test: /\.glsl$/,
            loaders: ['text-loader'],
        }, {
            test: /\.ts$/,
            exclude: /(node_modules|bower_components)/,
            loaders: ['ts-loader']
        }, {
            test: /\.png$/,
            loader: 'file?mimetype=image/png&name=public/resources/[name].[ext]',
        }],
    },
    entry: [
        path.resolve(__dirname, 'src/index.ts'),
    ],
    devServer: {
      //quiet: true,
      historyApiFallback: true,
      hot: true,
      port: process.env.PORT || 8080,
      host: '127.0.0.1',
      noInfo: false,
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
    },
};

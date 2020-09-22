/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const path = require('path');

module.exports = () =>
    merge.smartStrategy({
        plugins: 'prepend'
    })(common, {
        mode: 'development',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            publicPath: '/'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development')
            }),
            new CaseSensitivePathsPlugin(),
            new WriteFilePlugin(),
            new CleanTerminalPlugin()
        ],
        devServer: {
            compress: true,
            host: '0.0.0.0',
            port: 9000,
            historyApiFallback: true,
            clientLogLevel: 'none',
            contentBase: path.join(__dirname, 'public'),
            watchContentBase: true,
            hot: true,
            inline: true,
            overlay: true
        },
        devtool: 'inline-source-map',
        performance: {
            hints: false
        }
    });

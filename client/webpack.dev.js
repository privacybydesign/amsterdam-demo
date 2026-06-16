/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const path = require('path');

module.exports = () =>
    merge(common, {
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
            new CaseSensitivePathsPlugin()
        ],
        devServer: {
            compress: true,
            host: '0.0.0.0',
            port: 9000,
            historyApiFallback: true,
            hot: true,
            static: {
                directory: path.join(__dirname, 'public'),
                watch: true
            },
            devMiddleware: {
                // Replaces the former write-file-webpack-plugin behaviour.
                writeToDisk: true
            },
            client: {
                logging: 'none',
                overlay: true
            }
        },
        devtool: 'inline-source-map',
        performance: {
            hints: false
        }
    });

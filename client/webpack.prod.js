/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = () =>
    merge.smartStrategy({
        plugins: 'append'
    })(common, {
        mode: 'production',
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: 'static/js/[name].[hash:8].js',
            chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('production')
            }),
            new CleanWebpackPlugin()
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    test: /\.js(\?.*)?$/i,
                    sourceMap: true,
                    cache: true,
                    parallel: true,
                    terserOptions: {
                        compress: {
                            drop_console: true
                        }
                    }
                })
            ]
        }
    });

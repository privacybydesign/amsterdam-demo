/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = () =>
    merge(common, {
        mode: 'production',
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: 'static/js/[name].[contenthash:8].js',
            chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
            clean: true
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
            })
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: true
                        }
                    }
                })
            ]
        }
    });

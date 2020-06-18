/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

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
        plugins: [new CleanWebpackPlugin()],
        externals: [nodeExternals()],
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

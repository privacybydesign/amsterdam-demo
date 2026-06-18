/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: [path.resolve(__dirname, 'src/index.tsx')],
    module: {
        // webpack 5's static export analysis is stricter than webpack 4's for CJS
        // interop (e.g. `import { sizes }` from @amsterdam/asc-ui's CJS build and
        // default imports of the CommonJS @privacybydesign/irma-* packages). These
        // resolve correctly at runtime via interop, so we don't fail the build on them.
        strictExportPresence: false,
        rules: [
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(js|jsx)?$/,
                include: [
                    path.resolve(__dirname, 'node_modules/@amsterdam'),
                    path.resolve(__dirname, 'node_modules/@privacybydesign')
                ],
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource'
            },
            {
                // Load fonts
                test: /\.(woff(2)?|otf|ttf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/fonts/[name][ext]'
                }
            }
        ]
    },
    plugins: [
        // webpack 5 no longer shims process automatically; packages like proxy-from-env
        // (pulled in by axios) reference process.env at runtime in the browser.
        new webpack.ProvidePlugin({
            process: 'process/browser.js'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            inject: true,
            favicon: './public/favicon-32x32.png'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/'),
                    to: '',
                    globOptions: {
                        // HtmlWebpackPlugin already emits the favicon.
                        ignore: ['**/favicon-32x32.png']
                    }
                }
            ]
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        // webpack 5 no longer polyfills node core modules automatically. These are
        // pulled by browser-targeted libs (eventsource via irma-client, vfile via
        // react-markdown) and were implicitly polyfilled under webpack 4.
        fallback: {
            path: require.resolve('path-browserify'),
            util: require.resolve('util/'),
            url: require.resolve('url/'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            buffer: require.resolve('buffer/')
        },
        plugins: [new TsconfigPathsPlugin()]
    }
};

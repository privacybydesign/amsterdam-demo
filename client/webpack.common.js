/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = {
    entry: [path.resolve(__dirname, 'src/index.tsx')],
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(j|t)sx?$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'awesome-typescript-loader'
                }
            },
            {
                // Load fonts
                test: /\.(woff(2)?|otf|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'static/fonts/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            inject: true,
            favicon: './public/favicon.png'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/'),
                    to: ''
                }
            ]
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        plugins: [new TsConfigPathsPlugin()]
    }
};

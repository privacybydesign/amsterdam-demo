module.exports = {
    babelrc: false,
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                useBuiltIns: 'usage',
                corejs: 3,
                targets: {
                    esmodules: false,
                    browsers: ['> 1%', 'last 2 versions', 'not ie <= 11']
                }
            }
        ],
        '@babel/preset-typescript',
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-modules-commonjs',
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-transform-reserved-words',
        'babel-plugin-styled-components',
        'react-hot-loader/babel'
    ]
};

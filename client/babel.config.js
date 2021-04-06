module.exports = {
    babelrc: false,
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
                modules: false
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

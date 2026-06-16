module.exports = api => {
    // Jest needs CommonJS modules; webpack builds keep ES modules for tree-shaking.
    const isTest = api.env('test');

    return {
        babelrc: false,
        presets: [
            [
                '@babel/preset-env',
                {
                    useBuiltIns: 'usage',
                    corejs: 3,
                    modules: isTest ? 'commonjs' : false
                }
            ],
            '@babel/preset-typescript',
            '@babel/preset-react'
        ],
        plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-transform-reserved-words',
            ['babel-plugin-styled-components', { pure: true }]
        ]
    };
};

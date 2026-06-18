module.exports = api => {
    // Jest needs CommonJS modules; webpack builds keep ES modules for tree-shaking.
    const isTest = api.env('test');

    return {
        babelrc: false,
        // Detect CJS files (no import/export) as scripts so useBuiltIns:'usage' adds
        // require() polyfills instead of import statements. Without this, babel injects
        // ESM import polyfills into already-compiled CJS packages (@amsterdam, @privacybydesign),
        // causing webpack 5 to treat them as ES modules where `exports` is undefined.
        sourceType: 'unambiguous',
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

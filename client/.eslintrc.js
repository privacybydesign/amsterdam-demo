module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
        'babel',
        'typescript',
        '@typescript-eslint',
        'jest',
        'prettier',
        'jsx-a11y',
        'import',
        'react',
        'react-hooks'
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier/babel',
        'prettier/react',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    env: {
        es6: true,
        browser: true,
        node: true,
        jest: true
    },
    globals: {
        window: true
    },
    parserOptions: {
        sourceType: 'module'
    },
    rules: {
        'no-console': 1,
        'react/jsx-props-no-spreading': 0,
        'react/jsx-wrap-multilines': 0,
        'react/prop-types': 0,
        'import/prefer-default-export': 0,
        'react-hooks/rules-of-hooks': 2,
        'react-hooks/exhaustive-deps': 1,
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-empty-interface': 0
    }
};

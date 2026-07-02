const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const importPlugin = require('eslint-plugin-import-x');
const prettierRecommended = require('eslint-plugin-prettier/recommended');
const globals = require('globals');

// Flat-config port of the old .eslintrc.js (+ .eslintignore). Intent preserved:
// - eslint:recommended + typescript-eslint recommended
// - react/recommended, jsx-a11y/recommended, react-hooks
// - the import plugin available (only prefer-default-export is configured; the
//   original never enabled import/recommended, which would break on the @ path aliases)
// - prettier integration last
// - the same rule relaxations, and specs left unlinted (as .eslintignore did)
module.exports = tseslint.config(
    {
        ignores: [
            '.vscode/**',
            'dist/**',
            'node_modules/**',
            'coverage/**',
            '**/*.d.ts',
            // Build/tooling config is CommonJS and not part of the TS source graph.
            '*.config.js',
            'webpack.*.js',
            'jest.setup.js',
            // Vendored third-party script (lightningjs loader); not project source.
            'src/services/lightning.js',
            // Spec files were excluded from linting by the original .eslintignore.
            '**/*.spec.{ts,tsx,js,jsx}'
        ]
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    react.configs.flat.recommended,
    jsxA11y.flatConfigs.recommended,
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        // react-hooks@7's `recommended-latest` config still ships a legacy string
        // `plugins` array, so register it manually and set its rules below.
        plugins: {
            'import-x': importPlugin,
            'react-hooks': reactHooks
        },
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: { jsx: true }
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
                window: true
            }
        },
        settings: {
            // Pin the version instead of 'detect': eslint-plugin-react 7.37's version
            // auto-detection calls context.getFilename(), which ESLint 10 removed.
            react: { version: '18.3' }
        },
        rules: {
            'no-console': 1,
            'react/jsx-props-no-spreading': 0,
            'react/jsx-wrap-multilines': 0,
            'react/prop-types': 0,
            'import-x/prefer-default-export': 0,
            'react-hooks/rules-of-hooks': 2,
            'react-hooks/exhaustive-deps': 1,
            'no-unused-vars': 0,
            '@typescript-eslint/no-unused-vars': 0,
            // no-empty-interface was merged into no-empty-object-type in ts-eslint 8;
            // keep the original intent of allowing empty `interface IProps {}` markers.
            '@typescript-eslint/no-empty-object-type': 0,
            '@typescript-eslint/no-explicit-any': 0,
            '@typescript-eslint/no-var-requires': 0,
            '@typescript-eslint/no-require-imports': 0
        }
    },
    // Prettier last so it disables conflicting stylistic rules and reports formatting.
    prettierRecommended
);

const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const prettierRecommended = require('eslint-plugin-prettier/recommended');
const importPlugin = require('eslint-plugin-import-x');
const nodePlugin = require('eslint-plugin-n');
const globals = require('globals');

// Flat config port of the old .eslintrc.js. Intent preserved:
// - typescript-eslint recommended
// - prettier integration (eslint-plugin-prettier + eslint-config-prettier)
// - node plugin (migrated from eslint-plugin-node -> eslint-plugin-n) recommended
// - import plugin available
// - node + jest globals, `window` global
// - the same rule relaxations (no-var-requires / no-explicit-any / no-unused-vars off)
module.exports = tseslint.config(
    // Ignore build artifacts and type declaration files (ports .eslintignore).
    {
        ignores: ['.vscode/**', 'dist/**', 'node_modules/**', '**/*.d.ts', '**/*.spec.{ts,tsx,js,jsx}']
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    nodePlugin.configs['flat/recommended'],
    {
        plugins: {
            'import-x': importPlugin
        },
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.jest,
                window: true
            }
        },
        rules: {
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'no-unused-vars': 'off',
            // The @ts-ignore in loaders/session.ts is intentional (express-session
            // typing interop); do not force @ts-expect-error.
            '@typescript-eslint/ban-ts-comment': 'off',
            // Existing code throws re-wrapped errors and exits the process on a
            // fatal listen error. These are pre-migration patterns, not new; keep
            // them from failing lint (this is a dependency upgrade, not a refactor).
            'preserve-caught-error': 'off',
            'n/no-process-exit': 'off',
            // The project uses TS path aliases (@services, @loaders, ...) and a
            // dynamic require('./loaders') that the n plugin cannot resolve; keep
            // these relaxed to match the pre-migration behavior.
            'n/no-missing-import': 'off',
            'n/no-missing-require': 'off',
            'n/no-unpublished-import': 'off',
            'n/no-unpublished-require': 'off',
            'n/no-extraneous-import': 'off',
            'n/no-extraneous-require': 'off'
        }
    },
    // prettier integration must come last so it can turn off conflicting
    // stylistic rules (eslint-config-prettier) and report formatting via
    // eslint-plugin-prettier.
    prettierRecommended
);

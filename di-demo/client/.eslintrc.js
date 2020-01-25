module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier/react',
    'prettier/standard',
  ],
  plugins: ['jest', 'prettier', '@typescript-eslint', 'react-hooks'],
  rules: {
    'prettier/prettier': ['error'],
  },
  env: {
    'jest/globals': true,
    browser: true
  },
  globals: {
    window: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    'no-console': 2,

    'prettier/prettier': ['error'],

    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-wrap-multilines': 'off',
    'react/prop-types': 0,

    'import/prefer-default-export': 0,
    "import/extensions": ["error", "ignorePackages", {
      "ts": "never",
      "tsx": "never",
    }]

    // 'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
};

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/react',
    'prettier/standard',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error'],
  },
  globals: {
    window: true,
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,
    },
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

    // 'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': 'warn',
  },
  // settings: {
  //   'import/extensions': ['.tx', '.tsx'],
  //   'import/resolver': {
  //     node: {
  //       extensions: ['.js', '.ts', '.jsx', '.tsx'],
  //     },
  //   },
  // },
};

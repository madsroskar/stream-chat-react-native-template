module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['@react-native-community/eslint-config'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'react-native/no-inline-styles': 0,
  },
};

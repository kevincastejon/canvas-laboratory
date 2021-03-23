module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'react-app',
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-bitwise': 'off',
    'no-loop-func': 'off',
    'react/jsx-filename-extension': 'off',
    'no-await-in-loop': 'off',
    'no-plusplus': 'off',
    'no-console': 'off',
    'no-empty-pattern': 'off',
    'no-param-reassign': 'off',
    'no-continue': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',
  },
};

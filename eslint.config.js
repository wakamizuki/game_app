const { defineConfig } = require('eslint');

module.exports = defineConfig({
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error', // Prettierのルールを適用
  },
  overrides: [
    {
      files: ['*.js'], // jsファイルに適用
      plugins: ['prettier'],
    },
  ],
});

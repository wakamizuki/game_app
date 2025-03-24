module.exports = {
    extends: [
      'eslint:recommended', // 推奨設定を使用
      'plugin:prettier/recommended', // Prettier の設定を統合
    ],
    env: {
      browser: true,
      node: true,
      es2021: true,
    },
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // 独自のルールを追加する場合
      'no-console': 'warn', // console.logを警告に
    },
  };
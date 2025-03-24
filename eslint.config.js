import { defineConfig } from 'eslint-define-config';
import prettier from 'eslint-plugin-prettier';

export default defineConfig([
    {
        files: ['*.js', '*.ts'],
        languageOptions: {
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        plugins: {
            prettier, // prettier プラグインをオブジェクトとして指定
        },
        rules: {
            'prettier/prettier': 'error', // Prettierのルールを適用
        },
    },
    {
        files: ['*.js'],
        languageOptions: {
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        rules: {
            'no-console': 'warn', // eslint:recommended から置き換えたルール例
            'no-unused-vars': 'warn',
            eqeqeq: 'warn',
            indent: ['error', 4], // インデントを4に設定
        },
    },
]);

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3, // core-jsのバージョンを指定
                targets: '> 0.25%, not dead', // ブラウザ対応設定
            },
        ],
    ],
    env: {
        test: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: { node: 'current' }, // Jest用設定
                    },
                ],
            ],
        },
    },
};

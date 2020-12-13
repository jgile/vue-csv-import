module.exports = {
    root: true,

    env: {
        node: true,
    },

    extends: [
        'plugin:vue/essential',
        'eslint:recommended'
    ],

    rules: {
        'vue/html-closing-bracket-newline': ['error', {
            singleline: 'never',
            multiline: 'always'
        }],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/script-indent': [
            'error',
            4,
            {
                baseIndent: 0,
                switchCase: 0,
                ignores: [],
            },
        ],
    },

    parserOptions: {
        parser: 'babel-eslint',
    },


    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        }
    ]
};

module.exports = {
    root: true,

    env: {
        node: true
    },

    extends: ["plugin:vue/essential", "eslint:recommended"],

    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'vue/script-indent': ['error', 4, {
            baseIndent: 1,
            switchCase: 0,
            ignores: []
        }]
    },

    parserOptions: {
        parser: 'babel-eslint'
    },
};

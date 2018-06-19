const path = require('path');
console.log(path.resolve(__dirname, 'node_modules/csv-parse'));
module.exports = {
    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /node_modules\/(?!(csv-parse)\/).*/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.vue'],
    },
};

module.exports = {
    css: {
        extract: false,
    },
    publicPath: process.env.NODE_ENV === 'production' ? 'vue-csv-import/' : '/',
    configureWebpack: {
        externals: {
            axios: "axios",
            lodash: "lodash",
            papaparse: "papaparse"
        }
    }
};

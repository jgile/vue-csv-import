import vue from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import pkg from './package.json';

export default {
  external: Object.keys(pkg.dependencies),
  plugins: [
    resolve(),
    commonjs(),
    vue(),
    json()
  ],
  input: 'src/index.js',
  output: {
    globals: {vue: 'Vue', lodash: '_', axios: 'axios', 'csv-parse': 'parse'},
    name: 'vue-csv-import',
    file: 'dist/index.js',
    format: 'umd'
  },
};
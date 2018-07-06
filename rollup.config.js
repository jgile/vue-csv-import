import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import bundleSize from 'rollup-plugin-filesize';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

const external = Object.keys(pkg.dependencies);
const extensions = ['.js', '.vue'];
const isProduction = !process.env.ROLLUP_WATCH;
const globals = { vue: 'Vue' };

const lintOpts = {
  extensions,
  exclude: ['**/*.json'],
  cache: true,
  throwOnError: true
};

const plugins = [
  resolve(),
  bundleSize(),
  vue({
    template: {
      isProduction,
      compilerOptions: { preserveWhitespace: false }
    },
    css: true,
  }),
  buble()
];

export default {
  external,
  plugins,
  input: 'src/index.js',
  output: {
    globals,
    name: 'vue-csv-import',
    file: 'dist/index.js',
    format: 'umd'
  },
};
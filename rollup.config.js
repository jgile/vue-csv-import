import vue from 'rollup-plugin-vue';
import {terser} from 'rollup-plugin-terser';

export default [
    {
        input: 'src/index.js',
        output: {
            format: 'cjs',
            file: 'dist/vue-csv-import.cjs.js'
        },
        plugins: [
            vue(),
            terser()
        ]
    },{
        input: 'src/index.js',
        output: {
            format: 'esm',
            file: 'dist/vue-csv-import.esm.js'
        },
        plugins: [
            vue(),
            terser()
        ]
    },{
        input: 'src/index.js',
        output: {
            format: 'umd',
            name: 'vue-csv-import',
            file: 'dist/vue-csv-import.umd.js'
        },
        plugins: [
            vue(),
            terser()
        ]
    }
]

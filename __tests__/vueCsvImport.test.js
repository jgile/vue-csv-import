import { VueCsvImport } from '../src';
import Vue from 'vue/dist/vue.js';

describe('VueCsvImport', () => {
    Vue.component('vue-csv-import', VueCsvImport);

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="app">
                <vue-csv-import :map-fields="['one', 'two', 'three']" url="/hello"></vue-csv-import>
            </div>
        `;
    });

    it('can mount', async () => {
        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });
});

async function createVm() {
    const vm = new Vue({
        el: '#app',
    });

    await Vue.nextTick(() => {});

    return { app: vm, component: vm.$children[0] };
}

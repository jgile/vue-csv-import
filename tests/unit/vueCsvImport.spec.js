import {mount} from '@vue/test-utils'
import get from 'lodash/get';
import {VueCsvErrors, VueCsvImport, VueCsvToggleHeaders, VueCsvSubmit, VueCsvInput, VueCsvMap} from '@/index';

const defaultTestComponent = {
    components: {VueCsvErrors, VueCsvImport, VueCsvToggleHeaders, VueCsvSubmit, VueCsvInput, VueCsvMap},
    props: {
        mapFields: {
            default() {
                return {name: {required: false, label: 'Name'}, age: {required: true, label: 'Age'}}
            }
        }
    },
    template: `
        <vue-csv-import
            ref="vueCsvImport"
            v-model="csv"
            :fields="mapFields"
        >
            <vue-csv-errors ref="vueCsvErrors"></vue-csv-errors>
            <vue-csv-toggle-headers ref="vueCsvToggleErrors"></vue-csv-toggle-headers>
            <vue-csv-input ref="vueCsvInput"></vue-csv-input>
            <vue-csv-map :auto-match="false" ref="vueCsvMap"></vue-csv-map>
            <vue-csv-submit url="/" ref="vueCsvSubmit"></vue-csv-submit>
        </vue-csv-import>
            `,
    data() {
        return {csv: null};
    }
};

describe('VueCsvImport', () => {
    let wrapper;
    const ref = function (ref) {
        return wrapper.vm.$refs[ref]
    }
    const dataObject = function (key = null) {
        if (key === null) {
            return wrapper.vm.$refs.vueCsvImport.VueCsvImportData;
        }

        return get(wrapper.vm.$refs.vueCsvImport.VueCsvImportData, key);
    }
    // const csv = [["name", "age", "grade"], ["Susan", "41", "a"], ["Mike", "5", "b"], ["Jake", "33", "c"], ["Jill", "30", "d"]];
    // const sample = [["name", "age", "grade"], ["Susan", "41", "a"]];
    // const map = {"name": 0, "age": 1};
    // const testComponent = function (obj = {}, options = {}) {
    //     return mount({
    //         components: {VueCsvErrors, VueCsvImport, VueCsvToggleHeaders, VueCsvSubmit, VueCsvInput, VueCsvMap},
    //         props: {
    //             mapFields: {
    //                 default() {
    //                     return {name: {required: false, label: 'Name'}, age: {required: true, label: 'Age'}}
    //                 }
    //             }
    //         },
    //         template: `
    //             <vue-csv-import
    //                 ref="vueCsvImport"
    //                 v-model="csv"
    //                 :fields="mapFields"
    //             >
    //             <vue-csv-errors ref="vueCsvErrors"></vue-csv-errors>
    //             <vue-csv-toggle-headers ref="vueCsvToggleErrors"></vue-csv-toggle-headers>
    //             <vue-csv-input ref="vueCsvInput"></vue-csv-input>
    //             <vue-csv-map :auto-match="false" ref="vueCsvMap"></vue-csv-map>
    //             <vue-csv-submit url="/" ref="vueCsvSubmit"></vue-csv-submit>
    //             </vue-csv-import>
    //         `,
    //         data() {
    //             return {csv: null};
    //         }
    //     }, options);
    // }

    it('has expected html', () => {
        wrapper = mount(defaultTestComponent, {
            propsData: {
                mapFields: {name: {required: false, label: 'Name'}, age: {required: true, label: 'Age'}}
            }
        });

        // expect(wrapper.vm.$el).toMatchSnapshot();
    });

    // it('has expected map fields when array', async () => {
    //     wrapper = mount(testComponent, {
    //         props: {
    //             mapFields: ['name_map', 'age_map', 'grade_map']
    //         }
    //     })
    //
    //     expect(dataObject('fields')).toEqual([{"key": "name_map", "label": "name_map", "required": true}, {"key": "age_map", "label": "age_map", "required": true}, {"key": "grade_map", "label": "grade_map", "required": true}]);
    // });

    // it('has expected map fields when object', async () => {
    //     wrapper = mount(testComponent, {
    //         props: {
    //             mapFields: {name: {required: false, label: 'Name'}, age: {required: true, label: 'Age'}}
    //         }
    //     })
    //
    //     expect(dataObject('fields')).toEqual([{"key": "name", "label": "Name", "required": false}, {"key": "age", "label": "Age", "required": true}]);
    // });

    // it('headers uses headers headers', async() => {
    //     wrapper = testComponent({
    //         template: `
    //             <vue-csv-import
    //                 ref="vueCsvImport"
    //                 v-model="csv"
    //                 :fields="mapFields"
    //             >
    //                 <vue-csv-input ref="vueCsvInput" :headers="true"></vue-csv-input>
    //             </vue-csv-import>
    //         `,
    //     });
    //     expect(dataObject('fileHasHeaders')).toEqual(true);
    //     expect(wrapper.vm.$el).toMatchSnapshot();
    // });

    // it('headers toggle toggles headers',  () => {
    //     wrapper = testComponent();
    //     console.log(wrapper.text());
    //     // expect(dataObject('fileHasHeaders')).toEqual(false);
    //     // await wrapper.find('[type=checkbox]').trigger('click');
    //     // expect(dataObject('fileHasHeaders')).toEqual(true);
    // });


//
// it('can map when passed fields are an object', async () => {
//     objWrapper.vm.hasHeaders = true;
//     objWrapper.vm.sample = sample;
//     objWrapper.vm.csv = csv;
//     objWrapper.vm.map = map;
//     objWrapper.vm.submit();
//
//     let emitted = objWrapper.emitted();
//     expect(emitted['update:modelValue'][0][0]).toEqual([{"name": "Susan", "age": "41"}, {"name": "Mike", "age": "5"}, {"name": "Jake", "age": "33"}, {
//         "name": "Jill",
//         "age": "30"
//     }]);
// });
//
// it('can map when passed fields are an array', async () => {
//     wrapper.vm.hasHeaders = true;
//     wrapper.vm.sample = sample;
//     wrapper.vm.csv = csv;
//     wrapper.vm.map = map;
//     wrapper.vm.submit();
//
//     let emitted = wrapper.emitted();
//     expect(emitted['update:modelValue'][0][0]).toEqual([{"name": "Susan", "age": "41"}, {"name": "Mike", "age": "5"}, {"name": "Jake", "age": "33"}, {
//         "name": "Jill",
//         "age": "30"
//     }]);
// });
//
// it('validates mime types', async () => {
//     wrapper.vm.hasHeaders = true;
//     wrapper.vm.sample = sample;
//     wrapper.vm.csv = csv;
//     wrapper.vm.map = map;
//     expect(wrapper.vm.validateMimeType('peanut')).toEqual(false);
//     expect(wrapper.vm.validateMimeType('text/csv')).toEqual(true);
//     expect(wrapper.vm.validateMimeType('text/x-csv')).toEqual(true);
//     expect(wrapper.vm.validateMimeType('application/vnd.ms-excel')).toEqual(true);
//     expect(wrapper.vm.validateMimeType('text/plain')).toEqual(true);
// });

// it('is a Vue instance', () => {
//     expect(wrapper.isVueInstance()).toBeTruthy();
// });
// it('installs as plugin', () => {
//     localVue.use(VueCsvImportPlugin);
//     expect(localVue.options.components["VueCsvImport"]).toBeDefined();
// });
// it('automatically maps fields when cases match', async () => {
//     objWrapper = mount(VueCsvImport, {
//         props: {
//             value: [],
//             autoMatchFields: true,
//             mapFields: {name: 'Name', age: 'Age'}
//         },
//         data() {
//             return {
//                 hasHeaders: true,
//                 fieldsToMap: fields,
//                 csv: csv,
//             }
//         }
//     });
//
//     objWrapper.vm.sample = [["Name", "Age", "Grade"], ["Susan", "41", "a"]];
//     await objWrapper.find('button').trigger('click');
//     expect(objWrapper.vm.map).toEqual({"age": 1, "name": 0});
// });
//
// it('automatically maps fields when cases do not match', async () => {
//     objWrapper.setProps({autoMatchFields: true, autoMatchIgnoreCase: true})
//     objWrapper.setData({hasHeaders: true, sample: sample, csv: csv, fieldsToMap: fields});
//     expect(objWrapper.vm.map).toEqual({"age": 1, "name": 0});
// });
// it('automatically maps fields when cases match', async () => {
//     const objWrapper = mount(VueCsvImport, {
//         data() {
//             return {
//                 map: map,
//                 csv: csv,
//                 fileSelected: false,
//                 hasHeaders: true,
//                 fieldsToMap: fields,
//                 isValidFileMimeType: true,
//                 sample: [["Name", "Age", "Grade"], ["Susan", "41", "a"]],
//             }
//         },
//         props: {
//             value: [],
//             autoMatchFields: true,
//             mapFields: {name: 'Name', age: 'Age'}
//         }
//     });
//
//     // await objWrapper.find('button').trigger('click');
//
//     objWrapper.vm.sample = [["Name", "Age", "Grade"], ["Susan", "41", "a"]];
//
//     expect(objWrapper.vm.form.csv).not.toEqual(null);
// });
//
});

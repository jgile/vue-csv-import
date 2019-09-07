import _ from 'lodash';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueCsvImportPlugin } from '../../src/index';
import VueCsvImport from '../../src/components/VueCsvImport';

describe('VueCsvImport', () => {
    let wrapper, objWrapper;
    const localVue = createLocalVue();
    const csv = [["name", "age", "grade"], ["Susan", "41", "a"], ["Mike", "5", "b"], ["Jake", "33", "c"], ["Jill", "30", "d"]];
    const sample = [["name", "age", "grade"], ["Susan", "41", "a"]];
    const map = { "name": 0, "age": 1 };

    beforeEach(() => {
        wrapper = shallowMount(VueCsvImport, { propsData: { mapFields: ['name_map', 'age_map', 'grade_map'], url: '/hello' } });
        objWrapper = shallowMount(VueCsvImport, { propsData: { value: [], mapFields: { name: 'Name', age: 'Age' } } });
    });

    it('is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('installs as plugin', () => {
        localVue.use(VueCsvImportPlugin);
        expect(localVue.options.components["VueCsvImport"]).toBeDefined();
    });

    it('has expected html', () => {
        expect(wrapper.vm.$el).toMatchSnapshot();
    });

    it('has expected map fields when array', () => {
        expect(wrapper.vm.fieldsToMap).toEqual([{ "key": "name_map", "label": "name_map" }, { "key": "age_map", "label": "age_map" }, { "key": "grade_map", "label": "grade_map" }]);
    });

    it('has expected map fields when object', () => {
        expect(objWrapper.vm.fieldsToMap).toEqual([{ "key": "name", "label": "Name" }, { "key": "age", "label": "Age" }]);
    });

    it('headers prop removes checkbox and use headers', () => {
        objWrapper.setData({ hasHeaders: true });
        expect(objWrapper.vm.hasHeaders).toEqual(true);
        expect(objWrapper.vm.$el).toMatchSnapshot();
    });

    it('headers prop removes checkbox and not use headers', () => {
        objWrapper.setData({ hasHeaders: false });
        expect(objWrapper.vm.hasHeaders).toEqual(false);
        expect(objWrapper.vm.$el).toMatchSnapshot();
    });

    it('can map when passed fields are an object', () => {
        objWrapper.setData({ hasHeaders: true, sample: sample, csv: csv, map: map });
        objWrapper.vm.submit();
        expect(objWrapper.emitted().input[0][0]).toEqual([{ "name": "Susan", "age": "41" }, { "name": "Mike", "age": "5" }, { "name": "Jake", "age": "33" }, {
            "name": "Jill",
            "age": "30"
        }]);
    });

    it('can map when passed fields are an array', () => {
        wrapper.setData({ hasHeaders: true, sample: sample, csv: csv, map: map });
        wrapper.vm.submit();
        expect(wrapper.emitted().input[0][0]).toEqual([{ "name": "Susan", "age": "41" }, { "name": "Mike", "age": "5" }, { "name": "Jake", "age": "33" }, {
            "name": "Jill",
            "age": "30"
        }]);
    });

    it('validates mime types', () => {
        wrapper.setData({ hasHeaders: true, sample: sample, csv: csv, map: map });
        expect(wrapper.vm.validateMimeType('peanut')).toEqual(false);
        expect(wrapper.vm.validateMimeType('text/csv')).toEqual(true);
        expect(wrapper.vm.validateMimeType('text/x-csv')).toEqual(true);
        expect(wrapper.vm.validateMimeType('application/vnd.ms-excel')).toEqual(true);
        expect(wrapper.vm.validateMimeType('text/plain')).toEqual(true);
    });
});

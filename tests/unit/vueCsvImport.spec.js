import { shallowMount } from '@vue/test-utils';
import VueCsvImport from '../../src/components/VueCsvImport';

describe('VueCsvImport', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(VueCsvImport, {
            propsData: {
                mapFields: ['one', 'two', 'three'],
                url: '/hello'
            }
        });
    });

    it('is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('has expected html', () => {
        expect(wrapper.vm.$el).toMatchSnapshot();
    });

    it('has expected map fields when array', () => {
        expect(wrapper.vm.fieldsToMap).toEqual([{ "key": "one", "label": "one" }, { "key": "two", "label": "two" }, { "key": "three", "label": "three" }]);
    });

    it('has expected map fields when object', () => {
        wrapper = shallowMount(VueCsvImport, {
            propsData: {
                mapFields: {
                    four: 'four',
                    five: 'five'
                },
                url: '/hello'
            }
        });

        expect(wrapper.vm.fieldsToMap).toEqual([{ "key": "four", "label": "four" }, { "key": "five", "label": "five" }]);
    });

    it('headers prop removes checkbox and use headers', () => {
        wrapper = shallowMount(VueCsvImport, {
            propsData: {
                headers: true,
                mapFields: {
                    four: 'four',
                    five: 'five'
                },
            }
        });

        expect(wrapper.vm.hasHeaders).toEqual(true);
        expect(wrapper.vm.$el).toMatchSnapshot();
        wrapper.find('.form-control-file')
    });

    it('headers prop removes checkbox and not use headers', () => {
        wrapper = shallowMount(VueCsvImport, {
            propsData: {
                headers: false,
                mapFields: {
                    four: 'four',
                    five: 'five'
                },
            }
        });
        expect(wrapper.vm.hasHeaders).toEqual(false);
        expect(wrapper.vm.$el).toMatchSnapshot();
    });
});

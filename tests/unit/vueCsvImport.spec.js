import {shallowMount} from '@vue/test-utils';
import {VueCsvImport} from '../../src/index';

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
    expect(wrapper.$el).toMatchSnapshot();
  });

  it('has expected map fields when array', () => {
    expect(wrapper.vm.fieldsToMap).toEqual([{"key": "one", "label": "one"}, {"key": "two", "label": "two"}, {"key": "three", "label": "three"}]);
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

    expect(wrapper.vm.fieldsToMap).toEqual([{"key": "four", "label": "four"}, {"key": "five", "label": "five"}]);
  });
});
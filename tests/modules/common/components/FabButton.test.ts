import { shallowMount } from '@vue/test-utils';
import FabButton from "@/modules/common/components/FabButton.vue";

describe('<FabButton />', () => {

  test('should render with default position', () => {
    const wrapper = shallowMount(FabButton);

    const fabButton = wrapper.find('button');
    const classes = ['btn', 'btn-circle', 'btn-secondary', 'fixed', 'right-10', 'bottom-right']

    expect(wrapper.props().position).toBe('bottom-right');
    expect(fabButton.classes()).toEqual(classes);
  });

  test('should render with top-left position', () => {
    const wrapper = shallowMount(FabButton, {
      propsData: {
        position: 'top-left'
      }
    });

    const fabButton = wrapper.find('button');

    expect(fabButton.classes()).toContain('top-left');
  });

  test('should render with top-right position', () => {
    const wrapper = shallowMount(FabButton, {
      propsData: {
        position: 'top-right'
      }
    });

    const fabButton = wrapper.find('button');

    expect(fabButton.classes()).toContain('top-right');
  });

  test('should render slot content inside slot', () => {
    const wrapper = shallowMount(FabButton, {
      slots: {
        default: '<span>Test</span>'
      }
    });

    const slotContent = wrapper.find('button span');

    expect(slotContent.exists()).toBeTruthy();
    expect(slotContent.text()).toBe('Test');
  });

});

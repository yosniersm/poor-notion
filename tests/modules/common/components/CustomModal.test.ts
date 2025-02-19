import CustomModal from "@/modules/common/components/CustomModal.vue";
import { mount } from "@vue/test-utils";


describe('<CustomModal />', () => {
  test('should render dialog with default values ', () => {
    const wrapper = mount(CustomModal);

    const modal = wrapper.find('.modal');
    expect(modal.attributes('open')).toBeUndefined();
  });

  test('should render dialog with header, body and footer slots', () => {
    const wrapper = mount(CustomModal, {
      slots: {
        header: '<span>Header Content</span>',
        body: '<span>Body Content</span>',
        footer: '<span>Footer Content</span>'
      }
    });

    expect(wrapper.text()).toContain('Header Content');
    expect(wrapper.text()).toContain('Body Content');
    expect(wrapper.text()).toContain('Footer Content');
  });


  test('should render dialog when open prop changes', async () => {
    const wrapper = mount(CustomModal, {
      props: {
        open: true
      }
    });

    const modal = wrapper.find('.modal');
    const modalBackdrop = wrapper.find('.modal-backdrop');
    expect(modal.attributes('open')).toBeDefined();
    expect(modalBackdrop.exists()).toBeTruthy();
    expect(modalBackdrop.classes()).toEqual([
      'modal-backdrop',
      'fixed',
      'top-0',
      'left-0',
      'z-10',
      'bg-black',
      'opacity-40',
      'w-screen',
      'h-screen'
    ]);


    await wrapper.setProps({ open: false });
    expect(wrapper.find('.modal').attributes('open')).toBeUndefined();
    expect(wrapper.find('.modal-backdrop').exists()).toBeFalsy();

  });
})

import { nextTick } from "vue";
import { mount } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"

import { fakeProjects } from "../../../mocks/project.mock";
import SideView from "@/modules/projects/components/SideMenu.vue"
import { useProjectStore } from "@/modules/projects/store/project.store";

describe('<SideMenu \>', () => {

  const wrapper = mount(SideView, {
    global: {
      stubs: ['router-link'],
      plugins: [createTestingPinia()]
    }
  })

  const store = useProjectStore();

  beforeEach(() => {
    store.$patch({
      projects: []
    })
  })

  test('should render default values', () => {
    const wrapper = mount(SideView, {
      global: {
        stubs: ['router-link'],
        plugins: [createTestingPinia()]
      }
    })
    expect(wrapper.html()).contains('No projects');
  })

  test('should render default values', () => {
    expect(wrapper.html()).contains('No projects');
  })

  test('should render with projects', async () => {

    store.$patch({
      projects: fakeProjects
    })
    await nextTick();

    expect(wrapper.html()).not.contains('No projects');
    // expect(wrapper.html()).toMatchSnapshot();

  })
})

import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import { useProjectStore } from "@/modules/projects/store/project.store";
import ProjectsView from "@/modules/projects/views/ProjectsView.vue";
import { fakeProjects } from "../../../mocks/project.mock";
import InputModal from "@/modules/common/components/InputModal.vue";

describe('<ProjectsView />', () => {
  const wrapper = mount(ProjectsView, {
    global: {
      plugins: [createTestingPinia()]
    }
  })

  const store = useProjectStore();

  beforeEach(() => {
    store.$patch({
      projects: fakeProjects
    })
  })

  test('Should be render with projects', () => {
    const tableRows = wrapper.findAll('tbody tr')
    expect(tableRows.length).toBe(3)

    tableRows.forEach((row, index) => {
      const project = fakeProjects[index];

      const cell = row.findAll('td');

      expect(cell.at(0).text()).toBe(project.name)
      expect(cell.at(1).text()).toBe(project.tasks.length.toString())
    })
  });

  test('Should call addProject when add project on inputModal', () => {
    const inputModal = wrapper.findComponent(InputModal);
    const newProjectName = 'Project 1'

    inputModal.vm.$emit('value', newProjectName)

    expect(store.addProject).toHaveBeenCalledWith(newProjectName)
  });


});

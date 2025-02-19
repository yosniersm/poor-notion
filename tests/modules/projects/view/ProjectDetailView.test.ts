import { mount } from "@vue/test-utils";
import ProjectDetailView from "@/modules/projects/views/ProjectDetailView.vue";
import { useProjectStore } from "@/modules/projects/store/project.store";
import { fakeProjects } from "../../../mocks/project.mock";
import { useRouter } from "vue-router";
import { Mock } from "vitest";

vi.mock('vue-router')
vi.mock('@/modules/projects/store/project.store')

describe('<ProjectDetailView />', () => {

  test('Should be render with a project', () => {

    (useProjectStore as any).mockReturnValue({
      projectList: fakeProjects
    })

    const wrapper = mount(ProjectDetailView, {
      props: {
        id: '1'
      },
      global: {
        stubs: ['RouterLink']
      }
    })

    const tableRows = wrapper.findAll('tr.hover');

    expect(tableRows.length).toBe(fakeProjects.at(0).tasks.length)

  });

  test('Should redirect to projects if projectId not found', () => {

    (useProjectStore as any).mockReturnValue({
      projectList: []
    })

    const replaceSpy = vi.fn();

    (useRouter as Mock).mockReturnValue({
      replace: replaceSpy
    })

    const wrapper = mount(ProjectDetailView, {
      props: {
        id: '1'
      },
      global: {
        stubs: ['RouterLink']
      }
    })

    expect(replaceSpy).toHaveBeenCalledWith('/')

  });
});

import { useProjectStore } from "@/modules/projects/store/project.store"
import { setActivePinia, createPinia } from "pinia"
import { fakeProjects } from "../../../mocks/project.mock"

describe('useProjectsStore', () => {

  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  test('should have the correct default values', () => {
    const store = useProjectStore()

    expect(store.projects).toStrictEqual([]);
    expect(store.projectList).toStrictEqual([]);
    expect(store.noProjects).toBe(true);
    expect(store.projectWithCompletion).toStrictEqual([]);
    expect(store.addProject).toBeInstanceOf(Function);
    expect(store.addTask).toBeInstanceOf(Function);
    expect(store.toggleTask).toBeInstanceOf(Function);
  })

  test('should add a project to the store', () => {
    const store = useProjectStore()
    const projectName = 'Project 1'
    store.addProject(projectName)

    expect(store.projects.length).toBe(1);
    expect(store.projects).toEqual([{
      id: expect.any(String),
      name: projectName,
      tasks: []
    }
    ]);
    expect(store.noProjects).toBe(false);
  })

  test('should load projects from localStorage', () => {
    localStorage.setItem('projects', JSON.stringify(fakeProjects))
    const store = useProjectStore()
    const [project1, project2] = store.projects;

    expect(store.projects.length).toBe(3);
    expect(project1).toEqual({
      id: '1',
      name: 'Project 1',
      tasks: expect.any(Array)

    });
    expect(project2).toEqual({
      id: '2',
      name: 'Project 2',
      tasks: expect.any(Array)
    });
  })

  test('should add a task to a project', () => {
    const store = useProjectStore()
    store.addProject('Project 1')
    const project = store.projects.at(0)!
    const taskName = 'Task 1'
    store.addTask(project.id, taskName)

    expect(project.tasks.length).toBe(1);
    expect(project.tasks).toEqual([{
      id: expect.any(String),
      name: taskName,
      completedAt: undefined
    }]);
  })

  test('should toggle task', () => {
    const store = useProjectStore()
    store.addProject('Project 1')
    const project = store.projects.at(0)!
    const taskName = 'Task 1'
    store.addTask(project.id, taskName)

    const task = project.tasks.at(0)!
    store.toggleTask(project.id, task.id)

    expect(project.tasks.length).toBe(1);
    expect(project.tasks).toEqual([{
      id: expect.any(String),
      name: taskName,
      completedAt: expect.any(Date)
    }]);
  })

  test('should return projects with completion', () => {
    const store = useProjectStore()
    store.$patch((state) => {
      state.projects = fakeProjects
    })

    expect(store.projectWithCompletion).toEqual([
      { id: '1', name: 'Project 1', taskCount: 2, completion: 100 },
      { id: '2', name: 'Project 2', taskCount: 3, completion: 33 },
      { id: '3', name: 'Project 3', taskCount: 3, completion: 0 }
    ])
  })
})

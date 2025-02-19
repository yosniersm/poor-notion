import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useLocalStorage } from '@vueuse/core'
import type { Project } from '../interfaces/project.interface'

// const initialLoad = (): Project[] => [
//   {
//     id: uuidv4(),
//     name: 'Project 1',
//     tasks: [],
//   },
//   {
//     id: uuidv4(),
//     name: 'Project 2',
//     tasks: [],
//   },
// ]

export const useProjectStore = defineStore('projects', () => {

  const projects = ref(useLocalStorage<Project[]>('projects', []));

  const addProject = (projectName: string) => {
    if (projectName.length === 0) return;

    projects.value.push({
      id: uuidv4(),
      name: projectName,
      tasks: [],
    });
  };

  const addTask = (projectId: string, taskName: string) => {
    const project = projects.value.find((p) => p.id === projectId);
    if (!project) return;

    if (taskName.trim().length === 0) return;


    project.tasks.push({
      id: uuidv4(),
      name: taskName,
      completedAt: undefined,
    });
  }

  const toggleTask = (projectId: string, taskId: string) => {
    const project = projects.value.find((p) => p.id === projectId);
    if (!project) return;

    const task = project.tasks.find((t) => t.id === taskId);
    if (!task) return;

    task.completedAt = task.completedAt ? undefined : new Date();
  }

  return {
    // properties
    projects,

    // getters
    projectList: computed(() => [...projects.value]),
    noProjects: computed(() => projects.value.length === 0),
    projectWithCompletion: computed(() => {

      return projects.value.map((project) => {
        const completed = project.tasks.filter((task) => task.completedAt).length;
        const total = project.tasks.length;
        const completion = total === 0 ? 0 : (completed / total) * 100;

        return {
          id: project.id,
          name: project.name,
          taskCount: total,
          completion: Math.round(completion),
        }
      })

    }),

    // actions
    addProject,
    addTask,
    toggleTask

  }

})

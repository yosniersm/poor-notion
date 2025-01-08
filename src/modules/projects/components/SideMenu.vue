<template>
  <aside class="bg-base w-72 min-h-screen">
    <h2 class="text-lg font-bold mx-4">
      <router-link to="/">Projects</router-link>
    </h2>
    <p v-if="projectsStore.noProjects" class="text-sm text-gray-500 mx-4">No projects</p>

    <ul v-else class="menu">
      <li v-for="project in projectsStore.projectList" :key="project.id">
        <template v-if="project.tasks.length > 0">
          <details>
            <summary>
              <RouterLink :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
            </summary>
            <ul>
              <li v-for="task in project.tasks" :key="task.id">
                <RouterLink :to="`/project/${project.id}`">{{ task.name }}</RouterLink>
              </li>
            </ul>
          </details>
        </template>
        <template v-else>
          <RouterLink :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { useProjectStore } from '@/modules/projects/store/project.store';
import { RouterLink } from 'vue-router';

const projectsStore = useProjectStore();
</script>

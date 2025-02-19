<template>
  <div class="w-full">
    <section class="m-2">
      <bread-crumbs :name="project?.name ?? 'No name'" />
    </section>
    <section class="m-2">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Completed</th>
              <th>Task</th>
              <th>Complete At</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="task in project?.tasks" :key="task.id" class="hover">
              <th>
                <input
                  type="checkbox"
                  :checked="!!task.completedAt"
                  class="checkbox checkbox-primary"
                  @change="projectStore.toggleTask(project!.id, task.id)"
                />
              </th>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt }}</td>
            </tr>
            <tr>
              <th></th>
              <td>
                <input
                  ref="inputRef"
                  @keyup.enter="addTask"
                  type="text"
                  v-model="newTask"
                  class="input input-primary w-full opacity-60 transition-all hover:opacity-100 focus:opacity-100"
                  placeholder="New task"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import BreadCrumbs from '../components/BreadCrumbs.vue';
import type { Project } from '../interfaces/project.interface';
import { useProjectStore } from '@/modules/projects/store/project.store';

interface Props {
  id: string;
}
const props = defineProps<Props>();

const projectStore = useProjectStore();
const project = ref<Project>();
const router = useRouter();

const inputRef = ref<HTMLInputElement | null>(null);

const newTask = ref('');

const addTask = () => {
  if (newTask.value.trim().length === 0) {
    newTask.value = '';
    inputRef.value?.focus();
    return;
  }

  if (!project.value) return;

  projectStore.addTask(project.value.id, newTask.value);
  newTask.value = '';
};

watch(
  () => props.id,
  async () => {
    project.value = projectStore.projectList.find((project) => project.id === props.id);
    if (!project.value) {
      router.replace('/');
    }
  },
  { immediate: true },
);
</script>

<style scoped></style>

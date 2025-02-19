<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Projects</th>
          <th>Tasks</th>
          <th>Advance</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(project, index) in projectsStore.projectWithCompletion"
          :key="project.id"
          class="hover"
        >
          <th>{{ index + 1 }}</th>
          <td>{{ project.name }}</td>
          <td>{{ project.taskCount }}</td>
          <td>
            <progress
              class="progress progress-primary w-56"
              :value="project.completion"
              max="100"
            ></progress>
            {{ project.completion }}%
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <input-modal
    :open="modalOpen"
    @close="modalOpen = false"
    @value="projectsStore.addProject"
    title="New Project"
    sub-title="Propose a name for the new project"
    placeholder="Project Name"
  />

  <custom-modal :open="customModalOpen">
    <template #header>
      <h3 class="text-3xl">Modal title</h3>
    </template>
    <template #body>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam amet consequatur beatae
        reiciendis labore repellat eos id, qui iusto. Beatae, aliquid perferendis. Quaerat deleniti
        maxime, maiores eligendi voluptas laboriosam ullam.
      </p>
    </template>
    <template #footer>
      <div class="flex justify-end">
        <button class="btn mr-4" @click="customModalOpen = false">Close</button>
        <button type="submit" class="btn btn-primary">Accept</button>
      </div>
    </template>
  </custom-modal>
  <!--
  <fab-button position="bottom-left" @click="customModalOpen = true">
    <add-circle />
  </fab-button> -->

  <fab-button position="bottom-right" @click="modalOpen = true">
    <add-circle />
  </fab-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import CustomModal from '@/modules/common/components/CustomModal.vue';

import { useProjectStore } from '@/modules/projects/store/project.store';

const modalOpen = ref(false);
const customModalOpen = ref(false);

const projectsStore = useProjectStore();
</script>

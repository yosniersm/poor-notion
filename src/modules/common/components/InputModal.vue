<template>
  <!-- Open the modal using ID.showModal() method -->
  <dialog id="my_modal_1" class="modal" :open="open">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ title ?? 'Hello' }}</h3>
      <p class="py-4" v-if="subTitle">{{ subTitle }}</p>
      <div class="modal-action">
        <form method="dialog" @submit.prevent="submitValue">
          <input
            ref="inputRef"
            type="text"
            :placeholder="placeholder ?? 'Write Project Name'"
            class="input input-bordered input-primary w-full flex-1"
            v-model="inputValue"
          />

          <!-- if there is a button in form, it will close the modal -->
          <div class="flex justify-end mt-5">
            <button class="btn mr-4" @click="$emit('close')">Close</button>
            <button class="btn btn-primary">Accept</button>
          </div>
        </form>
      </div>
    </div>
  </dialog>
  <div
    v-if="open"
    class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-40 w-screen h-screen"
  ></div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

interface Props {
  open: boolean;
  placeholder?: string;
  title: string;
  subTitle?: string;
}
const props = defineProps<Props>();
const inputRef = ref<HTMLInputElement | null>(null);

watch(props, ({ open }) => {
  if (open) {
    inputRef.value?.focus();
  }
});

const emit = defineEmits<{
  close: [void];
  value: [text: string];
}>();

const inputValue = ref('');

const submitValue = () => {
  if (!inputValue.value) {
    // Focus on element
    inputRef.value?.focus();
    return;
  }

  emit('value', inputValue.value.trim());
  emit('close');
  inputValue.value = '';
};
</script>

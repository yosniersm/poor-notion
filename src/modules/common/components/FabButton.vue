<template>
  <button
    @click="$emit('click')"
    :class="['btn btn-circle btn-secondary fixed right-10', position]"
  >
    <slot />
  </button>
</template>
<script lang="ts" setup>
interface Props {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
});

defineEmits(['click']);
</script>

<style scoped>
.bottom-right {
  @apply bottom-10 right-10;
}
.bottom-left {
  @apply bottom-10 left-10;
}
.top-right {
  @apply top-10 right-10;
}
.top-left {
  @apply top-10 left-10;
}
</style>

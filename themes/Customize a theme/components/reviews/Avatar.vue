<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  name: { type: String, default: '' },
});

const letters = computed(() =>
  props.name
    .split(' ')
    .map((word) => word[0])
    .join('.')
);
</script>

<template>
  <div class="flex items-center justify-center w-14 h-14 bg-secondary">
    <span class="font-medium text-white text-sm">{{ letters }}</span>
  </div>
</template>

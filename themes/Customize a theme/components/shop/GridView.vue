<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: true,
    validator: (value: any) =>
      [
        'w-full',
        'w-full md:w-1/2',
        'w-1/2 md:w-1/3',
        'w-1/2 md:w-1/3 lg:w-1/4',
      ].includes(value),
  },
});

defineEmits(['update:modelValue']);

const gridOptions = [
  {
    value: 'w-full',
    icon: 'circum:grid-2-h',
    label: 'Single column',
  },
  {
    value: 'w-full md:w-1/2',
    icon: 'circum:grid-2-v',
    label: 'Two columns',
  },
  {
    value: 'w-1/2 md:w-1/3',
    icon: 'circum:grid-3-1',
    label: 'Three columns',
  },
  {
    value: 'w-1/2 md:w-1/3 lg:w-1/4',
    icon: 'circum:grid-4-2',
    label: 'Four columns',
  },
];
</script>

<template>
  <!--  -->
  <div
    class="w-fit md:min-w-48 h-10 hidden md:flex gap-2 items-center justify-between rounded-lg bg-third px-4 hover:scale-105 hover:opacity-90 transition-all duration-300"
  >
    <!--  -->
    <button
      v-for="option in gridOptions"
      :key="option.value"
      type="button"
      class="flex items-center justify-center cursor-pointer rounded-lg bg-third hover:text-secondary transition-colors"
      :class="{ 'text-secondary': modelValue === option.value }"
      :title="option.label"
      @click="$emit('update:modelValue', option.value)"
    >
      <!--  -->
      <Icon :name="option.icon" class="text-3xl translate" />
      <!--  -->
    </button>
    <!--  -->
  </div>
  <!--  -->
</template>

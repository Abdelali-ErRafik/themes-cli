<script setup lang="ts">
const props = defineProps({
  active: {
    type: Boolean,
    required: true,
  },
  filterText: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['toggle-sidebar']);

const handleClick = () => {
  emit('toggle-sidebar');
};
</script>

<template>
  <!--  -->
  <div
    v-if="props.active"
    class="w-fit md:min-w-48 h-10 flex lg:hidden gap-2 items-center cursor-pointer rounded-lg bg-third px-4 hover:scale-105 hover:opacity-90 transition-all duration-300"
    @click="handleClick"
  >
    <!--  -->
    <Icon
      name="solar:filters-linear"
      class="text-xl translate text-secondary"
    />
    <!--  -->

    <!--  -->
    <div class="text-sm font-medium">{{ props.filterText }}</div>
    <!--  -->
  </div>
  <!--  -->
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  removeAll: {
    type: Function,
    required: true,
  },
  fullWidth: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <!--  -->
  <div
    class="w-full lg:w-fit h-10 flex items-center justify-center px-8 cursor-pointer rounded-full border border-secondary bg-secondary text-white hover:bg-transparent hover:text-secondary click-effect"
    @click="removeAll"
  >
    <!--  -->
    <span class="text-sm font-medium">{{ text }}</span>
    <!--  -->
  </div>
  <!--  -->
</template>

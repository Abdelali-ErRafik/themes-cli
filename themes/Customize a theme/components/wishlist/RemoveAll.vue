<script setup lang="ts">
defineProps({
  showRemove: {
    type: Boolean,
    required: true,
  },
  removeText: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['remove-all']);

const onRemove = () => {
  emit('remove-all');
};
</script>

<template>
  <!--  -->
  <div v-if="showRemove" class="flex items-center justify-center">
    <!--  -->
    <div
      class="w-fit h-10 flex items-center justify-center px-8 cursor-pointer rounded-full border border-secondary bg-secondary text-white hover:bg-transparent hover:text-secondary click-effect"
      @click="onRemove"
    >
      <!--  -->
      <div class="text-sm font-medium">
        {{ removeText }}
      </div>
      <!--  -->
    </div>
  </div>
  <!--  -->
</template>

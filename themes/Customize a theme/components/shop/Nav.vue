<script setup lang="ts">
const props: any = defineProps({
  filterText: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['closeSidebar']);

const closeSidebar = () => {
  emit('closeSidebar');
};
</script>
<template>
  <!--  -->
  <div
    class="flex items-center justify-between border-b border-third bg-third lg:hidden p-4"
  >
    <!--  -->
    <h2 class="text-base font-medium text-primary">
      {{ props.filterText }}
    </h2>
    <!--  -->

    <!--  -->
    <span
      class="h-6 w-6 flex items-center justify-center bg-primary text-white border border-primary rounded-full cursor-pointer hover:bg-transparent hover:text-primary transition-colors duration-300"
    >
      <Icon
        name="material-symbols:close-rounded"
        class="text-base flex items-center justify-center"
        @click="closeSidebar"
      />
    </span>
  </div>
  <!--  -->
</template>

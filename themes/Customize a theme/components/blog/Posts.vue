<script setup lang="ts">
const props: any = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  emptyText: {
    type: String,
    default: 'No products available',
  },
});
</script>

<template>
  <!--  -->
  <div v-if="!props.loading">
    <!--  -->
    <div v-if="props.items.length > 0" class="overflow-hidden">
      <!--  -->
      <div class="flex flex-col gap-4">
        <!--  -->
        <ElementPost
          v-for="(item, index) in props.items"
          :key="index"
          :item="item"
          class="border border-third rounded-2xl overflow-hidden"
        />
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <div v-else class="flex flex-col gap-4 items-center justify-center my-5">
      <!--  -->
      <div class="py-3 text-lg font-medium">
        <!--  -->
        <span>{{ props.emptyText }}</span>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

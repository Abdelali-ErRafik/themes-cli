<script setup lang="ts">
defineProps({
  cartTitle: {
    type: String,
    required: true,
  },
  itemsLength: {
    type: Number,
    required: true,
  },
  productText: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <!--  -->
  <div class="flex items-center justify-between">
    <!--  -->
    <span class="text-base font-bold text-primary">
      {{ cartTitle }}
    </span>
    <!--  -->

    <!--  -->
    <span class="text-sm font-medium">
      {{ `${itemsLength} ${productText}` }}
    </span>
    <!--  -->
  </div>
  <!--  -->
</template>

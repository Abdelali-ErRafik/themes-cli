<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <!--  -->
  <div class="flex flex-col gap-6">
    <!--  -->
    <h2
      v-if="item.title.length > 0"
      class="text-xl font-black text-center lg:text-2xl text-primary"
    >
      {{ item.title }}
    </h2>
    <!--  -->

    <!--  -->
    <div
      v-if="item.excerpt.length > 0"
      class="relative rounded-lg overflow-hidden"
    >
      <!--  -->
      <div class="absolute inset-0 w-2 bg-secondary"></div>
      <!--  -->
      <div class="p-6 md:p-8 bg-third">
        <!--  -->
        <h3 class="text-sm md:text-base font-normal">{{ item.excerpt }}</h3>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <div
      v-if="item.content.length > 0"
      id="description"
      class="text-sm leading-6"
      v-html="item.content"
    ></div>
    <!--  -->
  </div>
  <!--  -->
</template>

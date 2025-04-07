<script setup lang="ts">
defineProps({
  homeName: {
    type: String,
    default: 'Home',
  },
  collection: {
    type: Object,
    default: null,
  },
  currentPageName: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <!--  -->
  <div class="border-b border-third">
    <!--  -->
    <div class="container flex flex-wrap items-center gap-2 pt-2 pb-4">
      <!--  -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <!--  -->
        <span
          class="text-xs font-medium hover:text-secondary hover:underline"
          >{{ homeName }}</span
        >
        <!--  -->

        <!--  -->
        <Icon name="solar:alt-arrow-right-linear" class="text-lg translate" />
        <!--  -->
      </NuxtLink>
      <!--  -->

      <!--  -->
      <NuxtLink
        v-if="collection && collection.slug"
        :to="`/shop/${collection.slug}`"
        class="flex items-center gap-2"
      >
        <!--  -->
        <span class="text-xs font-medium hover:text-secondary">{{
          collection.name
        }}</span>
        <!--  -->

        <!--  -->
        <Icon name="solar:alt-arrow-right-linear" class="text-lg translate" />
        <!--  -->
      </NuxtLink>
      <!--  -->

      <!--  -->
      <div class="flex items-center">
        <!--  -->
        <span class="text-xs font-medium text-secondary">{{
          currentPageName
        }}</span>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

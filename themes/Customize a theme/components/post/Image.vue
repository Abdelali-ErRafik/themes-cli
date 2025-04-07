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
  <div
    class="relative pb-3/5 bg-third border border-third rounded-lg overflow-hidden"
  >
    <!--  -->
    <NuxtLink
      :to="`/posts/${item.slug}`"
      :aria-label="item.title"
      class="absolute inset-0 w-full h-full"
    >
      <!--  -->
      <ImageLoader
        :src="item.image ? item.image.url : null"
        :alt="item.title"
        img-class="object-cover w-full h-full"
      />
      <!--  -->
    </NuxtLink>
    <!--  -->
  </div>
  <!--  -->
</template>

<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    required: true,
  },
  blog: {
    type: Object,
    required: true,
  },
});

const getDate = (date: any) => {
  const options: object = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};
</script>

<template>
  <!--  -->
  <div class="flex flex-col items-center md:items-start gap-3">
    <!--  -->
    <NuxtLink :to="`/posts/${item.slug}`" :aria-label="item.title">
      <!--  -->
      <h3 class="text-2xl font-black md:text-3xl text-primary">
        {{ item.title }}
      </h3>
      <!--  -->
    </NuxtLink>
    <!--  -->

    <!--  -->
    <div class="flex flex-wrap items-center gap-4">
      <!--  -->
      <div v-if="blog.date_creation.active" class="flex items-center gap-1">
        <!--  -->
        <Icon
          name="solar:clock-circle-linear"
          class="text-base text-secondary"
        />
        <!--  -->
        <span class="text-sm font-medium">{{ getDate(item.createdAt) }}</span>
        <!--  -->
      </div>
      <!--  -->

      <!--  -->
      <div
        v-if="blog.categories.active && item.categories.length > 0"
        class="flex items-center gap-1 categories"
      >
        <!--  -->
        <Icon name="solar:tag-linear" class="text-base text-secondary" />
        <!--  -->

        <!--  -->
        <div
          v-for="(category, index) in item.categories"
          :key="index"
          class="break flex items-center text-sm font-medium"
        >
          {{ category.name }}<span>, </span>
        </div>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

<style scoped>
.categories .break:last-child span {
  display: none;
}
</style>

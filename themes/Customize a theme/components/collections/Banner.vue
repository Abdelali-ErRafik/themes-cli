<script setup lang="ts">
import { useMainStore } from '@/stores/main';

const $store = useMainStore();

const props = defineProps({
  banner: {
    type: Object,
    required: true,
  },
});

const bannerName: any = computed(() => {
  return props.banner.name;
});

const bannerDescription: any = computed(() => {
  return props.banner.description;
});

const hasDescription: any = computed(() => {
  return props.banner.description.length > 0;
});

const shopImage: any = computed(() => {
  return props.banner.image?.src || $store.defaults.blogImage;
});
</script>

<template>
  <!--  -->
  <div class="relative w-full h-40 md:h-60 lg:h-80 overflow-hidden">
    <!--  -->
    <ImageLoader
      :src="shopImage"
      alt="banner image"
      img-class="object-cover w-full h-full"
    />
    <!--  -->

    <!--  -->
    <div
      class="absolute inset-0 flex items-center bg-gradient-to-r from-black/50 to-transparent"
    >
      <!--  -->
      <div class="max-w-2xl space-y-4 px-6 md:px-8">
        <!--  -->
        <h1 class="text-2xl lg:text-3xl font-bold text-white">
          {{ bannerName }}
        </h1>
        <!--  -->
        <p
          v-if="hasDescription"
          class="text-sm md:text-base text-gray-200 line-clamp-3"
        >
          {{ bannerDescription }}
        </p>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->
    <!--  -->
  </div>
  <!--  -->
</template>

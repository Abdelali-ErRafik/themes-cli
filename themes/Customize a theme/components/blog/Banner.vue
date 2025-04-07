<script setup lang="ts">
import { useMainStore } from '@/stores/main';

const $store = useMainStore();

const props = defineProps({
  banner: {
    type: Object,
    required: true,
  },
});

const isVisible = computed(() => {
  return props.banner.active;
});

const bannerName: any = computed(() => {
  return props.banner.title;
});

const shopImage: any = computed(() => {
  return props.banner.image?.src || $store.defaults.blogImage;
});
</script>

<template>
  <!--  -->
  <div
    v-if="isVisible"
    class="relative w-full h-40 md:h-60 lg:h-80 overflow-hidden"
  >
    <!--  -->
    <ImageLoader
      :src="shopImage"
      alt="banner image"
      img-class="object-cover w-full h-full"
    />
    <!--  -->

    <!--  -->
    <div class="absolute inset-0 flex items-center justify-center">
      <!--  -->
      <h1
        class="text-xl text-center text-white lg:text-2xl font-bold [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.4)]"
      >
        {{ bannerName }}
      </h1>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

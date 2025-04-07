<script setup lang="ts">
import { useMainStore } from '@/stores/main';

const $store = useMainStore();

const props = defineProps({
  banner: {
    type: Object,
    required: true,
  },
  type: {
    type: String as () => 'collection' | 'default',
    required: true,
    validator: (value: string) => ['collection', 'default'].includes(value),
  },
});

const isVisible = computed(() => {
  if (props.type === 'collection') return true;
  return props.banner.active;
});

const bannerName: any = computed(() => {
  if (props.type === 'collection') {
    return props.banner?.name;
  }
  return props.banner.title;
});

const shopImage: any = computed(() => {
  if (props.type === 'collection') {
    return props.banner?.image?.src;
  }
  return props.banner?.image?.src || $store.defaults.shopImage;
});
</script>

<template>
  <!--  -->
  <div
    v-if="isVisible"
    class="relative w-full h-40 md:h-60 lg:h-80 mb-5 overflow-hidden"
  >
    <!--  -->
    <ImageLoader
      img-class="object-cover w-full h-full"
      :src="shopImage"
      alt="banner image"
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

<script setup lang="ts">
import { computed } from 'vue';
import { useNuxtApp } from '#app';
import { useMainStore } from '@/stores/main';

const { $settings }: any = useNuxtApp();

const $store = useMainStore();
const brands = $settings.sections.brands;

const bgColor = ref(brands.colors.background_color);
const textColor = ref(brands.colors.text_color);

const title = ref(brands.content.title);
const description = ref(brands.content.description);

const hasTitleOrDescription = computed(() => title.value || description.value);

const itemsArray: any = computed(() => Object.values(brands.items || {}));
</script>

<template>
  <!--  -->
  <div
    class="flex flex-col gap-6 w-full mt-8 md:mt-12 lg:mt-16 transition-all duration-300"
    :style="{ backgroundColor: bgColor, color: textColor }"
  >
    <!--  -->
    <div v-if="hasTitleOrDescription" class="container flex flex-col gap-1">
      <!--  -->
      <h3 v-if="title" class="text-xl lg:text-2xl font-extrabold title-font">
        {{ title }}
      </h3>
      <!--  -->

      <!--  -->
      <div v-if="description" class="text-sm font-medium text-primary">
        {{ description }}
      </div>
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <div
      v-if="itemsArray.length > 0"
      class="w-full container-nop px-2 flex flex-col md:flex-row md:flex-wrap items-center"
    >
      <!--  -->
      <div
        v-for="(item, index) in itemsArray"
        :key="index"
        class="w-full p-2 md:w-1/2 lg:w-1/3 group relative overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1"
      >
        <!--  -->
        <NuxtLink
          :to="item.url"
          class="h-40 block border border-third bg-white/10 backdrop-blur-xl overflow-hidden rounded-lg transition-all duration-300"
        >
          <!--  -->
          <ImageLoader
            :src="item.imageSrc || $store.defaults.noImage"
            :alt="item.name"
            img-class="w-full h-full object-cover"
          />
          <!--  -->
        </NuxtLink>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

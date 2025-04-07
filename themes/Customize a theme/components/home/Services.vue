<script setup lang="ts">
import { computed } from 'vue';
import { useNuxtApp } from '#app';
import { useMainStore } from '@/stores/main';

const { $settings }: any = useNuxtApp();

const $store = useMainStore();

const services = $settings.sections.services;

const bgColor = ref(services.colors.background_color);
const textColor = ref(services.colors.text_color);

const title = ref(services.content.title);
const description = ref(services.content.description);

const hasTitleOrDescription = computed(() => title.value || description.value);

const itemsArray: any = computed(() => Object.values(services.items || {}));
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
        class="w-full p-2 md:w-1/2 lg:w-1/4 group relative overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1"
      >
        <!--  -->
        <NuxtLink
          :to="item.url"
          class="block py-3 px-4 border border-third bg-white/10 backdrop-blur-lg rounded-lg transition-all duration-300"
        >
          <!--  -->
          <div class="flex items-center gap-4">
            <!--  -->
            <div
              class="relative flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-white/10 transition-transform duration-300 group-hover:scale-105"
            >
              <!--  -->
              <ImageLoader
                :src="item.image ? item.image.src : $store.defaults.ServiceImage"
                :alt="item.title"
                img-class="w-full h-full object-contain"
              />
              <!--  -->
            </div>
            <!--  -->

            <!--  -->
            <div class="flex flex-col gap-1">
              <!--  -->
              <span class="text-base font-medium text-secondary">
                {{ item.title }}
              </span>
              <!--  -->

              <!--  -->
              <span class="text-sm font-normal text-third">{{
                item.description
              }}</span>
              <!--  -->
            </div>
            <!--  -->
          </div>
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

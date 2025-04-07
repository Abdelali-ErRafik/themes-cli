<script setup lang="ts">
import { ref } from 'vue';
import { useNuxtApp } from '#app';
import { useMainStore } from '@/stores/main';

const { $settings }: any = useNuxtApp();
const $store = useMainStore();

const offers = $settings.sections.offers;

const items = ref(offers.items);

const bgColor = ref(offers.colors.background_color);
const textColor = ref(offers.colors.text_color);

const swiperBreakpoints = {
  320: { slidesPerView: 2 },
  640: { slidesPerView: 3 },
  768: { slidesPerView: 4 },
  1024: { slidesPerView: 5 },
};

const navigation = ref({
  nextEl: '.offers-button-next',
  prevEl: '.offers-button-prev',
});
</script>

<template>
  <!--  -->
  <div v-if="items" class="offers">
    <!--  -->
    <ClientOnly>
      <!--  -->
      <div
        class="container-simple relative overflow-hidden -mt-44 px-4 md:px-20"
      >
        <!--  -->
        <swiper-container
          :breakpoints="swiperBreakpoints"
          :navigation="navigation"
          :slides-per-view="5"
          space-between="16"
        >
          <!--  -->
          <swiper-slide v-for="(item, index) in items" :key="index">
            <!--  -->
            <NuxtLink
              :to="item.link"
              class="group flex flex-col shadow-2xl cursor-pointer overflow-hidden"
              :style="{
                backgroundColor: bgColor,
                color: textColor,
              }"
            >
              <!--  -->
              <div
                v-if="item.title.length > 0"
                class="relative w-full flex items-center p-2 px-4 hover:text-secondary"
              >
                <!--  -->
                <span class="text-l font-medium truncate">
                  {{ item.title }}
                </span>
                <!--  -->
              </div>
              <!--  -->

              <!--  -->
              <ImageLoader
                img-class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                :src="item.image?.src || $store.defaults.offersImage"
                :alt="item.title"
              />
              <!--  -->
            </NuxtLink>
            <!--  -->
          </swiper-slide>
          <!--  -->
        </swiper-container>
        <!--   -->

        <!--  -->
        <div class="navigation hidden md:flex">
          <!--  -->
          <div
            class="offers-button-prev absolute transform -translate-y-1/2 top-1/2 -left-0 z-10 bg-gray-300/[.2] hover:bg-gray-300/[.4] text-gray-400 rounded-full cursor-pointer p-2 mx-2 md:p-3 md:mx-4"
          >
            <!--  -->
            <Icon
              name="solar:arrow-left-linear"
              class="flex items-center justify-center text-2xl translate"
            />
            <!--  -->
          </div>
          <!--  -->

          <!--  -->
          <div
            class="offers-button-next absolute transform -translate-y-1/2 top-1/2 -right-0 z-10 bg-gray-300/[.2] hover:bg-gray-300/[.4] text-gray-400 rounded-full cursor-pointer p-2 mx-2 md:p-3 md:mx-4"
          >
            <!--  -->
            <Icon
              name="solar:arrow-right-linear"
              class="flex items-center justify-center text-2xl translate"
            />
            <!--  -->
          </div>
          <!--  -->
        </div>
        <!--  -->
      </div>
      <!--  -->
    </ClientOnly>
    <!--  -->
  </div>
  <!--  -->
</template>

<style scoped>
@keyframes subtle-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.group:hover img {
  animation: subtle-bounce 1s ease infinite;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMainStore } from '@/stores/main';
import { useNuxtApp } from '#app';

const { $settings }: any = useNuxtApp();
const $store = useMainStore();

const carousel = ref($settings.sections.carousel);
const colors = ref(carousel.value.colors);
const options = carousel.value.options;

const itemsArray: any = computed(() =>
  Object.values(carousel.value.slides || {})
);

const autoplay = ref({
  delay: options.auto_play ? 50000 : 0,
});

const navigation = ref({
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
});

const pagination = ref({
  el: '.swiper-pagination',
  type: 'bullets',
  clickable: true,
});
</script>

<template>
  <!--  -->
  <div v-if="itemsArray.length > 0" class="slider">
    <!--  -->
    <div
      class="relative"
      :class="options.full_screen ? 'w-full' : 'container'"
      :style="{ backgroundColor: colors.bg_color, color: colors.text_color }"
    >
      <!--  -->
      <!--  -->
      <ClientOnly>
        <!--  -->
        <swiper-container
          class="swiperCarousel"
          :loop="true"
          :autoplay="autoplay"
          :navigation="navigation"
          :pagination="pagination"
        >
          <!--  -->
          <swiper-slide
            v-for="(item, index) in itemsArray"
            :key="index"
            class="relative overflow-hidden"
          >
            <!--  -->
            <ImageLoader
              img-class="object-cover w-full h-full"
              :src="item.image?.src || $store.defaults.carouselImage"
              :alt="item.title"
            />
            <!--  -->

            <!--  -->
            <div
              v-if="item.title || item.description"
              class="max-w-screen-md flex flex-col items-center gap-4 absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4"
              :style="{ color: item.text_color }"
            >
              <!--  -->
              <h3 v-if="item.title" class="text-2xl font-bold">
                {{ item.title }}
              </h3>
              <!--  -->

              <!--  -->
              <p v-if="item.description" class="text-lg font-medium">
                {{ item.description }}
              </p>
              <!--  -->

              <!--  -->
              <NuxtLink
                v-if="item.button.active && item.button.text && item.button.url"
                :to="item.button.url"
                class="w-fit h-10 flex items-center justify-center px-8 cursor-pointer rounded-full border border-secondary bg-secondary text-white hover:bg-transparent hover:text-secondary click-effect"
              >
                <!--  -->
                <span class="text-sm font-medium">
                  {{ item.button.text }}
                </span>
                <!--  -->
              </NuxtLink>
              <!--  -->
            </div>
            <!--  -->
          </swiper-slide>
          <!--  -->
        </swiper-container>
        <!--  -->

        <!--  -->
        <div
          v-if="options.navigation"
          class="navigation opacity-0 transition-all duration-300"
        >
          <!--  -->
          <div
            class="swiper-button-prev absolute top-[30%] left-0 transform -translate-y-1/2 z-10 bg-black/[.2] hover:bg-black/[.4] text-white rounded-full cursor-pointer p-2 mx-2 md:p-3 md:mx-4"
          >
            <!--  -->
            <Icon
              name="solar:alt-arrow-left-linear"
              class="flex items-center justify-center text-2xl translate"
            />
            <!--  -->
          </div>
          <!--  -->

          <!--  -->
          <div
            class="swiper-button-next absolute top-[30%] right-0 transform -translate-y-1/2 z-10 bg-black/[.2] hover:bg-black/[.4] text-white rounded-full cursor-pointer p-2 mx-2 md:p-3 md:mx-4"
          >
            <!--  -->
            <Icon
              name="solar:alt-arrow-right-linear"
              class="flex items-center justify-center text-2xl translate"
            />
            <!--  -->
          </div>
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div
          v-if="options.pagination"
          class="swiper-pagination absolute top-0"
        ></div>
        <!--  -->
      </ClientOnly>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

<style lang="scss" scoped>
.slider:hover .navigation {
  opacity: 1;
}

.swiperCarousel::after {
  height: 180px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0, #fff 45%);
  margin-top: -180px;
}

.swiperCarousel::after {
  content: '';
  display: block;
  width: 100%;
  position: absolute;
  z-index: 1;
}

.swiperCarousel {
  width: 100%;
  height: var(--mobile-height);
}

@media (min-width: 768px) {
  .swiperCarousel {
    height: var(--tablet-height);
  }
}

@media (min-width: 1024px) {
  .swiperCarousel {
    height: var(--desktop-height);
  }
}
</style>

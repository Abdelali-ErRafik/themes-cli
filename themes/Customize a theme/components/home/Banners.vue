<script setup lang="ts">
import { ref, computed } from 'vue';
import { useNuxtApp } from '#app';
import { useMainStore } from '@/stores/main';

const { $settings }: any = useNuxtApp();

const store = useMainStore();
const banners = $settings.sections.banners;

const title = ref(banners.content.title);
const description = ref(banners.content.description);

const hasTitleOrDescription = computed(() => title.value || description.value);
const itemsArray: any = computed(() => Object.values(banners.items || {}));

const getRouterLinkClass = (item: any) => {
  return item.button.active &&
    item.button.text.length > 0 &&
    item.button.url.length > 0
    ? 'pointer-events-auto'
    : 'pointer-events-none';
};

const getRouterLinkTo = (item: any) => {
  return item.button.active &&
    item.button.text.length > 0 &&
    item.button.url.length > 0
    ? item.button.url
    : '#';
};
</script>

<template>
  <div class="mt-8 md:mt-12 lg:mt-16">
    <!--  -->
    <div class="flex flex-col gap-6">
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
        class="container-nop w-full relative flex flex-wrap items-center px-2"
      >
        <!--  -->
        <div
          v-for="(item, index) in itemsArray.slice(0, 6)"
          :key="index"
          class="group w-full md:w-1/2 lg:w-1/3 p-2"
        >
          <div class="relative rounded-lg overflow-hidden">
            <!--  -->
            <ImageLoader
              img-class="object-cover w-full rounded-lg h-52 md:h-56 lg:h-64 transition-transform duration-300 group-hover:scale-110"
              :src="item.image ? item.image.src : store.defaults.BannersImage"
              :alt="item.title"
            />
            <!--  -->

            <!--  -->
            <NuxtLink
              :class="getRouterLinkClass(item)"
              :to="getRouterLinkTo(item)"
            >
              <!--  -->
              <div class="absolute inset-0 flex items-center p-8">
                <!--  -->
                <div
                  :style="'max-width: 70%; color:' + item.text_color + ';'"
                  class="flex flex-col gap-2.5"
                >
                  <!--  -->
                  <h4
                    v-if="item.title.length > 0"
                    class="text-2xl font-bold truncate"
                  >
                    {{ item.title }}
                  </h4>
                  <!--  -->

                  <!--  -->
                  <h3
                    v-if="item.description.length > 0"
                    class="text-xs font-medium truncate opacity-60"
                  >
                    {{ item.description }}
                  </h3>
                  <!--  -->

                  <!--  -->
                  <NuxtLink
                    v-if="item.button.active && item.button.text.length > 0"
                    :to="item.button.url"
                    class="w-fit h-10 flex items-center justify-center px-8 cursor-pointer rounded-full border border-secondary bg-secondary text-white hover:bg-transparent hover:text-secondary click-effect"
                  >
                    <!--  -->
                    <span class="text-xs font-medium truncate">
                      {{ item.button.text }}
                    </span>
                    <!--  -->
                  </NuxtLink>
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
    </div>
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

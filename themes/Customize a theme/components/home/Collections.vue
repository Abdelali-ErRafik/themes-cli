<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useMainStore } from '@/stores/main';

const { $storeino, $settings }: any = useNuxtApp();
const $store = useMainStore();

const items: any = ref([]);
const loading = ref(true);
const collections = $settings.sections.collections;

const swiperBreakpoints = {
  320: { slidesPerView: 2.5 },
  640: { slidesPerView: 3.5 },
  768: { slidesPerView: 4.5 },
  960: { slidesPerView: 5.5 },
  1080: { slidesPerView: 6.5 },
  1280: { slidesPerView: 7.5 },
};

const navigation = ref({
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
});

const languageCode = computed(() => $store.language.code);

const noProductsMessage = computed(() => {
  switch (languageCode.value) {
    case 'AR':
      return 'ليس لديك أي مجموعات';
    case 'FR':
      return "Vous n'avez aucune collection";
    default:
      return "You don't have any collection";
  }
});

const goToAdminMessage = computed(() => {
  switch (languageCode.value) {
    case 'AR':
      return 'انتقل إلى مسؤول المتجر الخاص بك > المنتجات > المجموعات';
    case 'FR':
      return "Accédez à l'administration de votre boutique > produits > collections >";
    default:
      return 'Go to your store admin > products > collections >';
  }
});

const addNewLabel = computed(() => {
  switch (languageCode.value) {
    case 'AR':
      return 'اضف جديد';
    case 'FR':
      return 'Ajouter nouveau';
    default:
      return 'Add new';
  }
});

const viewDemoLabel = computed(() => {
  switch (languageCode.value) {
    case 'AR':
      return 'شاهد العرض التوضيحي للسمة';
    case 'FR':
      return 'Voir la démo du thème';
    default:
      return 'View theme demo';
  }
});

const fetchCollections = async () => {
  try {
    const filter = {};
    if (collections.items.length > 0) {
      items.value = collections.items;
    } else {
      const { data } = await $storeino.collections.search(filter);
      items.value = data.results;
    }
  } catch (err) {
    console.error({ err });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCollections();
});
</script>

<template>
  <!--  -->
  <div class="container mt-8 md:mt-12 lg:mt-16">
    <!--  -->
    <div v-if="loading" class="flex items-center justify-center my-10">
      <!--  -->
      <LoaderGlobal></LoaderGlobal>
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <div v-if="!loading && items.length > 0" class="flex flex-col gap-6">
      <!--  -->
      <h3
        v-if="collections.title.length > 0"
        class="text-xl lg:text-2xl font-extrabold title-font"
      >
        {{ collections.title }}
      </h3>
      <!--  -->

      <!--  -->
      <ClientOnly>
        <!--  -->
        <div class="relative">
          <!--  -->
          <swiper-container
            :breakpoints="swiperBreakpoints"
            :navigation="navigation"
            :slides-per-view="6.5"
            space-between="16"
          >
            <!--  -->
            <swiper-slide v-for="(item, index) in items" :key="index">
              <!--  -->
              <ElementCollection :item="item" />
              <!--  -->
            </swiper-slide>
            <!--  -->
          </swiper-container>
          <!--   -->

          <!--  -->
          <div class="navigation">
            <!--  -->
            <div
              class="swiper-button-prev absolute top-[35%] left-0 transform -translate-y-1/2 z-10 bg-black/[.2] hover:bg-black/[.4] text-white rounded-full cursor-pointer p-2 mx-2 md:p-2 md:mx-4"
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
              class="swiper-button-next absolute top-[35%] right-0 transform -translate-y-1/2 z-10 bg-black/[.2] hover:bg-black/[.4] text-white rounded-full cursor-pointer p-2 mx-2 md:p-2 md:mx-4"
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

    <!--  -->
    <div v-if="!loading && items.length === 0" class="my-10">
      <!--  -->
      <div
        class="p-5 flex flex-col lg:flex-row gap-6 lg:gap-0 items-center border-2 border-primary rounded-lg"
      >
        <!--  -->
        <div class="flex items-center justify-center w-full lg:w-1/2">
          <!--  -->
          <Icon
            name="solar:notification-unread-linear"
            class="flex items-center justify-center text-9xl text-primary translate"
          />
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div class="flex flex-col gap-2">
          <!--  -->
          <h2
            class="title-font text-lg lg:text-xl font-extrabold text-center lg:text-start"
          >
            {{ noProductsMessage }}
          </h2>
          <!--  -->

          <!--  -->
          <p class="text-sm font-medium lg:text-center">
            {{ goToAdminMessage }}
            <!--  -->
            <a
              href="//business.storeino.com/stores/products"
              target="_blank"
              class="underline text-primary font-bold hover:text-secondary"
            >
              {{ addNewLabel }}
            </a>
            <!--  -->
          </p>
          <!--  -->

          <!--  -->
          <div class="flex justify-center lg:justify-start">
            <!--  -->
            <a
              href="https://marketmall-theme.storeino.com"
              target="_blank"
              class="h-10 px-8 flex items-center justify-center font-medium rounded-full bg-secondary text-white border border-secondary hover:bg-transparent hover:text-secondary transition-all duration-300"
            >
              <!--  -->
              <span class="text-sm font-normal">{{ viewDemoLabel }}</span>
              <!--  -->
            </a>
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

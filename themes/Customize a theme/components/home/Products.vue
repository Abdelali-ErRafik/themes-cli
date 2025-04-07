<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useMainStore } from '@/stores/main';
import { useNuxtApp } from '#app';

// Access global settings
const { $settings, $storeino }: any = useNuxtApp();
const $store = useMainStore();

// Props
const props = defineProps({
  product: { type: Object, required: true },
});

// Variables
const products = $settings.sections.products;
const bgColor = ref(products.colors.background);
const textColor = ref(products.colors.text);

const title = ref(props.product.title);
const description = ref(props.product.description);

const collections = ref(props.product.collections);

const showMoreText = ref(props.product.show_more_text);
const showMoreUrl = ref(props.product.show_more_url);

const tags = ref(props.product.tags);
const items = ref([]);

const loading = ref(true);

const swiperBreakpoints = {
  320: { slidesPerView: 2 },
  640: { slidesPerView: 3 },
  768: { slidesPerView: 4 },
  1024: { slidesPerView: 5 },
  1280: { slidesPerView: 6 },
};

const languageCode = computed(() => $store.language.code);

const hasTitleOrDescription = computed(() => title.value || description.value);

const noProductsMessage = computed(() => {
  switch (languageCode.value) {
    case 'AR':
      return 'ليس لديك أي منتجات';
    case 'FR':
      return "Vous n'avez aucun produit";
    default:
      return "You don't have any products";
  }
});

const goToAdminMessage = computed(() => {
  switch (languageCode.value) {
    case 'AR':
      return 'انتقل إلى مسؤول متجرك > المنتجات >';
    case 'FR':
      return "Allez dans l'administration de votre boutique > produits >";
    default:
      return 'Go to your store admin > products >';
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

onMounted(() => {
  fetchProducts();
});

async function fetchProducts() {
  loading.value = true;
  try {
    const filter: any = { status: 'PUBLISH' };
    if (collections.value.length) {
      filter['collections._id-in'] = collections.value.map((c: any) => c._id);
    }

    if (tags.value.length) {
      filter['tags._id-in'] = tags.value.split(',');
    }

    const { data } = await $storeino.products.search(filter);
    items.value = data.results;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <!--  -->
  <div
    v-if="product.active"
    class="container mt-8 md:mt-12 lg:mt-16"
    :style="{ backgroundColor: bgColor, color: textColor }"
  >
    <!--  -->
    <div v-if="loading" class="flex items-center justify-center my-10">
      <LoaderGlobal />
    </div>
    <!--  -->

    <!--  -->
    <div v-if="!loading && items.length > 0" class="flex flex-col gap-6">
      <!--  -->
      <div v-if="hasTitleOrDescription" class="flex flex-col gap-1">
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
      <div class="overflow-hidden">
        <!--  -->
        <ClientOnly>
          <!--  -->
          <swiper-container
            :breakpoints="swiperBreakpoints"
            :slides-per-view="1"
            space-between="16"
          >
            <!--  -->
            <swiper-slide
              v-for="(item, index) in items"
              :key="index"
              class="h-auto border border-third rounded-2xl overflow-hidden"
            >
              <!--  -->
              <ElementProduct :item="item" page="home" />
              <!--  -->
            </swiper-slide>
            <!--  -->
          </swiper-container>
          <!--  -->
        </ClientOnly>
        <!--  -->
      </div>
      <!--  -->

      <!--  -->
      <div class="flex items-center justify-center">
        <!--  -->
        <NuxtLink
          v-if="showMoreText"
          :to="showMoreUrl"
          class="h-10 w-fit px-8 md:px-16 flex items-center justify-center bg-secondary text-white border border-secondary rounded-full hover:bg-transparent hover:text-secondary transition-all duration-300"
        >
          <!--  -->
          <span class="text-sm font-normal">{{ showMoreText }}</span>
          <!--  -->
        </NuxtLink>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->

    <!-- -->
    <div v-if="!loading && items.length == 0" class="my-10">
      <!--  -->
      <div
        class="p-5 flex flex-col lg:flex-row gap-6 lg:gap-0 items-center border-2 border-primary rounded-lg"
      >
        <!--  -->
        <div class="flex items-center justify-center w-full lg:w-1/2">
          <!--  -->
          <Icon
            name="solar:box-linear"
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

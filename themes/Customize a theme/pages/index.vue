<script setup lang="ts">
import { computed } from 'vue';
import { useNuxtApp } from '#app';
import { useMainStore } from '@/stores/main';

const $store = useMainStore();

const { $settings, $storeino, $tools }: any = useNuxtApp();
const { carousel, collections, products, offers } = $settings.sections;

const productsItems = computed(() => {
  return products?.items ? Object.values(products.items) : [];
});

$storeino.fbpx('PageView');

onMounted(() => {
  // SEO
  $store.seo.title = $settings.store_name;
  $store.seo.description = $settings.store_description;

  // Pixels
  $tools.call('PAGE_VIEW');
  $storeino.fbpx('PageView');
});
</script>

<template>
  <div class="home-page mb-8 md:mb-14 lg:mb-16">
    <!-- Carousel -->
    <HomeSlider v-if="carousel.active" />

    <!-- Offers -->
    <HomeOffers v-if="offers.active" />

    <!-- Collections -->
    <HomeCollections v-if="collections.active" />

    <!-- Home Events -->
    <!-- <HomeEvents />   -->

    <!-- Products  -->
    <template v-if="products.active">
      <HomeProducts
        v-for="(product, index) in productsItems"
        v-if="productsItems.length > 0"
        :key="index"
        :product="product"
      />
    </template>

    <!-- Banners -->
    <HomeBanners />

    <!-- Services -->
    <HomeServices />

    <!-- brands -->
    <HomeBrands />

    <!-- Posts -->
    <HomePosts />

    <!--  -->
    <div class="container">
      <AppsLoader placement="BEFORE_HOME_FOOTER" />
    </div>
    <!--  -->
  </div>
</template>

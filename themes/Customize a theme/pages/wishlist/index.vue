<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useNuxtApp } from '#app';
import { useMainStore } from '@/stores/main';

const { $settings, $storeino, $tools }: any = useNuxtApp();
const $store = useMainStore();

const loading = ref({ wishlist: true });
const items = ref([]);

const sections = $settings.sections;
const alerts = ref(sections.alerts);

const storeName = $settings.store_name;
const storeDescription = $settings.store_description;

const pagesNav = ref(sections.pages);
const wishlist: any = ref(sections.wishlist);

const buttons = ref(wishlist.value.buttons);
const texts = ref(wishlist.value.texts);

const setSeo = () => {
  const title = wishlist.value.title + ' - ' + storeName;
  const description = wishlist.value.description || storeDescription;
  $store.seo.title = title;
  $store.seo.description = description;
};

const initWishlist = async () => {
  items.value = [];
  const ids = $store.wishlist.map((item) => item._id);
  loading.value.wishlist = true;

  if (ids.length > 0) {
    try {
      const response = await $storeino.products.search({
        '_id-in': ids,
        limit: 1000,
      });
      items.value = response.data.results;
    } catch (err) {
      console.log('🚀 ~ initWishlist ~ err:', err);
    }
  }

  loading.value.wishlist = false;
};

const removeAllFromWishlist = () => {
  items.value.forEach((item) => {
    $tools.call('REMOVE_FROM_WISHLIST', item);
  });

  $tools.toast(alerts.value.wishlist.removed_text);
};

useFetch(async () => {
  setSeo();
  await initWishlist();
});

watch(
  () => $store.wishlist,
  async () => {
    await initWishlist();
  }
);
</script>

<template>
  <!-- -->
  <div class="wishlist-page">
    <!-- -->
    <AppsLoader placement="WISHLIST_PAGE" />
    <!-- -->

    <!--  -->
    <GlobalNav
      :home-name="pagesNav.home.name"
      :current-page-name="texts.navbar_text"
    />
    <!--  -->

    <!-- -->
    <div v-if="loading.wishlist" class="flex items-center justify-center my-10">
      <!-- -->
      <LoaderGlobal />
      <!-- -->
    </div>
    <!-- -->

    <!-- -->
    <div
      v-if="!loading.wishlist && items.length == 0"
      class="flex justify-center my-20"
    >
      <!-- -->
      <WishlistEmpty :texts="texts" :buttons="buttons" />
      <!-- -->
    </div>
    <!--  -->

    <!--  -->
    <div
      v-if="!loading.wishlist && items.length > 0"
      class="container-nop my-10 md:my-14 lg:my-16 px-2"
    >
      <!--  -->
      <div class="flex flex-col gap-4">
        <!--  -->
        <WishlistNav :texts="texts" :buttons="buttons" :items="items" />
        <!--  -->

        <!--  -->
        <div class="flex flex-wrap">
          <!--  -->
          <div
            v-for="(item, index) in items"
            :key="index"
            class="w-1/2 md:w-1/3 lg:w-1/5 p-2"
          >
            <!--  -->
            <ElementProduct
              :item="item"
              page="wishlist"
              class="border border-third rounded-2xl overflow-hidden"
            />
            <!--  -->
          </div>
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <WishlistRemoveAll
          :show-remove="buttons.show_remove"
          :remove-text="buttons.remove_text"
          @remove-all="removeAllFromWishlist"
        />
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNuxtApp } from '#app';

const items = ref([]);
const item: any = ref(null);
const loading = ref(true);

const { $settings, $storeino, $tools }: any = useNuxtApp();
const route = useRoute();
const router = useRouter();

const sections = $settings.sections;
const pagesNav = ref(sections.pages);

const fetchData = async () => {
  loading.value = true;
  try {
    const { data: collection } = await $storeino.collections.get({
      slug: route.params.slug,
    });
    item.value = collection;

    const {
      data: { results },
    } = await $storeino.collections.search({ parent: collection._id });
    items.value = results;

    if (item.value && items.value.length === 0) {
      router.push(`/shop/${item.value.slug}`);
    }
  } catch (err) {
    console.log('🚀 ~ fetchData ~ err:', err);
    router.push(`/shop`);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchData();

  $tools.call('PAGE_VIEW');
  $storeino.fbpx('PageView');
});
</script>

<template>
  <div class="collections-page">
    <!-- -->
    <AppsLoader placement="COLLECTIONS_PAGE" />
    <!-- -->

    <!--  -->
    <GlobalNav
      v-if="item"
      :home-name="pagesNav.home.name"
      :current-page-name="item.name"
    />
    <!--  -->

    <!--  -->
    <div v-if="loading" class="flex items-center justify-center my-10">
      <!--  -->
      <LoaderGlobal />
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <CollectionsBanner v-if="item" :banner="item" />
    <!--  -->

    <!--  -->
    <div
      v-if="!loading && items.length > 0"
      class="container my-10 md:my-14 lg:my-16"
    >
      <!--  -->
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
      >
        <!--  -->
        <div
          v-for="(item, i) in items"
          :key="i"
          class="transform transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden"
        >
          <!--  -->
          <ElementCollection :item="item" page="collections" />
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

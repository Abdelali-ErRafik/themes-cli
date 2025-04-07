<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const props: any = defineProps({
  item: Object,
});

const loading = ref(true);
const items = ref([]);

const { $storeino, $settings }: any = useNuxtApp();
const product = ref($settings.sections.product);

const swiperBreakpoints = {
  320: { slidesPerView: 2 },
  640: { slidesPerView: 3 },
  768: { slidesPerView: 4 },
  1024: { slidesPerView: 5 },
  1280: { slidesPerView: 6 },
};

const fetchRelatedItems = async () => {
  try {
    const ids = props.item.collections.map((c: any) => c._id);
    const { data } = await $storeino.products.search({
      '_id-ne': props.item._id,
      'collections._id-in': ids,
    });

    items.value = data.results;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchRelatedItems();
});
</script>

<template>
  <!--  -->
  <div v-if="items.length > 0" class="">
    <!--  -->
    <div v-if="loading" class="flex items-center justify-center my-10">
      <si-loader></si-loader>
    </div>
    <!--  -->

    <!--  -->
    <div v-if="!loading" class="flex flex-col gap-6">
      <!--  -->
      <div class="flex flex-col">
        <!--  -->
        <h3
          v-if="product.related.title.length > 0"
          class="text-xl lg:text-2xl font-extrabold title-font text-primary"
        >
          {{ product.related.title }}
        </h3>
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
          v-if="product.related.more.length > 0"
          to="/shop"
          class="h-10 w-fit px-8 md:px-16 flex items-center justify-center bg-secondary text-white border border-secondary rounded-full hover:bg-transparent hover:text-secondary transition-all duration-300"
        >
          <!--  -->
          <span class="text-sm font-normal">{{ product.related.more }}</span>
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

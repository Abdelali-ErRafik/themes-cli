<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const props: any = defineProps({
  item: Object,
});

const loading = ref(true);
const items: any = ref([]);

const { $storeino, $settings }: any = useNuxtApp();
const related = $settings.sections.post.related;

const fetchData = async () => {
  loading.value = true;
  try {
    const ids = props.item.categories.map((c: any) => c._id);

    const { data } = await $storeino.pages.search({
      '_id-ne': props.item._id,
      'categories._id-in': ids,
    });

    items.value = data.results;
  } catch (err) {
    console.log('🚀 ~ fetchData ~ err:', err);
  }
  loading.value = false;
};

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <!--  -->
  <div class="flex flex-col gap-4">
    <!--  -->
    <div v-if="loading" class="flex items-center justify-center my-10">
      <!--  -->
      <LoaderGlobal />
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <div v-if="!loading && items.length > 0" class="flex flex-col gap-4">
      <!--  -->
      <div class="flex items-center justify-center md:justify-start">
        <!--  -->
        <h3
          v-if="related.title.length > 0"
          class="text-lg font-black text-primary"
        >
          {{ related.title }}
        </h3>
        <!--  -->
      </div>
      <!--  -->

      <!--  -->
      <div
        class="flex flex-col gap-4 border border-third rounded-lg overflow-hidden p-4"
      >
        <!--  -->
        <NuxtLink
          v-for="(item, i) in items.slice(0, 6)"
          :key="i"
          :to="`/posts/${item.slug}`"
          :aria-label="item.title"
          class="flex items-center gap-4 p-2 bg-third border border-third rounded-lg overflow-hidden hover:opacity-90 hover:scale-105 transition-all duration-300"
        >
          <!--  -->
          <div class="flex-none border border-third rounded-lg overflow-hidden">
            <!--  -->
            <ImageLoader
              img-class="object-cover w-20 h-20 lg:h-16 lg:w-16"
              :src="item.image ? item.image.url : null"
              :alt="item.title"
            />
            <!--  -->
          </div>
          <!--  -->

          <!--  -->
          <h3 class="text-sm font-medium">{{ item.title }}</h3>
          <!--  -->
        </NuxtLink>
        <!--  -->
      </div>
      <!--  -->

      <!--  -->
      <div class="flex items-center justify-center md:justify-start">
        <!--  -->
        <NuxtLink
          v-if="related.show_more_text.length > 0"
          to="/blog"
          class="w-fit h-10 flex items-center justify-center px-8 cursor-pointer rounded-full border border-secondary bg-secondary text-white hover:bg-transparent hover:text-secondary click-effect"
        >
          <!--  -->
          <span class="text-sm font-medium">{{ related.show_more_text }}</span>
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

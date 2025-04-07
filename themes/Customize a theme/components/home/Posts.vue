<script setup lang="ts">
import { ref } from 'vue';
import { useNuxtApp } from '#app';
import { useMainStore } from '@/stores/main';

const { $settings, $storeino }: any = useNuxtApp();
const $store = useMainStore();

const posts = $settings.sections.posts;
const title = ref(posts.content.title);

const description = ref(posts.content.description);
const buttonText = ref(posts.button.text);

const loading = ref(true);
const items = ref([]);

const languageCode = computed(() => $store.language.code);

const noProductsMessage = computed(() => {
  switch (languageCode.value) {
    case 'AR':
      return 'ليس لديك أية مقالات';
    case 'FR':
      return "Vous n'avez aucun articles";
    default:
      return "You don't have any posts";
  }
});

const goToAdminMessage = computed(() => {
  switch (languageCode.value) {
    case 'AR':
      return ' انتقل إلى مسؤول المتجر الخاص بك > مدونة > منشورات >';
    case 'FR':
      return "Accédez à l'administrateur de votre boutique > blog > publications >";
    default:
      return 'Go to your store admin > blog > posts >';
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

const fetchPosts = async () => {
  loading.value = true;
  try {
    if (posts.items != null && posts.items.length > 0) {
      items.value = posts.items;
    } else {
      const { data } = await $storeino.pages.search({
        status: 'PUBLISH',
        type: 'POST',
      });

      items.value = data.results;
    }
  } catch (err) {
    console.log('🚀 ~ fetchPosts ~ err:', err);
  }
  loading.value = false;
};

onMounted(async () => {
  await fetchPosts();
});
</script>

<template>
  <!--  -->
  <div class="mt-10">
    <!--  -->
    <div
      v-if="loading"
      class="container flex items-center justify-center my-10"
    >
      <!--  -->
      <LoaderGlobal />
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <div
      v-if="!loading && items.length > 0"
      class="container-nop flex flex-col gap-4"
    >
      <!--  -->
      <div v-if="title || description" class="flex flex-col gap-1 px-4">
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
      <div class="flex flex-wrap px-2">
        <!--  -->
        <div
          v-for="(item, i) in items"
          :key="i"
          class="w-full md:w-1/2 lg:w-1/3 p-2"
        >
          <!--  -->
          <div class="h-full border border-third rounded-2xl overflow-hidden">
            <!--  -->
            <ElementPost :item="item" page="home" />
            <!--  -->
          </div>
          <!--  -->
        </div>
        <!--  -->
      </div>
      <!--  -->

      <!--  -->
      <div class="flex items-center justify-center px-4">
        <!--  -->
        <NuxtLink
          v-if="buttonText"
          to="/blog"
          class="h-10 w-fit px-8 md:px-16 flex items-center justify-center bg-secondary text-white border border-secondary rounded-full hover:bg-transparent hover:text-secondary transition-all duration-300"
        >
          <!--  -->
          <span class="text-sm font-normal">{{ buttonText }}</span>
          <!--  -->
        </NuxtLink>
        <!--  -->
      </div>
      <!--  -->
    </div>

    <!-- -->
    <div v-if="!loading && items.length == 0" class="container my-10">
      <!--  -->
      <div
        class="p-5 flex flex-col lg:flex-row gap-6 lg:gap-0 items-center border-2 border-primary rounded-lg"
      >
        <!--  -->
        <div class="flex items-center justify-center w-full lg:w-1/2">
          <!--  -->
          <Icon
            name="hugeicons:quill-write-02"
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

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMainStore } from '~/stores/main';

const { $settings, $storeino, $tools }: any = useNuxtApp();
const route = useRoute();
const router = useRouter();

const $store = useMainStore();

const loading = ref(true);
const item: any = ref(null);

const sections = $settings.sections;
const post = ref(sections.post);
const pagesNav = ref(sections.pages);

const socialMedia = ref([
  {
    name: 'facebook',
    url: 'https://www.facebook.com/sharer.php?u={url}',
    image: 'hugeicons:facebook-02',
    color: '#3b5998',
    size: 'text-3xl',
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/intent/tweet?url={url}&text={title}',
    image: 'hugeicons:new-twitter',
    color: '#1da1f2',
    size: 'text-3xl',
  },
  {
    name: 'whatsapp',
    url: 'https://api.whatsapp.com/send?text={title}%20{url}',
    image: 'hugeicons:whatsapp',
    color: '#25d366',
    size: 'text-3xl',
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/sharing/share-offsite/?url={url}',
    image: 'hugeicons:linkedin-02',
    color: '#0072b1',
    size: 'text-3xl',
  },
]);

const fetchData = async () => {
  try {
    loading.value = true;
    const { slug } = route.params;
    const { data } = await $storeino.pages.get({ slug, type: 'PAGE' });
    item.value = data;

    const { store_name, store_description } = $settings;
    $store.seo.title = `${item.value.title} - ${store_name}`;
    $store.seo.description = item.value.excerpt || store_description;
    if (item.value.image) {
      $store.seo.image = item.value.image.url;
    }

    const url = `https://${$store.domain}/pages/${slug}`;
    socialMedia.value = socialMedia.value.map((button) => ({
      ...button,
      url: button.url
        .replace(/\{title\}/gi, item.value.title)
        .replace(/\{url\}/gi, url),
    }));

    loading.value = false;
  } catch (err) {
    console.log('🚀 ~ fetchData ~ err:', err);
    router.push({
      name: 'error',
      params: { statusCode: 404, message: 'post_not_found' },
    });
  }
};

onMounted(async () => {
  await fetchData();

  $tools.call('PAGE_VIEW');
  $storeino.fbpx('PageView');
});
</script>

<template>
  <div class="pages-page">
    <!--  -->
    <AppsLoader placement="PAGES_PAGE" />
    <!--  -->

    <!--  -->
    <GlobalNav
      v-if="item"
      :home-name="pagesNav.home.name"
      :current-page-name="item.title"
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
    <div v-if="!loading && item" class="container my-10 md:my-14 lg:my-16">
      <!--  -->
      <div class="flex flex-col gap-10 md:gap-14">
        <!--  -->
        <PagesDetails :item="item" />
        <!--  -->

        <!--  -->
        <div
          v-if="route.params.slug && route.params.slug.indexOf('contact') > -1"
        >
          <!--  -->
          <AppsLoader :placement="'AFTER_CONTACT_PAGE'" />
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <PagesShareButtons :post="post" :social-media="socialMedia" />
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMainStore } from '@/stores/main';

const { $settings, $storeino, $tools }: any = useNuxtApp();
const $store = useMainStore();

const route = useRoute();
const router = useRouter();

const sections = $settings.sections;
const pagesNav = ref(sections.pages);

const blog = ref(sections.blog);
const post = ref(sections.post);
const sidebar = ref(sections.post.sidebar);

const storeName = ref($settings.store_name);
const storeDescription = ref($settings.store_description);

const loading = ref(true);
const item: any = ref(null);

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
    const { data } = await $storeino.pages.get({ slug, type: 'POST' });
    item.value = data;
    loading.value = false;

    $store.seo.title = `${item.value.title} - ${storeName.value}`;
    $store.seo.description = item.value.excerpt || storeDescription.value;
    if (item.value.image) {
      $store.seo.image = item.value.image.url;
    }

    const url = `https://${$store.domain}/posts/${slug}`;
    for (const button of socialMedia.value) {
      button.url = button.url
        .replace(/\{title\}/gi, item.value.title)
        .replace(/\{url\}/gi, url);
    }
  } catch (err) {
    router.push({
      name: 'error',
      params: { statusCode: 404, message: 'post_not_found' },
    });
  }
};

onMounted(async () => {
  $tools.call('PAGE_VIEW');
  $storeino.fbpx('PageView');

  await fetchData();
});
</script>

<template>
  <div class="post-page">
    <!--  -->
    <AppsLoader placement="POST_PAGE" />
    <!--  -->

    <!--  -->
    <GlobalNav
      v-if="item"
      :home-name="pagesNav.home.name"
      :collection="item.categories ? item.categories[0] : null"
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
      <div class="flex flex-col lg:flex-row gap-8">
        <!--  -->
        <div
          v-if="sidebar.active"
          class="w-full lg:w-2/6 flex flex-col gap-6 order-2 lg:order-1"
        >
          <!--  -->
          <PostRelated v-if="post.related.active && item" :item="item" />
          <!--  -->

          <!--  -->
          <PostShareButtons :post="post" :social-media="socialMedia" />
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div
          :class="
            sidebar.active ? 'w-full lg:w-4/6 order-1 lg:order-2' : 'w-full'
          "
        >
          <!--  -->
          <div class="flex flex-col gap-6">
            <!--  -->
            <PostContent :item="item" :blog="blog" />
            <!--  -->

            <!--  -->
            <PostImage :item="item" />
            <!--  -->

            <!--  -->
            <PostDetails :item="item" />
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

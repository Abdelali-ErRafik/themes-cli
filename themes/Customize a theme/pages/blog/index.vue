<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useNuxtApp } from '#app';

const { $settings, $storeino, $tools }: any = useNuxtApp();

const sections = $settings.sections;
const pagesNav = ref(sections.pages);

const blog = ref(sections.blog);
const sidebar = ref(blog.value.sidebar);

const windowWidth = ref(0);
const showSideBar = ref(false);

const loading = ref({
  pages: true,
  products: true,
  categories: true,
});

const query: any = ref({});
const param: any = ref([]);
const products = ref([]);
const items = ref([]);
const categories = ref([]);
const paginate = ref({ page: 1, limit: 12, total: 12 });

const params: any = ref({
  status: 'PUBLISH',
  'categories.slug-in': [],
  sort: { createdAt: -1 },
  type: 'POST',
});

const lastParams = ref({
  status: 'PUBLISH',
  'categories.slug-in': [],
  sort: { createdAt: -1 },
  type: 'POST',
});

watch(
  params,
  (newVal) => {
    if (JSON.stringify(newVal) !== JSON.stringify(lastParams.value)) {
      getItems();
    }
  },
  { deep: true }
);

const getWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const setParams = (e: any, key: any, value: any) => {
  if (key.includes('price')) {
    params.value[key] = e.target.value;
  } else if (e.target.checked) {
    if (!params.value[key]) params.value[key] = [];
    params.value[key].push(value);
  } else {
    params.value[key] = params.value[key].filter((item: any) => item !== value);
  }

  switch (key) {
    case 'categories.slug-in':
      param.value = [...new Set([...param.value, value])];
      break;
    case 'price.salePrice-from':
      query.value['price-from'] = value;
      break;
    case 'price.salePrice-to':
      query.value['price-to'] = value;
      break;
    case 'options.values.value1':
      query.value.colors = value;
      break;
  }
};

const getProducts = async () => {
  products.value = [];
  loading.value.products = true;
  try {
    const { data } = await $storeino.products.search({ limit: 5 });
    products.value = data.results;
  } catch (err) {
    console.log('🚀 ~ getProducts ~ err:', err);
  }
  loading.value.products = false;
};

const getCategories = async () => {
  categories.value = [];
  loading.value.categories = true;
  try {
    const { data } = await $storeino.categories.search({});
    categories.value = data.results;
  } catch (err) {
    console.log('🚀 ~ getCategories ~ err:', err);
  }
  loading.value.categories = false;
};

const getItems = async () => {
  items.value = [];
  loading.value.pages = true;
  try {
    lastParams.value = $tools.copy(params.value);
    const { data } = await $storeino.pages.search(params.value);
    items.value = data.results;
  } catch (err) {
    console.log('🚀 ~ getItems ~ err:', err);
  }
  loading.value.pages = false;
};

onMounted(() => {
  $tools.call('PAGE_VIEW');
  $storeino.fbpx('PageView');
  getWindowWidth();
  window.addEventListener('resize', getWindowWidth);

  getItems();
  getCategories();
  getProducts();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', getWindowWidth);
});
</script>

<template>
  <!--  -->
  <div class="blog-page">
    <!--  -->
    <AppsLoader placement="BLOG_PAGE" />
    <!--  -->

    <!--  -->
    <GlobalNav
      :home-name="pagesNav.home.name"
      :current-page-name="pagesNav.blog.name"
    />
    <!--  -->

    <!--  -->
    <BlogBanner :banner="blog.banner" />
    <!--  -->

    <!--  -->
    <div class="container my-10 md:my-14 lg:my-16">
      <!--  -->
      <div class="flex lg:gap-8">
        <!--  -->
        <div class="w-full lg:w-4/6 flex flex-col gap-4">
          <!--  -->
          <div class="flex items-center justify-between">
            <!--  -->
            <BlogToggle
              :active="sidebar.active"
              :filter-text="sidebar.filter_text"
              @toggle-sidebar="showSideBar = true"
            />
            <!--  --

            <!--  -->
            <BlogArticles
              :sidebar="sidebar"
              :total="paginate?.total"
              :articles-text="blog.content.blogs_text"
            />
            <!--  -->

            <!--  -->
            <BlogSort :sort-labels="blog.sorts" :params="params" />
            <!--  -->
          </div>
          <!--  -->

          <!--  -->
          <div
            v-if="loading.pages"
            class="flex items-center justify-center my-10"
          >
            <!--  -->
            <LoaderGlobal />
            <!--  -->
          </div>
          <!--  -->

          <!--  -->
          <BlogPosts
            :loading="loading.pages"
            :items="items"
            :empty-text="blog.empty_text"
          />
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div v-if="sidebar.active" class="lg:w-2/6">
          <!--  -->
          <transition name="fade">
            <!--  -->
            <div
              v-if="windowWidth < 1024 ? showSideBar : true"
              :class="showSideBar ? 'show' : 'hide'"
              class="fixed inset-0 z-20 hidden w-full h-full overflow-y-auto lg:block lg:static lg:w-auto lg:h-auto lg:inset-auto lg:z-auto scroll-y bg-white"
            >
              <!--  -->
              <div class="flex flex-col w-full">
                <!--  -->
                <BlogNav
                  :filter-text="sidebar.filter_text"
                  @close-sidebar="showSideBar = false"
                />
                <!--  -->

                <!--  -->
                <div
                  v-if="loading.categories && loading.products"
                  class="flex items-center justify-center my-10"
                >
                  <!--  -->
                  <LoaderGlobal />
                  <!--  -->
                </div>
                <!--  -->

                <!--  -->
                <div
                  v-if="!loading.categories && !loading.products"
                  class="flex flex-col gap-4 p-4 lg:p-0"
                >
                  <!--  -->
                  <BlogCategories
                    :sidebar="sidebar"
                    :categories="categories"
                    :set-params="setParams"
                  />
                  <!--  -->

                  <!--  -->
                  <BlogProducts :sidebar="sidebar" :products="products" />
                  <!--  -->
                </div>
                <!--  -->
              </div>
              <!--  -->
            </div>
            <!--  -->
          </transition>
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

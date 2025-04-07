<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useMainStore } from '@/stores/main';

const { $settings, $storeino, $tools } = useNuxtApp();
const $store = useMainStore();
const route = useRoute();

const sections = $settings.sections;

const shop = ref(sections.shop);
const pagesNav = ref(sections.pages);

const sidebar = ref(shop.value.sidebar);

const urlSlugs = ref([]);

const windowWidth = ref(0);
const showSideBar = ref(false);
const isSortVisible = ref(false);
const items = ref([]);
const collections = ref([]);
const brands = ref([]);
const filters = ref(null);

const gridClass = ref('w-1/2 md:w-1/3 lg:w-1/4');

const loading = reactive({
  products: true,
  filters: true,
  collections: true,
  brands: true,
});

const query = reactive({});
const param = ref([]);

const paginate = reactive({
  page: 1,
  limit: shop.value.pagination.limit,
  total: 12,
});

const params = reactive({
  page: 1,
  search: route.query.search,
  limit: shop.value.pagination.limit,
  'collections.slug-in': [],
  sort: { createdAt: -1 },
});

const lastParams = reactive({
  page: 1,
  search: route.query.search,
  limit: shop.value.pagination.limit,
  'collections.slug-in': [],
  sort: { createdAt: -1 },
});

const sorts = [
  {
    field: { 'price.salePrice': 1 },
    name: shop.value.sorts.price_asc,
  },
  {
    field: { 'price.salePrice': -1 },
    name: shop.value.sorts.price_desc,
  },
  {
    field: { 'review.rating': -1 },
    name: shop.value.sorts.rating_desc,
  },
  {
    field: { 'review.rating': 1 },
    name: shop.value.sorts.rating_asc,
  },
  {
    field: { name: 1 },
    name: shop.value.sorts.name_asc,
  },
  {
    field: { name: -1 },
    name: shop.value.sorts.name_desc,
  },
  {
    field: { createdAt: -1 },
    name: shop.value.sorts.newest,
  },
  {
    field: { createdAt: 1 },
    name: shop.value.sorts.oldest,
  },
];

watch(
  () => params,
  (val) => {
    if (JSON.stringify(val) !== JSON.stringify(lastParams)) {
      getItems();
    }
  },
  { deep: true }
);

watch(
  () => route.query.search,
  (val) => {
    params.search = val;
  }
);

const urlSlugsLength = computed(() => urlSlugs.value.length);

const selectedCollection = computed(() => {
  for (const item of collections.value) {
    if (item.slug === urlSlugs.value[0]) {
      return item;
    }

    const matchingChild = item.childrens?.find(
      (child) => child.slug === urlSlugs.value[0]
    );

    if (matchingChild) {
      return matchingChild;
    }
  }
  return null;
});

const currentSortName = computed(() => {
  const currentSort = sorts.find(
    (sort) => JSON.stringify(sort.field) === JSON.stringify(params.sort)
  );
  return currentSort ? currentSort.name : '';
});

const pages = computed(() => {
  const pagesArray = [];
  const currentPage = paginate.current_page;
  const lastPage = paginate.last_page;

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(lastPage, currentPage + 2);

  if (currentPage <= 3) {
    endPage = Math.min(5, lastPage);
  }

  if (currentPage >= lastPage - 2) {
    startPage = Math.max(1, lastPage - 4);
  }

  for (let i = startPage; i <= endPage; i++) {
    pagesArray.push(i);
  }

  return pagesArray;
});

const getWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const showSort = () => {
  if (window.innerWidth < 1024) {
    isSortVisible.value = !isSortVisible.value;
  }
};

const subCollections = () => {
  for (const itm of collections.value) {
    if (itm.childrens && itm.childrens.length > 0) itm.childrens = [];
  }

  for (let i = 0; i < collections.value.length; i++) {
    for (let j = 0; j < collections.value.length; j++) {
      if (
        collections.value[i] &&
        collections.value[i].parent == collections.value[j]._id
      ) {
        const childObject = collections.value[i];
        collections.value[j].childrens.push(childObject);

        for (
          let index = 0;
          index < collections.value[j].childrens.length;
          index++
        ) {
          for (let jr = 0; jr < collections.value.length; jr++) {
            if (
              collections.value[j].childrens.length > 0 &&
              collections.value[j].childrens[index]._id ==
                collections.value[jr].parent
            ) {
              collections.value[j].childrens[index].childrens.push(
                collections.value[jr]
              );
              collections.value.splice(jr, 1);
              jr--;
            }
          }
        }
        collections.value.splice(i, 1);
        i--;
      }
    }
  }
};

const setActive = (id: string, idRet: string) => {
  const element = document.getElementById(id);
  if (element?.classList.contains('active-subcollections')) {
    element.classList.remove('active-subcollections');
  } else {
    element?.classList.add('active-subcollections');
  }

  const icon = document.getElementById(idRet);
  if (icon?.classList.contains('active-svg')) {
    icon.classList.remove('active-svg');
  } else {
    icon?.classList.add('active-svg');
  }
};

const setParams = (e: any, key: string, value: any) => {
  if (key.includes('price') || key.includes('page')) {
    params[key] = e.target.value;
    return false;
  } else if (e.target.checked) {
    if (!params[key]) params[key] = [];
    params[key].push(value);
  } else {
    params[key] = params[key].filter((item: any) => item !== value);
  }

  for (const key in params) {
    switch (key) {
      case 'collections.slug-in':
        param.value = params[key];
        urlSlugs.value = params[key];
        break;
      case 'price.salePrice-from':
        query['price-from'] = params[key];
        break;
      case 'price.salePrice-to':
        query['price-to'] = params[key];
        break;
      case 'options.values.value1':
        query['colors-size'] = params[key];
        break;
      case 'tags-in':
        query.tags = params[key];
        break;
      case 'brand.slug-in':
        query.brands = params[key];
        break;
      case 'page':
        query.page = [params[key]];
        break;
    }
  }

  let url = `/shop/`;
  url += param.value.length > 0 ? [...new Set(param.value)].join(',') : '';

  for (const key in query) {
    url += !url.includes('?') ? '?' : '&';
    if (typeof query[key] === 'object') {
      url += `${key}=${query[key].join(',')}`;
    } else {
      url += `${key}=${query[key]}`;
    }
  }

  window.history.pushState({}, '', url);
};

const getFilters = async () => {
  filters.value = null;
  loading.filters = true;
  try {
    const { data } = await $storeino.products.filters({});
    filters.value = data;
  } catch (err) {
    console.error(err);
  }
  loading.filters = false;
};

const getCollections = async () => {
  collections.value = [];
  loading.collections = true;
  try {
    const { data } = await $storeino.collections.search({
      limit: 1000,
    });
    collections.value = data.results;
  } catch (err) {
    console.error(err);
  }
  loading.collections = false;
};

const getBrands = async () => {
  brands.value = [];
  loading.brands = true;
  try {
    const { data } = await $storeino.brands.search({});
    brands.value = data.results;
  } catch (err) {
    console.error(err);
  }
  loading.brands = false;
};

const getItems = async (page: number | null = null) => {
  if (page != null) {
    setParams({ target: { value: page } }, 'page', page);
  }

  items.value = [];
  loading.products = true;

  try {
    params.search = route.query.search as string;
    params.page = page || paginate.current_page;
    params.limit = shop.value.pagination.limit;
    Object.assign(lastParams, $tools.copy(params));

    const { data } = await $storeino.products.search(params);
    items.value = data.results;
    Object.assign(paginate, data.paginate);
  } catch (err) {
    console.error(err);
  }

  loading.products = false;
};

const currentSlug = () => {
  const slug: any = route.params.slug;
  if (typeof slug !== 'undefined') {
    urlSlugs.value = slug.split(',');
  }
};

onMounted(async () => {
  $store.seo.title = shop.value.title + ' - ' + $settings.store_name;
  $store.seo.description =
    shop.value.description || $settings.store_description;

  if (route.params.slug) {
    param.value = route.params.slug.split(',');
    route.params.slug.split(',').forEach((item) => {
      params['collections.slug-in'].push(item);
    });
  }

  for (const key in route.query) {
    if (!route.query[key]) continue;
    switch (key) {
      case 'price-from':
        params['price.salePrice-from'] = route.query[key];
        break;
      case 'price-to':
        params['price.salePrice-to'] = route.query[key];
        break;
      case 'colors-size':
        params['options.values.value1'] = (route.query[key] as string).split(
          ','
        );
        break;
      case 'tags':
        params['tags-in'] = (route.query[key] as string).split(',');
        break;
      case 'brands':
        params['brand.slug-in'] = (route.query[key] as string).split(',');
        break;
      case 'page':
        params.page = route.query[key];
        break;
    }
  }

  Object.assign(lastParams, params);
  await getFilters();
  await getItems();
  await getCollections();
  await getBrands();
  subCollections();

  $tools.call('PAGE_VIEW');
  $storeino.fbpx('PageView');

  getWindowWidth();
  window.addEventListener('resize', getWindowWidth);

  currentSlug();
});

onUnmounted(() => {
  window.removeEventListener('resize', getWindowWidth);
});
</script>

<template>
  <div>
    <!--  -->
    <AppsLoader placement="SHOP_PAGE" />
    <!--  -->

    <!--  -->
    <GlobalNav
      :home-name="pagesNav.home.name"
      :current-page-name="pagesNav.shop.name"
    />
    <!--  -->

    <!--  -->
    <div class="relative">
      <!--  -->
      <transition name="fade">
        <!--  -->
        <ShopBanner
          v-if="urlSlugsLength === 1"
          type="collection"
          :banner="selectedCollection"
          class="absolute top-0 left-0 w-full h-full z-10"
        />
        <!--  -->

        <!--  -->
        <ShopBanner
          v-else
          type="default"
          :banner="shop.banner"
          class="absolute top-0 left-0 w-full h-full z-10"
        />
        <!--  -->
      </transition>
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <div class="container my-10 md:my-14 lg:my-16">
      <!--  -->
      <AppsLoader placement="BEFORE_SHOP_SIDEBAR" />
      <!--  -->

      <div class="flex lg:gap-4">
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
                <ShopNav
                  :filter-text="sidebar.filter_text"
                  @close-sidebar="showSideBar = false"
                />
                <!--  -->

                <!--  -->
                <div
                  v-if="
                    loading.filters && loading.filters && loading.collections
                  "
                  class="flex items-center justify-center my-10"
                >
                  <!--  -->
                  <LoaderGlobal />
                  <!--  -->
                </div>
                <!--  -->

                <!--  -->
                <div
                  v-if="
                    !loading.filters && !loading.filters && !loading.collections
                  "
                  class="flex flex-col gap-4 p-4 lg:p-0"
                >
                  <!--  -->
                  <ShopCollectionsFilter
                    :sidebar="sidebar"
                    :collections="collections"
                    :params="params"
                    :set-params="setParams"
                  />
                  <!--  -->

                  <!--  -->
                  <ShopPriceFilter
                    :sidebar="sidebar"
                    :filters="filters"
                    :set-params="setParams"
                  />
                  <!--  -->

                  <!--  -->
                  <ShopSizesFilter
                    :sidebar="sidebar"
                    :filters="filters"
                    :params="params"
                    :set-params="setParams"
                  />
                  <!--  -->

                  <!--  -->
                  <ShopColorsFilter
                    :sidebar="sidebar"
                    :filters="filters"
                    :params="params"
                    :set-params="setParams"
                  />
                  <!--  -->

                  <!--  -->
                  <ShopTagsFilter
                    :sidebar="sidebar"
                    :filters="filters"
                    :params="params"
                    :set-params="setParams"
                  />
                  <!--  -->

                  <!--  -->
                  <ShopBrandsFilter
                    :sidebar="sidebar"
                    :brands="brands"
                    :params="params"
                    :set-params="setParams"
                  />
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

        <!--  -->
        <div class="w-full lg:w-4/6">
          <!--  -->
          <div class="h-12 lg:h-14 flex items-center justify-between">
            <!--  -->
            <ShopSidebarToggle
              :active="sidebar.active"
              :filter-text="sidebar.filter_text"
              @toggle-sidebar="showSideBar = true"
            />
            <!--  -->

            <!--  -->
            <ShopGridView v-model="gridClass" />
            <!--  -->

            <!--  -->
            <ShopArticles
              :sidebar="sidebar"
              :total="paginate?.total"
              :articles-text="shop.content.articles_text"
            />
            <!--  -->

            <!--  -->
            <ShopSort :sort-labels="shop.sorts" :params="params" />
            <!--  -->
          </div>
          <!--  -->

          <!--  -->
          <div
            v-if="loading.products"
            class="flex items-center justify-center my-10"
          >
            <!--  -->
            <LoaderGlobal />
            <!--  -->
          </div>
          <!--  -->

          <!--  -->
          <ShopProducts
            :loading="loading.products"
            :items="items"
            :grid-class="gridClass"
            :empty-text="shop.empty_text"
          />
          <!--  -->

          <!--  -->
          <ShopPagination
            :pagination="shop.pagination"
            :paginate="paginate"
            :get-items="getItems"
          />
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

<style>
.hover:bg-third:hover > div {
  background-color: var(--third-color);
}

input[type='checkbox']:checked + div {
  transition: all 0.3s ease-in-out;
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  span {
    display: block;
  }
}

input[type='checkbox']:checked + div + label,
input[type='radio']:checked + label {
  transition: all 0.3s ease-in-out;
  color: var(--secondary-text);
  font-weight: 600;
}

[dir='rtl'] .sort-direction {
  left: 0px;
  right: auto;
}

.active-subcollections {
  max-height: 500px;
}

.svg-display.active-svg {
  > .plus {
    display: none;
  }
  > .minus {
    display: block;
  }
}

@media (max-width: 1024px) {
  .show {
    display: block !important;
  }
}
</style>

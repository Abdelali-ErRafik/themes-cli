<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMainStore } from '@/stores/main';

const { $settings, $storeino, $tools }: any = useNuxtApp();
const $store = useMainStore();
const route = useRoute();
const router = useRouter();

const product = $settings.sections.product;
const products = $settings.sections.products;
const alerts = $settings.sections.alerts;
const checkoutFields = $settings.checkout_required_fields;

const reviewsInActiveColor = ref(products.reviews.inactive_color);
const reviewsActiveColor = ref(products.reviews.active_color);

const inStockColor = ref(products.stock.in_stock_color);
const outOfStockColor = ref(products.stock.out_of_stock_color);

const visibleSlide = ref(0);
const showImageSlider = ref(false);

const loading = ref(true);
const item: any = ref(null);
const image = ref(null);
const price = ref({ salePrice: 0, comparePrice: 0 });
const outOfStock = ref(false);
const showVarianteModal = ref(false);

const quantity: any = ref({});
const selectedVariant: any = ref(null);

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

const stockText = computed(() =>
  outOfStock.value
    ? products.stock.out_of_stock_text
    : products.stock.in_stock_ext
);

const stockColor = computed(() =>
  outOfStock.value ? outOfStockColor.value : inStockColor.value
);
const isInWishlist = computed(() =>
  $store.wishlist.some((item) => item._id === item._id)
);

const hasUpsell = computed(
  () =>
    item.value &&
    item.value.upsell &&
    item.value.upsell.products &&
    item.value.upsell.products.length > 0 &&
    product.upsell.active
);

const hasRelated = computed(() => item.value && product.related.active);

const fetchData = async () => {
  const { slug } = route.params;

  try {
    const { data } = await $storeino.products.get({ slug });
    item.value = data;
    $store.seo.title =
      (item.value.seo.title || item.value.name) + ' - ' + $settings.store_name;
    $store.seo.description =
      item.value.seo.description ||
      item.value.description ||
      $settings.store_description;
    $store.seo.keywords =
      item.value.seo.keywords.length > 0
        ? item.value.seo.keywords
        : $settings.store_keywords || [];
    if (item.value.images.length > 0) {
      $store.seo.image = item.value.images[0].src;
    }

    [
      {
        hid: 'product:price:amount',
        property: 'product:price:amount',
        content: price.value.salePrice,
      },
      {
        hid: 'productID',
        itemprop: 'productID',
        content: item.value ? item.value._id : 'productID',
      },
    ].forEach((meta: any) => {
      const index = $store.seo.metaTags.findIndex((m) => m.hid === meta.hid);
      if (index > -1) {
        $store.seo.metaTags.splice(index, 1, meta);
      }
      $store.seo.metaTags.push(meta);
    });

    loading.value = false;
    quantity.value = item.value.quantity;

    if (item.value.images.length > 0) {
      setImage(0);
    }

    if (item.value.type === 'variable' && item.value.variants.length > 0) {
      variantSelected(item.value.variants[0]);
    }

    if (item.value.type === 'simple') {
      if (!item.value.outStock.disabled && item.value.quantity.instock <= 0) {
        outOfStock.value = true;
      }
    }

    quantitySelected(quantity.value.default);

    const url = `https://${$store.domain}/posts/${slug}`;
    socialMedia.value.forEach((button) => {
      button.url = button.url
        .replace(/\{title\}/gi, item.value.name)
        .replace(/\{url\}/gi, url);
    });

    if (!import.meta.server) {
      $storeino.fbpx('PageView');
      $storeino.fbpx('ViewContent', {
        content_name: item.value.name || '',
        content_ids: [item.value._id],
        content_type: 'product',
        value: item.value.price.salePrice,
        currency: $store.currency.code,
      });
      $tools.call('PAGE_VIEW', item.value);
    }
  } catch (err) {
    console.error(err);
    router.push({ name: '404', params: { message: 'product_not_found' } });
  }
};

onMounted(fetchData);

const setImage = (index: number) => {
  visibleSlide.value = index;
  image.value = $tools.copy(item.value.images[index]);
};

const variantSelected = (variant: any) => {
  selectedVariant.value = variant;

  if (variant.imageId && item.value.images.length > 0) {
    let index = item.value.images.findIndex(
      (i: any) => i._id === variant.imageId
    );

    if (index === -1) index = 0;

    image.value = item.value.images[index];
  } else if (item.value.images.length > 0) {
    image.value = item.value.images[0];
  }

  outOfStock.value =
    !item.value.outStock.disabled &&
    selectedVariant.value.quantity.instock <= 0;

  quantitySelected(item.value.quantity.value);
};

const quantitySelected = (quantity: any) => {
  item.value.quantity.value = quantity;

  if (selectedVariant.value) {
    price.value.salePrice = selectedVariant.value.price.salePrice * quantity;
    price.value.comparePrice =
      selectedVariant.value.price.comparePrice * quantity;
  } else {
    price.value.salePrice = item.value.price.salePrice * quantity;
    price.value.comparePrice = item.value.price.comparePrice * quantity;
  }

  if (!import.meta.server) {
    window.dispatchEvent(
      new CustomEvent('CURRENT_PRODUCT', {
        detail: {
          product_id: item.value._id,
          product_quantity: quantity,
          product_variant: selectedVariant.value
            ? selectedVariant.value._id
            : undefined,
          product_currency: $store.currency.code,
          product_price: price.value,
        },
      })
    );
  }
};

const addToCart = () => {
  $tools.call('ADD_TO_CART', {
    _id: item.value._id,
    quantity: quantity.value,
    price: selectedVariant.value
      ? selectedVariant.value.price.salePrice
      : item.value.price.salePrice,
    variant: selectedVariant.value ? { _id: selectedVariant.value._id } : null,
  });

  $storeino.fbpx('AddToCart', {
    content_name: item.value.name,
    content_ids: [item.value._id],
    content_type: 'product',
    value: selectedVariant.value
      ? selectedVariant.value.price.salePrice
      : item.value.price.salePrice,
    currency:
      $store.currency && $store.currency.code ? $store.currency.code : 'USD',
  });

  if (products.add_to_cart.to_checkout) {
    setTimeout(() => {
      window.location.href = '/checkout2';
    }, 500);
  }

  $tools.toast(alerts.cart.added_text);
};

const buyNow = () => {
  if (
    checkoutFields.show_variante_reminder &&
    item.value.type === 'variable' &&
    !showVarianteModal.value
  ) {
    showVarianteModal.value = true;
    return;
  }

  addToCart();
  setTimeout(() => {
    window.location.href = '/checkout2';
  }, 500);
};

const toggleWishlist = () => {
  if (isInWishlist.value) {
    removeFromWishlist();
  } else {
    addToWishlist();
  }
};

const addToWishlist = () => {
  $tools.call('ADD_TO_WISHLIST', item.value);
  $tools.toast(alerts.wishlist.added_text);
};

const removeFromWishlist = () => {
  $tools.call('REMOVE_FROM_WISHLIST', item.value);
  $tools.toast(alerts.wishlist.removed_text);
};
</script>

<template>
  <!--  -->
  <div class="product-page">
    <!--  -->
    <div
      v-if="loading"
      class="container flex justify-center items-center py-10"
    >
      <LoaderGlobal />
    </div>
    <!--  -->

    <!--  -->
    <div v-if="!loading && item">
      <!--  -->
      <meta itemprop="productID" :content="item._id" />
      <!--  -->

      <!--  -->
      <ProductImagesSlider
        v-model:show-image-slider="showImageSlider"
        :images="item.images"
        :visible-slide="visibleSlide"
        @update:visible-slide="setImage"
      />
      <!--  -->

      <!--  -->
      <GlobalNav
        :home-name="$settings.sections.pages.home.name"
        :collection="item.collections ? item.collections[0] : null"
        :current-page-name="item.name"
      />
      <!--  -->

      <!--  -->
      <div
        class="container flex flex-col gap-8 md:gap-10 lg:gap-12 my-8 md:my-10 lg:my-12"
      >
        <!--  -->
        <div
          class="flex flex-col lg:flex-row gap-8 md:gap-4 border border-third p-4 rounded-lg"
        >
          <!--  -->
          <div class="w-full lg:w-3/4 flex-col md:flex-row flex gap-6 md:gap-4">
            <!--  -->
            <div class="w-full md:w-1/2 lg:w-[45%]">
              <!--  -->
              <ProductImageGallery
                v-model:current-index="visibleSlide"
                :images="item.images"
                :product-name="item.name"
                @click-main-image="showImageSlider = true"
              />
              <!--  -->
            </div>
            <!--  -->

            <!--  -->
            <div class="w-full md:w-1/2 lg:w-[55%] flex flex-col">
              <!--  -->
              <ProductDetails
                :item="item"
                :product="product"
                :products="products"
                :is-in-wishlist="isInWishlist"
                :social-media="socialMedia"
                :reviews-active-color="reviewsActiveColor"
                :reviews-in-active-color="reviewsInActiveColor"
                @toggle-wishlist="toggleWishlist"
              />
              <!--  -->
            </div>
            <!--  -->
          </div>
          <!--  -->

          <!--  -->
          <div class="w-full lg:w-1/4 h-fit lg:sticky lg:top-0">
            <!--  -->
            <ProductActions
              :price="price"
              :products="products"
              :item="item"
              :product="product"
              :stock-color="stockColor"
              :stock-text="stockText"
              :out-of-stock="outOfStock"
              :quantity="quantity"
              @variant-selected="variantSelected"
              @quantity-selected="quantitySelected"
              @add-to-cart="addToCart"
              @buy-now="buyNow"
            />
            <!--  -->
          </div>
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div class="border border-third rounded-lg">
          <!--  -->
          <AppsLoader placement="BEFORE_DESCRIPTION" />
          <!--  -->

          <!--  -->
          <ProductContent :loading="loading" :item="item" :product="product" />
          <!--  -->

          <!--  -->
          <AppsLoader placement="AFTER_DESCRIPTION" />
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div v-if="hasUpsell">
          <!--  -->
          <ProductUpsell :item="item.upsell" :title="product.upsell.title" />
        </div>
        <!--  -->

        <!--  -->
        <div v-if="hasRelated">
          <!--  -->
          <ProductRelated :item="item" />
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
table,
td,
th {
  border: 1px solid;
  border-collapse: collapse;
}

.video-wrapper {
  position: relative;
  height: 0;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
.lg-description table td,
th {
  border: 1px solid #dddddd;
}

.description pre {
  white-space: normal !important;
}

.description p {
  display: block !important;
}
</style>

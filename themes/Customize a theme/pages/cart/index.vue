<script setup lang="ts">
// import * as Sentry from '@sentry/nuxt';

import { reactive, onMounted, watch } from 'vue';
import { useMainStore } from '@/stores/main';

const { $settings, $storeino, $tools }: any = useNuxtApp();
const $store = useMainStore();

const sections = $settings.sections;
const pagesNav = ref(sections.pages);

const cart = ref(sections.cart);

const buttons = ref(cart.value.buttons);
const texts = ref(cart.value.texts);

const upsell = ref(cart.value.upsell);

const features = ref(cart.value.features);

const cartItems: any = $store.cart || [];

const state = reactive({
  loading: { cart: true, upsells: true },
  items: [] as any[],
  total: 0,
  upsells: [] as any[],
});

const calcTotal = () => {
  state.total = state.items.reduce(
    (total, item) => total + item.price * item.quantity.value,
    0
  );
};

const initCart = async () => {
  state.items = [];
  // Filter out any items that don't have a valid _id
  const validCartItems = cartItems.filter((item: any) => item && item._id);
  const ids = validCartItems.map((item: any) => item._id);

  state.loading.cart = true;

  if (ids.length > 0) {
    try {
      const response = await $storeino.products.search({
        '_id-in': ids,
        limit: 1000,
      });

      const products = response.data.results;

      // Only process items that exist in both cartItems and products
      for (const item of validCartItems) {
        const product = products.find((p: any) => p._id === item._id);
        if (!product) {
          console.warn(`Product not found for ID: ${item._id}`);
          continue;
        }

        const cartItem: any = {
          _id: product._id,
          slug: product.slug,
          name: product.name,
          price: product.price.salePrice,
          quantity: JSON.parse(JSON.stringify(product.quantity)),
          image: product.images.length > 0 ? product.images[0].src : '',
          total: 0, // Initialize total
        };

        // Set quantity from cart item
        cartItem.quantity.value = item.quantity;

        // Handle variant if it exists
        if (item.variant && item.variant._id) {
          const variant = product.variants.find(
            (variant: any) => variant._id === item.variant._id
          );
          if (variant) {
            cartItem.variant = variant;
            cartItem.price = variant.price.salePrice;
          }
        }

        // Handle upsell if it exists
        if (item.upsell) {
          cartItem.upsell = item.upsell;
          const discount =
            cartItem.upsell.type === 'percentage'
              ? cartItem.price * (cartItem.upsell.value / 100)
              : cartItem.upsell.value;
          cartItem.price -= discount;
        }

        // Calculate total after all price modifications
        cartItem.total = cartItem.price * cartItem.quantity.value;
        state.items.push(cartItem);
      }

      calcTotal();
    } catch (err) {
      console.error('Error initializing cart:', err);
      // Sentry.captureException(err);
    }
  }

  state.loading.cart = false;
};

const getUpsells = async () => {
  const ids = cartItems.map((item: any) => item._id);
  state.loading.upsells = true;

  if (ids.length > 0) {
    try {
      const response = await $storeino.upsells.search({
        with: ['products'],
        'product._id-in': ids,
        limit: 1000,
      });
      state.upsells = response.data.results;
    } catch (err) {
      console.log('🚀 ~ getUpsells ~ err:', err);
    }
  }

  state.loading.upsells = false;
};

const removeAllFromCart = () => {
  state.items.forEach((item) => {
    $tools.call('REMOVE_FROM_CART', item);
  });

  $tools.toast(sections.alerts.cart.removed_text);
};

const remove = async (item: any) => {
  $tools.call('REMOVE_FROM_CART', item);
  $tools.toast(sections.alerts.cart.removed_text);
};

const setupSeo = () => {
  $store.seo.title = `${$settings.sections.cart.title} - ${$settings.store_name}`;
  $store.seo.description =
    $settings.sections.cart.description || $settings.store_description;
};

watch(
  () => cartItems.length,
  async () => {
    await initCart();
    await getUpsells();
  }
);

watch(
  () => state.items,
  () => calcTotal(),
  { deep: true }
);

onMounted(async () => {
  setupSeo();

  await initCart();
  if (state.items.length > 0) {
    await getUpsells();
  }

  $tools.call('PAGE_VIEW');
  $storeino.fbpx('PageView');
});
</script>

<template>
  <!-- -->
  <div class="cart-page">
    <!-- -->
    <AppsLoader placement="CART_PAGE" />
    <!-- -->

    <!--  -->
    <GlobalNav
      :home-name="pagesNav.home.name"
      :current-page-name="texts.navbar_text"
    />
    <!--  -->

    <!-- -->
    <div
      v-if="state.loading.cart"
      class="flex items-center justify-center my-10"
    >
      <!-- -->
      <LoaderGlobal />
      <!-- -->
    </div>
    <!-- -->

    <!-- -->
    <div
      v-if="!state.loading.cart && state.items.length == 0"
      class="flex justify-center my-20"
    >
      <!-- -->
      <CartEmpty :texts="texts" :buttons="buttons" />
      <!-- -->
    </div>
    <!--  -->

    <!--  -->
    <div
      v-if="!state.loading.cart && state.items.length > 0"
      class="container my-10 md:my-14 lg:my-16"
    >
      <!--  -->
      <div class="flex flex-col lg:flex-row gap-4 lg:gap-8">
        <!--  -->
        <div class="w-full lg:w-3/4 flex flex-col gap-4">
          <!--  -->
          <div class="flex flex-col gap-5 bg-third rounded-lg p-4">
            <!--  -->
            <CartNav
              :cart-title="texts.cart_title"
              :items-length="state.items.length"
              :product-text="texts.product_text"
            />

            <!--  -->
            <CartItem
              v-for="(item, i) in state.items"
              :key="i"
              :item="item"
              @remove="remove"
            />
            <!--  -->
          </div>
          <!--  -->

          <!--  -->
          <div class="flex items-center justify-center lg:justify-end">
            <!--  -->
            <CartRemoveAll
              :text="texts.remove_all_text"
              :remove-all="removeAllFromCart"
            />
            <!--  -->
          </div>
          <!--  -->
        </div>
        <!--  -->

        <div
          v-if="!state.loading.cart && state.items.length > 0"
          class="w-full flex flex-col gap-4 lg:w-1/3 h-fit"
        >
          <!--  -->
          <CartTotals
            :items="state.items"
            :total="state.total"
            :buttons="buttons"
            :texts="texts"
            :currency="$store.currency"
          />
          <!--  -->

          <!--  -->
          <CartFeatures :features="features"></CartFeatures>
          <!--  -->

          <!--  -->
          <CartButtons :buttons="buttons" />
          <!--  -->
        </div>
        <!--  -->
      </div>
      <!--  -->

      <!--  -->
      <div v-if="upsell.active" class="mt-8 md:mt-12 lg:mt-16">
        <!--  -->
        <div
          v-if="state.loading.upsells"
          class="flex items-center justify-center my-10"
        >
          <!--  -->
          <LoaderGlobal />
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <ProductUpsell
          v-for="(upsell, index) in state.upsells"
          v-if="!state?.loading?.upsells && state?.upsells?.length > 0"
          :key="upsell.id || index"
          :item="upsell"
          :title="cart.upsell.title"
        />
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

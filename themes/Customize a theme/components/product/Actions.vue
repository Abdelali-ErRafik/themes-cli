<script setup lang="ts">
import { useMainStore } from '@/stores/main';

const $store = useMainStore();

const props: any = defineProps({
  price: {
    type: Object,
    required: true,
  },
  products: {
    type: Object,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
  product: {
    type: Object,
    required: true,
  },
  stockColor: {
    type: String,
    required: true,
  },
  stockText: {
    type: String,
    required: true,
  },
  outOfStock: {
    type: Boolean,
    default: false,
  },
  quantity: {
    type: [Number, String],
    default: 1,
  },
});

const emit = defineEmits([
  'variant-selected',
  'quantity-selected',
  'add-to-cart',
  'buy-now',
]);

const variantSelected = (variant: any) => {
  emit('variant-selected', variant);
};

const quantitySelected = (qty: any) => {
  emit('quantity-selected', qty);
};

const addToCart = () => {
  emit('add-to-cart');
};

const buyNow = () => {
  emit('buy-now');
};

const isBuyNowVisible = computed(
  () =>
    props.product.buy_now.active &&
    !$store.apps.find((a: any) => a.placement?.indexOf('REPLACE_BUYNOW') >= 0)
);
</script>

<template>
  <!--  -->
  <div
    class="flex flex-col gap-4 items-center justify-center border border-third rounded-lg py-4 px-8"
  >
    <!--  -->
    <ProductPrice
      page="product"
      :type="'simple'"
      :price="props.price"
      :variants="[]"
      price-style="text-3xl font-bold"
      currency-style="text-xs font-bold leading-3"
      sub-price-style="text-base font-light"
    />
    <!--  -->

    <!--  -->
    <div
      v-if="props.products.stock.active"
      class="h-5 flex items-center justify-center text-white rounded-sm"
      :style="{ backgroundColor: props.stockColor }"
    >
      <!--  -->
      <span class="px-2 text-xs font-normal">{{ props.stockText }}</span>
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <ProductVariants
      v-if="props.item.type == 'variable'"
      class="flex text-xs"
      :options="props.item.options"
      :images="props.item.images"
      :variants="props.item.variants"
      @selected="variantSelected"
    />
    <!--  -->

    <!--  -->
    <ProductQuantity
      v-if="props.product.quantity.active && !props.outOfStock"
      class="w-full"
      :quantity="props.quantity"
      @selected="quantitySelected"
    />
    <!--  -->

    <!--  -->
    <div v-if="!props.outOfStock" class="w-full add-cart">
      <!--  -->
      <AppsLoader placement="BEFORE_ADD_TO_CART" />
      <!--  -->

      <!--  -->
      <GlobalButton
        variant="secondary"
        :text="props.product.add_to_cart.text"
        :is-visible="props.product.add_to_cart.active"
        @click="addToCart"
      />
      <!--  -->

      <!--  -->
      <AppsLoader placement="AFTER_ADD_TO_CART" />
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <div v-if="!props.outOfStock" class="w-full buy-now">
      <!--  -->
      <AppsLoader placement="BEFORE_BUYNOW" />
      <!--  -->

      <!--  -->
      <AppsLoader v-show="!props.outOfStock" placement="REPLACE_BUYNOW" />
      <!--  -->

      <!--  -->
      <GlobalButton
        variant="primary"
        icon="solar:cart-large-2-linear"
        :text="props.product.buy_now.text"
        :is-visible="isBuyNowVisible"
        @click="buyNow"
      />
      <!--  -->

      <!--  -->
      <AppsLoader placement="AFTER_BUYNOW" />
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

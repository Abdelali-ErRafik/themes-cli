<script setup lang="ts">
import { computed } from 'vue';

import { useMainStore } from '@/stores/main';
const $store = useMainStore();

const props: any = defineProps({
  page: String,
  type: String,
  price: Object,
  originalPrice: { type: Object, default: null },
  variants: { type: Array, default: () => [] },
  priceStyle: String,
  subPriceStyle: String,
  currencyStyle: String,
});

const currency = $store.currency;

const minPrice: any = computed(() =>
  props.type === 'variable'
    ? Math.min(...props.variants.map((va: any) => va.price.salePrice))
    : 0
);

const maxPrice: any = computed(() =>
  props.type === 'variable'
    ? Math.max(...props.variants.map((va: any) => va.price.salePrice))
    : 0
);

// Computed function
const formatPrice = computed(
  () =>
    (price: number, pad: number = 0) =>
      price.toFixed(pad)
);

const decimalPrice = computed(
  () => (price: any) => ((price % 1) * 100).toFixed(0).padStart(2, '0')
);
</script>

<template>
  <!--  -->
  <span
    v-if="type == 'simple'"
    class="flex flex-col"
    :class="{ 'items-center': props.page == 'product' }"
  >
    <!--  -->
    <meta itemprop="priceCurrency" :content="currency.code" />
    <!--  -->

    <!--  -->
    <meta itemprop="price" :content="props.price.salePrice" />
    <!--  -->

    <!--  -->
    <div class="flex items-center text-secondary gap-0.5">
      <!--  -->
      <span :class="props.priceStyle">{{
        formatPrice(props.price.salePrice)
      }}</span>
      <!--  -->

      <!--  -->
      <div class="flex flex-col justify-center" :class="props.currencyStyle">
        <!--  -->
        <span>{{ decimalPrice(props.price.salePrice) }}</span>
        <!--  -->

        <!--  -->
        <span>{{ currency.symbol }}</span>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <del
      v-if="props.price.comparePrice > 0"
      class="flex gap-0.5 font-medium text-third"
      :class="props.subPriceStyle"
    >
      <!--  -->
      <span>{{ formatPrice(props.price.comparePrice, 2) }}</span>
      <!--  -->

      <!--  -->
      <span>{{ currency.symbol }}</span>
      <!--  -->
    </del>
    <!--  -->
  </span>
  <!--  -->

  <!--  -->
  <span v-else-if="minPrice != maxPrice" class="flex items-center gap-1">
    <!--  -->
    <meta itemprop="priceCurrency" :content="currency.code" />
    <!--  -->

    <!--  -->
    <meta itemprop="price" :content="minPrice" />
    <!--  -->

    <!--  -->
    <div class="flex items-center text-secondary gap-0.5">
      <!--  -->
      <span :class="props.priceStyle">{{ formatPrice(minPrice) }}</span>
      <!--  -->

      <!--  -->
      <div
        class="flex flex-col justify-center leading-3"
        :class="props.currencyStyle"
      >
        <!--  -->
        <span>{{ decimalPrice(minPrice) }}</span>
        <!--  -->

        <!--  -->
        <span>{{ currency.symbol }}</span>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <span
      class="flex items-center justify-center text-secondary"
      :class="props.priceStyle"
    >
      ~
    </span>
    <!--  -->

    <!--  -->
    <div class="flex items-center text-secondary gap-0.5">
      <!--  -->
      <span :class="props.priceStyle">{{ formatPrice(maxPrice) }}</span>
      <!--  -->

      <!--  -->
      <div
        class="flex flex-col justify-center leading-3"
        :class="props.currencyStyle"
      >
        <!--  -->
        <span>{{ decimalPrice(maxPrice) }}</span>
        <!--  -->

        <!--  -->
        <span>{{ currency.symbol }}</span>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->
  </span>
  <!--  -->

  <!--  -->
  <span
    v-else-if="variants.length > 0"
    class="flex flex-col"
    :class="{ 'items-center': props.page == 'product' }"
  >
    <!--  -->
    <meta itemprop="priceCurrency" :content="currency.code" />
    <!--  -->

    <!--  -->
    <meta itemprop="price" :content="props.variants[0].price.salePrice" />
    <!--  -->

    <!--  -->
    <div class="flex items-center text-secondary gap-0.5">
      <!--  -->
      <span :class="props.priceStyle">{{
        formatPrice(props.variants[0].price.salePrice)
      }}</span>
      <!--  -->

      <!--  -->
      <div class="flex flex-col justify-center" :class="props.currencyStyle">
        <!--  -->
        <span>{{ decimalPrice(props.variants[0].price.salePrice) }}</span>
        <!--  -->

        <!--  -->
        <span>{{ currency.symbol }}</span>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <del
      v-if="props.variants[0].price.comparePrice > 0"
      class="flex gap-0.5 font-medium text-third"
      :class="props.subPriceStyle"
    >
      <!--  -->
      <span>{{ formatPrice(props.variants[0].price.comparePrice, 2) }}</span>
      <!--  -->

      <!--  -->
      <span>{{ currency.symbol }}</span>
      <!--  -->
    </del>
    <!--  -->
  </span>
  <!--  -->
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useMainStore } from '@/stores/main';

const { $tools }: any = useNuxtApp();
const $store = useMainStore();

const props = defineProps({
  item: { type: Object, required: true },
  quantity: { type: Number, default: 1 },
});

const emit = defineEmits(['remove']);

const formattedPrice = computed(() => {
  return (price: any) =>
    price % 1 !== 0 ? price.toFixed(2) : price.toString();
});

const quantitySelected = (quantity: any) => {
  props.item.quantity.value = quantity;
  props.item.total = props.item.price * quantity;

  let cartItem = null;
  if (props.item.variant) {
    cartItem = $store.cart.find(
      (i: any) =>
        i._id === props.item._id &&
        props.item.value &&
        i.variant._id === props.item.variant._id
    );
  } else {
    cartItem = $store.cart.find(
      (i) => i._id === props.item._id && props.item.value && !i.variant
    );
  }

  $tools.call('ADD_TO_CART', { ...cartItem, quantity });
};

watch(
  () => props.quantity,
  (newQuantity) => {
    quantitySelected(newQuantity);
  },
  { immediate: true }
);

const remove = () => {
  emit('remove', props.item);
};
</script>

<template>
  <!--  -->
  <div
    class="relative flex flex-col md:flex-row items-center justify-between gap-1 md:gap-2 lg:gap-4 rounded-lg border border-third bg-white p-4 md:p-6"
  >
    <!--  -->
    <div class="w-full md:w-2/3 flex items-center gap-2">
      <!--  -->
      <NuxtLink
        :to="`/products/${props.item.slug}`"
        :title="props.item.name"
        :aria-label="props.item.name"
      >
        <!--  -->
        <ImageLoader
          img-class="w-2/6"
          :src="props.item.image"
          :alt="props.item.name"
        />
        <!--  -->
      </NuxtLink>
      <!--  -->

      <!--  -->
      <div class="w-4/6 flex flex-col gap-2">
        <!--  -->
        <NuxtLink
          :to="`/products/${props.item.slug}`"
          class="text-sm font-medium"
        >
          {{ props.item.name }}
        </NuxtLink>
        <!--  -->

        <!--  -->
        <NuxtLink
          v-if="props.item.variant"
          :to="`/products/${props.item.slug}`"
          class="text-xs text-third font-medium"
        >
          <!--  -->
          {{ props.item.variant.name }}
          <!--  -->
        </NuxtLink>
        <!--  -->

        <!--  -->
        <div
          v-if="props.item.upsell"
          class="w-fit h-5 flex items-center justify-center px-2 rounded-sm bg-primary text-white"
        >
          <!--  -->
          <span class="text-xs font-normal"
            >-{{
              `${props.item.upsell.value} ${
                props.item.upsell.type == 'percentage'
                  ? '%'
                  : $store.currency.symbol
              }`
            }}</span
          >
          <!--  -->
        </div>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <div
      class="w-full md:w-1/3 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2"
    >
      <!--  -->
      <div
        class="absolute top-2 right-2 md:top-auto md:right-auto md:static flex items-center justify-center cursor-pointer text-red-600 hover:opacity-90 hover:text-red-800 hover:scale-105 transition-all duration-300"
        @click="remove"
      >
        <!--  -->
        <Icon name="solar:trash-bin-trash-linear" class="text-2xl translate" />
        <!--  -->
      </div>
      <!--  -->

      <!--  -->
      <ProductQuantity
        :quantity="props.item.quantity"
        @selected="quantitySelected"
      />
      <!--  -->

      <!--  -->
      <div class="flex flex-col items-end justify-center">
        <!--  -->
        <span class="text-base font-bold text-secondary">
          {{ `${formattedPrice(props.item.total)} ${$store.currency.symbol}` }}
        </span>
        <!--  -->

        <!--  -->
        <span class="text-sm font-medium">
          {{ `${formattedPrice(props.item.price)} ${$store.currency.symbol}` }}
        </span>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

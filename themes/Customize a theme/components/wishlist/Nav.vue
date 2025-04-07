<script setup lang="ts">
import { toRefs } from 'vue';
import { useNuxtApp } from '#app';

const props = defineProps({
  texts: {
    type: Object,
    required: true,
  },
  buttons: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

const { texts, buttons, items } = toRefs(props);
const { $settings, $tools }: any = useNuxtApp();

const alerts = ref($settings.sections.alerts);

const addAllToCart = () => {
  items.value.forEach((item) => {
    $tools.call('ADD_TO_CART', item);
  });

  $tools.toast(alerts.value.cart.added_text);
};
</script>

<template>
  <!--  -->
  <div
    class="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between px-2"
  >
    <!--  -->
    <span class="text-xl font-bold text-primary">
      {{ texts.title_text }}
    </span>
    <!--  -->

    <!--  -->
    <div
      v-if="buttons.show_cart"
      class="w-fit h-10 flex items-center justify-center px-8 cursor-pointer rounded-full border border-secondary bg-secondary text-white hover:bg-transparent hover:text-secondary click-effect"
      @click="addAllToCart()"
    >
      <!--  -->
      <span class="text-sm font-medium">
        {{ buttons.cart_text }}
      </span>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

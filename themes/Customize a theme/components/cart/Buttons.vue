<script setup lang="ts">
const props: any = defineProps({
  buttons: Object,
});
</script>

<template>
  <!--  -->
  <div class="flex flex-col gap-4">
    <!--  -->
    <a
      href="/checkout2"
      class="w-full h-10 flex items-center justify-center cursor-pointer rounded-full border border-secondary bg-secondary text-white hover:bg-transparent hover:text-secondary click-effect"
    >
      <!--  -->
      <span class="text-sm font-medium">
        {{ props.buttons.order_text }}
      </span>
      <!--  -->
    </a>
    <!--  -->

    <!--  -->
    <NuxtLink
      v-if="props.buttons.show_shop"
      to="/shop"
      class="w-full h-10 flex items-center justify-center cursor-pointer rounded-full border border-primary text-primary hover:bg-primary hover:text-white click-effect"
    >
      <!--  -->
      <span class="text-sm font-medium">
        {{ props.buttons.shop_text }}
      </span>
      <!--  -->
    </NuxtLink>
    <!--  -->
  </div>
  <!--  -->
</template>

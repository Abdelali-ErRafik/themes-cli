<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  menus: {
    type: Object,
    required: true,
  },
});

const footerMenu = computed(() =>
  [
    {
      active: props.menus.menu1_active,
      title: props.menus.menu1_title,
      menu: props.menus.menu1,
    },
    {
      active: props.menus.menu2_active,
      title: props.menus.menu2_title,
      menu: props.menus.menu2,
    },
    {
      active: props.menus.menu3_active,
      title: props.menus.menu3_title,
      menu: props.menus.menu3,
    },
  ].filter((item) => item.active)
);
</script>

<template>
  <!--  -->
  <div
    v-for="(item, i) in footerMenu"
    :key="i"
    class="flex flex-col w-full px-4 menu sm:w-1/2 lg:w-auto lg:flex-1"
    :class="item.menu ? 'gap-4' : ''"
  >
    <!--  -->
    <h1 class="font-medium text-sm">{{ item.title }}</h1>
    <!--  -->

    <!--  -->
    <div v-if="item.menu" class="flex flex-col gap-3 text-sm">
      <!--  -->
      <div v-for="(subitem, index) in item.menu.items" :key="index">
        <!--  -->
        <span class="hover:text-secondary">
          <!--  -->
          <NuxtLink :to="subitem.url">{{ subitem.text }}</NuxtLink>
          <!--  -->
        </span>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

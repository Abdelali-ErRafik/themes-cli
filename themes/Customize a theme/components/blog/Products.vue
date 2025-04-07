<script setup lang="ts">
import { ref } from 'vue';

const props: any = defineProps({
  sidebar: {
    type: Object,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
});

const isOpen = ref(false);

function toggleProducts() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <!--  -->
  <div
    v-if="sidebar.products.active"
    class="border border-third rounded-lg overflow-hidden"
  >
    <!--  -->
    <div
      v-if="sidebar.products.title.length > 0"
      class="h-10 flex items-center justify-between bg-third px-4 cursor-pointer hover:text-secondary transition-color duration-300"
      @click="toggleProducts"
    >
      <!--  -->
      <h2 class="font-medium tracking-normal text-sm capitalize">
        {{ sidebar.products.title }}
      </h2>
      <!--  -->

      <!--  -->
      <Icon
        :name="'solar:alt-arrow-down-linear'"
        :class="[
          'text-xl transition-transform duration-300',
          { 'rotate-180': isOpen },
        ]"
      />
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <transition name="slide-down" mode="out-in">
      <!--  -->
      <div v-if="isOpen" class="flex flex-col gap-3 px-4 py-3">
        <!--  -->
        <div
          v-for="(product, i) in props.products"
          :key="i"
          class="flex items-center gap-4 bg-third border border-third rounded-lg p-2 hover:opacity-90 hover:scale-105 transition-all duration-300"
        >
          <!--  -->
          <NuxtLink
            :to="`/products/${product.slug}`"
            :title="product.name"
            :aria-label="product.name"
            class="flex-none"
          >
            <!--  -->
            <ImageLoader
              img-class="w-20 h-20 lg:h-16 lg:w-16 rounded-lg border border-third overflow-hidden"
              :src="product.images.length > 0 ? product.images[0].src : null"
              :alt="product.name"
            />
            <!--  -->
          </NuxtLink>
          <!--  -->

          <!--  -->
          <NuxtLink :to="`/products/${product.slug}`">
            <!--  -->
            <h3 class="text-sm font-medium">{{ product.name }}</h3>
            <!--  -->
          </NuxtLink>
          <!--  -->
        </div>
        <!--  -->
      </div>
      <!--  -->
    </transition>
    <!--  -->
  </div>
  <!--  -->
</template>

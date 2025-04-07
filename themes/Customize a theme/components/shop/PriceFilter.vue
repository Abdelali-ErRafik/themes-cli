<script setup lang="ts">
const props: any = defineProps({
  sidebar: {
    type: Object,
    required: true,
  },
  filters: {
    type: Object,
    required: true,
  },
  setParams: {
    type: Function,
    required: true,
  },
});

const isOpen = ref(false);

const togglePrices = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <!--  -->
  <div
    v-if="props.sidebar.prices.active && props.filters && props.filters.prices"
    class="border border-third rounded-lg overflow-hidden"
  >
    <!--  -->
    <div
      v-if="sidebar.prices.title.length > 0"
      class="h-10 flex items-center justify-between bg-third px-4 cursor-pointer hover:text-secondary transition-color duration-300"
      @click="togglePrices"
    >
      <!--  -->
      <h2 class="font-medium tracking-normal text-sm capitalize">
        {{ sidebar.prices.title }}
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
    <transition name="slide-down">
      <!--  -->
      <div v-if="isOpen" class="flex flex-col gap-3 px-4 py-3" dir="ltr">
        <!--  -->
        <ShopPriceRange
          :min="props.filters.prices.min"
          :max="props.filters.prices.max"
          @change="props.setParams"
        />
        <!--  -->
      </div>
      <!--  -->
    </transition>
  </div>
  <!--  -->
</template>

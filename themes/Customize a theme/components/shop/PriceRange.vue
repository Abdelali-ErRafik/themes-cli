<script setup lang="ts">
import { ref, watch, computed } from 'vue';
const { $settings }: any = useNuxtApp();

const sidebar = $settings.sections.shop.sidebar;

const props = defineProps({
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['change']);

const minVal = ref(props.min);
const maxVal = ref(props.max);

watch(minVal, (newValue) => {
  if (newValue > maxVal.value) {
    minVal.value = maxVal.value;
  }
});

watch(maxVal, (newValue) => {
  if (newValue < minVal.value) {
    maxVal.value = minVal.value;
  }
});

const setParams = (event: Event, key: string) => {
  emit('change', event, key);
};

const rangeStyle = computed(() => {
  return {
    left: `${(minVal.value * 100) / props.max}%`,
    width: `${((maxVal.value - minVal.value) * 100) / props.max}%`,
  };
});
</script>

<template>
  <!--  -->
  <div class="flex flex-col gap-6">
    <!--  -->
    <div
      class="relative flex items-center h-1 px-2 mx-1 rounded-md primary-gray-bg range"
    >
      <!--  -->
      <div class="absolute top-0 h-1 range-width" :style="rangeStyle"></div>
      <!--  -->

      <!--  -->
      <input
        v-model="minVal"
        class="absolute top-0 left-0 w-full h-1 bg-transparent appearance-none min"
        type="range"
        :min="props.min"
        :max="props.max"
        @change="setParams($event, 'price.salePrice-from')"
      />
      <!--  -->

      <!--  -->
      <input
        v-model="maxVal"
        class="absolute top-0 left-0 w-full h-1 bg-transparent appearance-none max"
        type="range"
        :min="props.min"
        :max="props.max"
        @change="setParams($event, 'price.salePrice-to')"
      />
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <div class="flex items-center gap-1 flex-end">
      <!--  -->
      <div class="text-xs">
        <!--  -->
        <span>{{ sidebar.prices.price_title }}</span>
        <!--  -->

        <!--  -->
        <span class="font-bold">{{ props.min }}</span>
        <!--  -->

        <!--  -->
        <span> — </span>
        <!--  -->

        <!--  -->
        <span class="font-bold">{{ props.max }}</span>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

<style scoped lang="scss">
.range {
  input {
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      -moz-appearance: none;
      position: relative;
      height: 10px;
      width: 10px;
      border-radius: 50%;
      z-index: 3;
      cursor: pointer;
      background: var(--secondary-color);
    }

    &.min::-webkit-slider-thumb {
      right: 0px;
    }

    &.max::-webkit-slider-thumb {
      left: 7px;
    }
  }

  .range-width {
    background-color: var(--secondary-color);
  }
}
</style>

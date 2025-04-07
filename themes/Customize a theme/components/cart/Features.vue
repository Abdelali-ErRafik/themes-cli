<script setup lang="ts">
const props = defineProps({
  features: {
    type: Object,
    required: true,
  },
});

const featureItems = computed(() => {
  return Object.keys(props.features)
    .filter((key) => key.startsWith('item_'))
    .map((key) => props.features[key]);
});

const defaultIcons = [
  'mdi:truck-delivery',
  'mdi:package-variant',
  'mdi:store-check',
  'mdi:shield-check',
];

const getIcon = (item: any, index: any) => {
  return item.image || defaultIcons[index] || defaultIcons[0];
};
</script>

<template>
  <!--  -->
  <div
    v-if="features.active"
    class="w-full rounded-lg py-4 px-4 lg:px-6"
    :style="{
      backgroundColor: features.colors.background_color,
      color: features.colors.text_color,
    }"
  >
    <!--  -->
    <ul class="flex flex-row lg:flex-col flex-wrap lg:flex-nowrap lg:gap-3">
      <!--  -->
      <li
        v-for="(item, index) in featureItems"
        :key="index"
        class="w-1/2 lg:w-auto p-2 lg:p-0"
        :style="{ color: features.colors.text_color }"
      >
        <!--  -->
        <div
          class="flex flex-col lg:flex-row items-center gap-3 border lg:border-0 border-third rounded-lg p-2 lg:p-0"
        >
          <!--  -->
          <div
            class="h-12 w-12 lg:h-10 lg:w-10 flex items-center justify-center border border-third rounded-full"
            :style="{
              backgroundColor: `${features.colors.background_color}`,
            }"
          >
            <!--  -->
            <ImageLoader
              v-if="item.image"
              img-class="h-6 w-6 lg:h-5 lg:w-5"
              :src="item.image.src"
              :alt="item.title"
            />
            <!--  -->

            <!--  -->
            <Icon
              v-else
              :name="getIcon(item, index)"
              class="h-6 w-6 lg:h-5 lg:w-5"
              :style="{ color: features.colors.text_color }"
            />
            <!--  -->
          </div>
          <!--  -->

          <!--  -->
          <span
            class="text-sm lg:text-base font-medium text-center lg:text-start"
            >{{ item.title }}</span
          >
          <!--  -->
        </div>
        <!--  -->
      </li>
      <!--  -->
    </ul>
    <!--  -->
  </div>
  <!--  -->
</template>

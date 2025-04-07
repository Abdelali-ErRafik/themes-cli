<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && Array.isArray(value.products);
    },
  },
  title: {
    type: String,
    default: '',
  },
});

const swiperBreakpoints = {
  320: { slidesPerView: 2 },
  640: { slidesPerView: 3 },
  768: { slidesPerView: 4 },
  1024: { slidesPerView: 5 },
  1280: { slidesPerView: 6 },
};

const hasTitle = computed(() => props.title?.trim().length > 0);
</script>

<template>
  <!--  -->
  <div v-if="item" class="flex flex-col gap-6">
    <!--  -->
    <h3
      v-if="hasTitle"
      class="text-xl lg:text-2xl font-extrabold title-font text-primary"
    >
      {{ title }}
    </h3>
    <!--  -->

    <!--  -->
    <div class="overflow-hidden">
      <!--  -->
      <ClientOnly>
        <!--  -->
        <swiper-container
          :breakpoints="swiperBreakpoints"
          :slides-per-view="1"
          space-between="16"
        >
          <!--  -->
          <swiper-slide
            v-for="(product, index) in item.products"
            :key="product.id || index"
            class="h-auto border border-third rounded-2xl overflow-hidden"
          >
            <!--  -->
            <ElementProduct :item="product" :upsell="item" page="home" />
            <!--  -->
          </swiper-slide>
          <!--  -->
        </swiper-container>
        <!--  -->
      </ClientOnly>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

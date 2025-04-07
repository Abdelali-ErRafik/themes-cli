<script setup lang="ts">
const props: any = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => [],
  },
  productName: {
    type: String,
    required: true,
  },
  initialIndex: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['update:current-index', 'click-main-image']);

const currentIndex = ref(props.initialIndex);
let mainSwiper: any = null;

const setCurrentImage = (index: any) => {
  currentIndex.value = index;
  emit('update:current-index', index);
  if (mainSwiper) {
    mainSwiper.slideTo(index);
  }
};

const onMainSwiperInit = (swiper: any) => {
  mainSwiper = swiper;
  mainSwiper.on('slideChange', () => {
    currentIndex.value = mainSwiper.activeIndex;
    emit('update:current-index', mainSwiper.activeIndex);
  });
};
</script>

<template>
  <!--  -->
  <div class="flex gap-4 overflow-hidden h-fit">
    <!--  -->
    <swiper-container
      v-if="images?.length > 0"
      :slides-per-view="5"
      :space-between="8"
      :loop="true"
      direction="vertical"
      class="w-full md:w-1/5 hidden md:block max-h-[400px]"
    >
      <!--  -->
      <swiper-slide
        v-for="(image, index) in props.images"
        :key="index"
        class="border rounded-lg overflow-hidden cursor-pointer"
        :class="currentIndex === index ? 'border-secondary' : 'border-third'"
        @click="setCurrentImage(index)"
      >
        <!--  -->
        <ImageLoader
          :src="image.src"
          :alt="`${productName} - ${image.title}`"
          img-class="object-cover w-full h-full"
        />
        <!--  -->
      </swiper-slide>
      <!--  -->
    </swiper-container>
    <!--  -->

    <!--  -->
    <swiper-container
      v-if="images?.length > 0"
      :slides-per-view="1"
      :loop="true"
      class="w-full md:w-4/5"
      @swiper="onMainSwiperInit"
    >
      <!--  -->
      <swiper-slide
        v-for="(image, index) in props.images"
        :key="index"
        class="border border-third rounded-lg overflow-hidden cursor-pointer"
      >
        <!--  -->
        <ImageLoader
          img-class="w-full h-full object-cover"
          :src="image?.src"
          :alt="productName"
          @click="$emit('click-main-image')"
        />
        <!--  -->
      </swiper-slide>
      <!--  -->
    </swiper-container>
    <!--  -->
  </div>
  <!--  -->
</template>

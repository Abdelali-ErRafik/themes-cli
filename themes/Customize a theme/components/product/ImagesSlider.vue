<script setup lang="ts">
const props: any = defineProps({
  images: {
    type: Array,
    required: true,
  },
  showImageSlider: {
    type: Boolean,
    required: true,
  },
  visibleSlide: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['update:showImageSlider', 'update:visibleSlide']);

const zoom = ref(0);
const imageScale = ref(1);
const posX = ref(0);
const posY = ref(0);
const fullScreen = ref(false);
const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);
const cursor = ref('cursor-zoom-in');

const swiperBreakpoints = {
  640: { slidesPerView: 5 },
  768: { slidesPerView: 6 },
  1024: { slidesPerView: 7 },
};

const closeSlider = () => emit('update:showImageSlider', false);

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullScreen.value = true;
  } else {
    document.exitFullscreen();
    fullScreen.value = false;
  }
};

const toggleZoom = () => {
  if (imageScale.value > 1) {
    imageScale.value = 1;
    zoom.value = 0;
    cursor.value = 'cursor-zoom-in';
  } else {
    imageScale.value = 2;
    zoom.value = 100;
    cursor.value = 'cursor-zoom-out';
  }
};

const startDrag = (event: any) => {
  isDragging.value = true;
  startX.value = event.clientX || event.touches[0].clientX;
  startY.value = event.clientY || event.touches[0].clientY;
};

const dragImage = (event: any) => {
  if (isDragging.value && imageScale.value > 1) {
    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;
    posX.value += clientX - startX.value;
    posY.value += clientY - startY.value;
    startX.value = clientX;
    startY.value = clientY;
  }
};

const stopDrag = (event: any) => {
  isDragging.value = false;
  isDragging.value = false;
  posX.value = 0;
  posY.value = 0;

  const endX = event.clientX || event.changedTouches[0].clientX;
  const difference = startX.value - endX;
  if (difference > 0) {
    next();
  } else if (difference < 0) {
    prev();
  }

  startX.value = 0;
};

const increaseSize = () => {
  if (imageScale.value < 2) {
    imageScale.value += 0.2;
    zoom.value += 20;
  }
};

const decreaseSize = () => {
  if (imageScale.value > 1) {
    imageScale.value -= 0.2;
    zoom.value -= 20;
  }
};

const next = () => {
  const newIndex =
    props.visibleSlide >= props.images.length - 1 ? 0 : props.visibleSlide + 1;
  setImage(newIndex);
};

const prev = () => {
  const newIndex =
    props.visibleSlide <= 0 ? props.images.length - 1 : props.visibleSlide - 1;
  setImage(newIndex);
};

const setImage = (index: number) => {
  emit('update:visibleSlide', index);
};
</script>

<template>
  <!--  -->
  <transition name="fade">
    <!--  -->
    <div v-if="showImageSlider" class="bg-white fixed inset-0 z-40 h-screen">
      <!--  -->
      <div class="absolute z-10 top-0 left-0 right-0">
        <!--  -->
        <div
          class="h-11 flex items-center justify-between bg-white shadow-bottom px-4"
        >
          <!--  -->
          <div class="flex w-1/3">
            <!--  -->
            <button
              class="w-11 h-11 flex items-center justify-center cursor-pointer hover:text-secondary"
              @click="decreaseSize"
            >
              <!--  -->
              <Icon
                name="solar:magnifer-zoom-out-linear"
                class="text-2xl translate"
              />
              <!--  -->
            </button>
            <!--  -->

            <!--  -->
            <div class="flex items-center justify-center">
              <!--  -->
              <span class="text-sm">
                <span class="text-secondary">{{ zoom }}</span
                >%
              </span>
              <!--  -->
            </div>
            <!--  -->

            <!--  -->
            <button
              class="w-11 h-11 flex items-center justify-center cursor-pointer hover:text-secondary"
              @click="increaseSize"
            >
              <!--  -->
              <Icon
                name="solar:magnifer-zoom-in-linear"
                class="text-2xl translate"
              />
              <!--  -->
            </button>
            <!--  -->
          </div>
          <!--  -->

          <!--  -->
          <div class="w-1/3 flex items-center justify-center">
            <!--  -->
            <span class="text-sm">
              <span class="text-secondary">
                {{ `${props.visibleSlide + 1}` }}</span
              >
              {{ ` / ${props.images.length}` }}
            </span>
            <!--  -->
          </div>
          <!--  -->

          <!--  -->
          <div class="w-1/3 flex items-center justify-end">
            <!--  -->
            <div
              class="h-11 flex items-center justify-center cursor-pointer hover:text-secondary"
              @click="toggleFullscreen"
            >
              <!--  -->
              <Icon
                v-if="!fullScreen"
                name="solar:full-screen-circle-linear"
                class="text-2xl translate"
              />
              <!--  -->

              <!--  -->
              <Icon
                v-else
                name="solar:quit-full-screen-circle-linear"
                class="text-2xl translate"
              />
              <!--  -->
            </div>
            <!--  -->

            <!--  -->
            <div
              class="w-11 h-11 flex items-center justify-center cursor-pointer hover:text-secondary"
              @click="closeSlider"
            >
              <!--  -->
              <Icon
                name="solar:close-circle-linear"
                class="text-2xl translate"
              />
              <!--  -->
            </div>
            <!--  -->
          </div>
          <!--  -->
        </div>
        <!--  -->
      </div>
      <!--  -->

      <!--  -->
      <div class="flex items-center h-full relative">
        <!--  -->
        <div class="w-full px-4" @dblclick="toggleZoom">
          <!--  -->
          <div
            @mousedown.prevent="startDrag"
            @touchstart.prevent="startDrag"
            @mousemove="dragImage"
            @touchmove="dragImage"
            @mouseup="stopDrag"
            @touchend="stopDrag"
          >
            <!--  -->
            <transition name="fade">
              <!--  -->
              <div v-if="props.images.length">
                <!--  -->
                <div
                  v-for="(image, index) in props.images"
                  v-show="props.visibleSlide === index"
                  :key="index"
                  :class="cursor"
                  class="relative pb-full sm:pb-4/5 md:pb-3/5 lg:pb-1/2"
                  :style="{
                    transform: `scale(${imageScale}) translate(${posX}px, ${posY}px)`,
                  }"
                >
                  <!--  -->
                  <div class="h-full w-full absolute inset-0">
                    <!--  -->
                    <ImageLoader
                      img-class="h-full w-full object-contain"
                      :src="image.src"
                      :alt="image.alt || 'Image'"
                    />
                    <!--  -->
                  </div>
                  <!--  -->
                </div>
                <!--  -->
              </div>
              <!--  -->
            </transition>
            <!--  -->
          </div>
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div
          class="absolute bottom-28 sm:bottom-auto left-0 mx-10 cursor-pointer hover:text-secondary"
          @click="prev"
        >
          <!--  -->
          <Icon
            name="solar:alt-arrow-left-linear"
            class="text-3xl md:text-5xl translate"
          />
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div
          class="absolute bottom-28 sm:bottom-auto right-0 mx-10 cursor-pointer hover:text-secondary"
          @click="next"
        >
          <!--  -->
          <Icon
            name="solar:alt-arrow-right-linear"
            class="text-3xl md:text-5xl translate"
          />
          <!--  -->
        </div>
        <!--  -->
      </div>
      <!--  -->

      <!--  -->
      <div class="absolute z-10 bottom-0 left-0 right-0">
        <!--  -->
        <div
          class="w-full flex items-center justify-center bg-white shadow-top px-4"
        >
          <!--  -->
          <ClientOnly>
            <!--  -->
            <swiper-container
              :slides-per-view="4"
              :breakpoints="swiperBreakpoints"
              class="w-full h-20"
            >
              <!--  -->
              <swiper-slide
                v-for="(image, index) in props.images"
                :key="index"
                class="h-full w-20 object-cover cursor-pointer transition-all duration-300"
                :class="
                  props.visibleSlide == index ? 'border-2 border-secondary' : ''
                "
              >
                <!--  -->
                <ImageLoader
                  :src="image.src"
                  :alt="image.alt"
                  img-class="w-full h-full object-cover"
                  @click="setImage(index)"
                />
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
    </div>
    <!--  -->
  </transition>
  <!--  -->
</template>

<style scoped>
.cursor-zoom-in {
  cursor: zoom-in;
}

.cursor-zoom-out {
  cursor: zoom-out;
}
</style>

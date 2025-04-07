<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed } from 'vue';
import { useMainStore } from '@/stores/main';

const $store = useMainStore();
const emit = defineEmits(['click']);

const props = defineProps({
  alt: {
    type: String,
    default: 'No alt found',
  },
  src: {
    type: String,
    default:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4',
  },
  property: {
    type: String,
    default: null,
  },
  default: {
    type: String,
    default: null,
  },
  imgClass: {
    type: String,
    default: null,
  },
});

const id = ref('_' + (Math.random() * 10000).toFixed(0));
const newSrc = ref('');
const isLoading = ref(true);
const empty = computed(() => props.default || $store.defaults.noImage);

const init = async () => {
  isLoading.value = true;
  id.value = '_' + (Math.random() * 10000).toFixed(0);
  await nextTick();

  const element: any = document.getElementById(id.value);
  let property = 'Width';

  if (!element) {
    return;
  }

  if (element.clientHeight > element.clientWidth) {
    property = 'Height';
  }

  if (props.property) {
    property =
      props.property.charAt(0).toUpperCase() +
      props.property.slice(1).toLowerCase();
  }

  const value =
    element[`client${property}`] > 0
      ? Math.ceil(parseInt(element[`client${property}`]) * 1.6)
      : 0;

  newSrc.value = props.src
    ? `${props.src}?${property.toLowerCase()}=${value}&quality=90`
    : empty.value;
  isLoading.value = false;
};

const handleLoad = () => {
  isLoading.value = false;
};

watch(
  () => props.src,
  () => {
    init();
  }
);

onMounted(() => {
  init();
});
</script>

<template>
  <!--  -->
  <div class="relative w-full h-full">
    <!--  -->
    <div
      v-if="isLoading"
      class="absolute inset-0 flex items-center justify-center bg-gray-200 z-10"
    >
      <!--  -->
      <div class="loader"></div>
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <nuxt-img
      :id="id"
      :src="newSrc"
      :alt="alt"
      loading="lazy"
      format="webp"
      :class="[
        'transition-opacity duration-300',
        { 'opacity-0': isLoading, 'opacity-100': !isLoading },
        imgClass,
      ]"
      @click="$emit('click')"
      @load="handleLoad"
    />
    <!--  -->
  </div>
  <!--  -->
</template>

<style scoped>
.loader {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow:
    20px 0 #fff,
    -20px 0 #fff;
  position: relative;
  animation: flash 0.5s ease-out infinite alternate;
}

@keyframes flash {
  0% {
    background-color: #d1d5db;
    box-shadow:
      20px 0 #d1d5db,
      -20px 0 #fff;
  }
  50% {
    background-color: #fff;
    box-shadow:
      20px 0 #d1d5db,
      -20px 0 #d1d5db;
  }
  100% {
    background-color: #d1d5db;
    box-shadow:
      20px 0 #fff,
      -20px 0 #d1d5db;
  }
}
</style>

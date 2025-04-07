<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useNuxtApp } from '#app';

const { $settings } = useNuxtApp();

const showButton = ref(false);
const topScroll = ref($settings.sections.top_scroll);

const bgColor = ref(topScroll.value.colors.background_color);
const textColor = ref(topScroll.value.colors.text_color);

const handleScroll = () => {
  showButton.value = window.pageYOffset > 100;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div
    v-if="showButton"
    class="scoll-to-top fixed z-10 bottom-28 inline-flex items-center justify-center w-12 h-12 rounded-full border cursor-pointer hover:scale-105 transition-all duration-300"
    :style="{ backgroundColor: bgColor, color: textColor, border: textColor }"
    @click="scrollToTop"
  >
    <!--  -->
    <Icon name="solar:alt-arrow-up-linear" class="text-2xl translate" />
    <!--  -->
  </div>
  <!--  -->
</template>

<style scoped>
.scoll-to-top {
  right: 3.1rem;
}

[dir='rtl'] .scoll-to-top {
  left: 3.1rem;
  right: auto;
}
</style>

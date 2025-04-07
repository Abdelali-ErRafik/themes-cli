<script setup lang="ts">
// Props for the LogoComponent
const props = defineProps({
  mobileLogo: {
    type: Object,
    default: () => ({ img: null }),
  },
  desktopLogo: {
    type: Object,
    default: () => ({ img: null }),
  },
  defaultLogo: {
    type: String,
    default: '',
  },
});

// Computed logo source
const logoSrc = computed(() => {
  return (
    (props.mobileLogo.img || props.desktopLogo.img)?.src || props.defaultLogo
  );
});
</script>

<template>
  <NuxtLink to="/">
    <imageLoader
      property="height"
      img-class="object-contain w-full h-8 lg:h-10"
      :src="logoSrc"
      alt="Store Logo"
    />
  </NuxtLink>
</template>

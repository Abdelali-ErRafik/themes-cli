<script setup lang="ts">
const props = defineProps({
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  badgeCount: {
    type: Number,
    default: 0,
  },
  text: {
    type: String,
    default: '',
  },
  textColor: {
    type: String,
    default: '#fff',
  },
  bgColor: {
    type: String,
    default: '#000',
  },
});
</script>

<template>
  <NuxtLink
    :to="props.link"
    class="flex flex-col items-center gap-1 hover:text-secondary"
    :title="props.title"
  >
    <span class="relative flex items-center justify-center">
      <Icon :name="props.iconName" class="text-2xl lg:text-3xl translate" />
      <span
        v-if="props.badgeCount > 0"
        class="lang-style absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs font-medium rounded-full"
        :style="{ backgroundColor: props.textColor, color: props.bgColor }"
      >
        {{ props.badgeCount }}
      </span>
    </span>
    <span
      v-if="props.text"
      class="text-center text-sm font-normal hidden lg:block"
    >
      {{ props.text }}
    </span>
  </NuxtLink>
</template>

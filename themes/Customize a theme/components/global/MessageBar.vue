<script setup lang="ts">
import { ref } from 'vue';
import { useNuxtApp } from '#app';

// Access global settings
const { $settings }: any = useNuxtApp();

// Extract topBar data
const messageBar = ref($settings.sections.message_bar);
const colors = ref(messageBar.value.colors);
const message = ref(messageBar.value.message);
</script>

<template>
  <div
    class="message-bar-color message-bar-text-color py-2.5 border-b border-third"
    :style="{
      backgroundColor: colors.background_color,
      color: colors.text_color,
    }"
  >
    <div
      class="container flex flex-wrap items-center justify-center text-center font-medium text-s"
      v-html="message"
    ></div>
  </div>
</template>

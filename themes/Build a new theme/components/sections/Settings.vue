<template>
  <!-- You can delete this file -->
  <div>
    <h2>Settings</h2>
    <div>
      {{ $settings }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';
const { $settings }: any = useNuxtApp();
</script>
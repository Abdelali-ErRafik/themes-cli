<template>
  <!-- You can delete this file -->
  <div>
    <h2>fetch Products</h2>
    <div v-if="!loading && items.length > 0">
      {{ items }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const { $settings, $storeino }: any = useNuxtApp();

const items = ref([]);

const loading = ref(true);

onMounted(() => {
  fetchProducts();
});

async function fetchProducts() {
  loading.value = true;
  try {
    const filter: any = { status: 'PUBLISH' };

    const { data } = await $storeino.products.search(filter);

    items.value = data.results;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>
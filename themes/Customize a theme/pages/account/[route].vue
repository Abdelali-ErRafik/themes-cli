<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useMainStore } from '@/stores/main';

const { $settings, $storeino, $tools }: any = useNuxtApp();

const VALID_ROUTES = ['password', 'orders', 'profile', 'messages', 'login'];

const route = useRoute();
const $store = useMainStore();

const iframeRef = ref<HTMLIFrameElement | null>(null);
const iframeHeight = ref('910px');
const observer = ref<ResizeObserver | null>(null);
const url = ref('https://accounts.storeino.world');
const token: any = ref('');

const isValidRoute = computed(() => {
  return VALID_ROUTES.includes(route.params.route as string);
});

onMounted(() => {
  url.value =
    $store.baseURL !== 'https://api-stores.storeino.com/api'
      ? 'https://accounts.storeino.world'
      : 'https://accounts.storeino.com';

  token.value = $store.token;
  const tokenCustomer = $tools.getCookie('CUSTOMER');

  if (tokenCustomer) {
    token.value = tokenCustomer;
  }

  $storeino.fbpx('PageView');
  $tools.call('PAGE_VIEW');
});

onBeforeUnmount(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});

useHead(() => ({
  title: `${$settings?.store_name || 'Online Store'} - Account`,
  meta: [
    {
      name: 'description',
      content: `${$settings?.store_description || 'description'} account`,
    },
    {
      property: 'og:description',
      content: `${$settings?.store_description || 'description'} account`,
    },
    {
      property: 'twitter:description',
      content: `${$settings?.store_description || 'description'} account`,
    },
  ],
}));
</script>

<template>
  <!--  -->
  <div class="container relative w-full px-10 py-5 overflow-hidden m-0 p-0">
    <!--  -->
    <div
      v-if="$store.loading"
      class="absolute inset-0 flex items-center justify-center bg-white z-50"
    >
      <!--  -->
      <LoaderAccount />
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <template v-if="isValidRoute">
      <!--  -->
      <iframe
        id="iframe"
        ref="iframeRef"
        :src="`${url}/?token=${token}`"
        class="form-iframe w-full"
        name="iframe-account"
        :height="iframeHeight"
        frameborder="0"
      />
      <!--  -->
    </template>
    <!--  -->

    <!--  -->
    <div v-else class="text-center py-8">
      {{ 'NOT FOUND' }}
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

<style scoped>
.form-iframe {
  min-height: 910px;
  transition: height 0.3s ease;
}
</style>

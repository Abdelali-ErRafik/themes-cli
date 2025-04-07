<script setup lang="ts">
import { ref } from 'vue';
// import { useHead } from '@vueuse/head';
import { useMainStore } from '@/stores/main';
import { useNuxtApp } from '#app';

// Access global settings
const { $settings, $tools }: any = useNuxtApp();
const $store = useMainStore();

const messageBar = ref($settings.sections.message_bar);
const otherScripts = ref($settings.other_scripts);

const topHeader = ref($settings.sections.top_header);
const colors = ref($settings.sections.colors);

const showStoreMaintenance = ref(true);
const storeMaintenanceUnlocked = ref($settings.store_maintenance_unlocked);

const storeMaintenance = ref($settings.store_maintenance);
const storeName = ref($settings.store_name);

const seo = ref($store.seo);
const currency = ref($store.currency);

const storeFavIcon = ref($settings.store_favicon);
const defaultIcon = $store.defaults.icon;

const analitycsShere = ref($settings.analitycs_shere);
const language = ref($store.language);

const primaryText = ref(colors.value.primary.text);
const primaryColor = ref(colors.value.primary.color);

const secondaryText = ref(colors.value.secondary.text);
const secondaryColor = ref(colors.value.secondary.color);

const thirdText = ref(colors.value.third.text);
const thirdColor = ref(colors.value.third.color);
const thirdBorder = ref(colors.value.third.border);

const openStore = (active: true) => {
  showStoreMaintenance.value = active;
};

const closeStore = () => {
  $tools.setCookie('store_maintenance_code', 'yes');
  storeMaintenanceUnlocked.value = false;
};

useHead({
  title: seo.value.title,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: seo.value.description,
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: seo.value.keywords.join(','),
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: seo.value.title,
    },
    {
      hid: 'og:site_name',
      property: 'og:site_name',
      content: storeName.value,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: seo.value.description,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: seo.value.image,
    },
    { hid: 'og:url', property: 'og:url', content: seo.value.url },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: seo.value.title,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: seo.value.description,
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: seo.value.logo,
    },
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: seo.value.url,
    },
    {
      hid: 'theme-color',
      property: 'theme-color',
      content: colors.value.primary.color,
    },
    {
      hid: 'currency',
      name: 'currency',
      content: currency.value.code,
    },
    {
      hid: 'product:price:currency',
      property: 'product:price:currency',
      content: currency.value.code,
    },
    {
      hid: 'priceCurrency',
      content: currency.value.code,
    },
    ...seo.value.metaTags,
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: storeFavIcon.value ? storeFavIcon.value.src : defaultIcon,
    },
    { rel: 'dns-prefetch', href: 'https://storeno.b-cdn.net/stores/' },
  ],
  script: [
    {
      src: 'https://umami.storeino.world/script.js',
      'data-website-id':
        analitycsShere.value && analitycsShere.value[0]['data-website-id'],
    },
  ],
  htmlAttrs: {
    lang: language.value.code,
    dir: language.value.code == 'AR' ? 'rtl' : 'ltr',
  },
});
</script>

<template>
  <div class="account_page">
    <!-- Maintenance Page -->
    <div
      v-if="storeMaintenance || !showStoreMaintenance"
      class="maintenance_page"
    >
      <!--  -->
      <MaintenancePage @open-store="openStore" />
      <!--  -->
    </div>
    <!-- Maintenance Page -->

    <!-- Main Content -->
    <div v-else class="nuxt_page">
      <!-- Store Maintenance Unlocked Notification -->
      <div v-if="storeMaintenanceUnlocked" class="fixed top-0 right-0 z-10">
        <!--  -->
        <div
          class="bg-blue-500 p-2 cursor-pointer opacity-70 hover:opacity-100 transition-all duration-300"
          @click="closeStore"
        >
          <!--  -->
          <svg
            class="text-white w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <!--  -->
            <path
              d="M6 10V8C6 7.65929 6.0284 7.32521 6.08296 7M18 10V8C18 4.68629 15.3137 2 12 2C10.208 2 8.59942 2.78563 7.5 4.03126"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <!--  -->
            <path
              d="M11 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <!--  -->
          </svg>
          <!--  -->
        </div>
        <!--  -->
      </div>
      <!--  -->

      <!--  -->
      <component :is="'style'">
        :root { --primary-text: {{ primaryText }}; --primary-color:
        {{ primaryColor }}; --secondary-text: {{ secondaryText }};
        --secondary-color: {{ secondaryColor }}; --third-text : {{ thirdText }};
        --third-color : {{ thirdColor }}; --third-border : {{ thirdBorder }}; }
      </component>
      <!--  -->

      <!--  -->
      <GlobalMessageBar v-if="messageBar.active" />
      <!--  -->
      <GlobalTopHeader v-if="topHeader.active" />
      <!--  -->
      <GlobalHeader />
      <!--  -->
      <GlobalSideBar />

      <!--  -->
      <slot />
      <!--  -->
      <GlobalFooter />
      <!--  -->
      <div v-if="otherScripts" v-html="otherScripts"></div>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

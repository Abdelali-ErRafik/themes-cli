<script setup lang="ts">
import { ref } from 'vue';
import { useMainStore } from '@/stores/main';
import { useNuxtApp } from '#app';

const { $settings, $tools } = useNuxtApp();
const $store = useMainStore();

const messageBar = ref($settings.sections.message_bar);
const otherScripts = ref($settings.other_scripts);

const topHeader = ref($settings.sections.top_header);
const topScroll = ref($settings.sections.top_scroll);
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

const carousel = $settings.sections.carousel;
const desktopHeight = ref(carousel.responsive.desktop_height);
const tabletHeight = ref(carousel.responsive.tablet_height);
const mobileHeight = ref(carousel.responsive.mobile_height);

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
    {
      rel: 'preconnect',
      href: 'https://connect.facebook.net',
      crossorigin: 'anonymous',
    },
    {
      rel: 'preload',
      href: 'https://connect.facebook.net/en_US/fbevents.js',
      as: 'script',
    },
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
    dir: language.value.code === 'AR' ? 'rtl' : 'ltr',
  },
});
</script>

<template>
  <!--  -->
  <div class="default_page">
    <!--  -->
    <div
      v-if="storeMaintenance || !showStoreMaintenance"
      class="maintenance_page"
    >
      <!--  -->
      <MaintenancePage @open-store="openStore" />
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <div v-else class="nuxt_page">
      <!--  -->
      <div v-if="storeMaintenanceUnlocked" class="fixed top-0 right-0 z-10">
        <!--  -->
        <div
          class="bg-blue-500 p-2 cursor-pointer opacity-70 hover:opacity-100 transition-all duration-300"
          @click="closeStore"
        >
          x
        </div>
        <!--  -->
      </div>
      <!--  -->

      <!--  -->
      <component :is="'style'">
        :root { --desktop-height: {{ desktopHeight + 'px' }}; --tablet-height:
        {{ tabletHeight + 'px' }}; --mobile-height: {{ mobileHeight + 'px' }};
        --primary-text: {{ primaryText }}; --primary-color: {{ primaryColor }};
        --secondary-text: {{ secondaryText }}; --secondary-color:
        {{ secondaryColor }}; --third-text : {{ thirdText }}; --third-color :
        {{ thirdColor }}; --third-border : {{ thirdBorder }}; }
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
      <GlobalCopyright />
      <!--  -->
      <GlobalTopScroll v-if="topScroll.active" />
      <!--  -->
      <div v-if="otherScripts" v-html="otherScripts"></div>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

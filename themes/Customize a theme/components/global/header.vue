<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMainStore } from '@/stores/main';
import { useNuxtApp } from '#app';

const { $settings }: any = useNuxtApp();
const $store = useMainStore();

const header = $settings.sections.header;

const wishlist = ref(header.wishlist);
const cart = ref(header.cart);
const account = ref(header.account);

const desktopLogo = ref(header.logo.desktop);
const mobileLogo = ref(header.logo.mobile);

const bgColor = ref(header.colors.background_color);
const textColor = ref(header.colors.text_color);

const searchBgColor = ref(header.search.background_color);
const searchTextColor = ref(header.search.text_color);

const customer: any | string = ref(null);

const firstLetters = (firstName: string, lastName: string) => {
  return `${firstName[0]}.${lastName[0]}`.toUpperCase();
};

onMounted(() => {
  customer.value = $store.customer?.customer || null;
});
</script>

<template>
  <!--  -->
  <div class="header">
    <!--  -->
    <appsLoader placement="BEFORE_HEADER" />
    <!--  -->

    <!--  -->
    <div :style="{ backgroundColor: bgColor, color: textColor }">
      <!-- Header -->
      <div class="header border-b border-third">
        <!--  -->
        <header
          class="container flex flex-wrap lg:flex-nowrap items-center justify-between lg:gap-6 py-2 px-4"
        >
          <!-- Left Content -->
          <div
            class="w-1/2 lg:w-1/4 flex order-1 lg:order-none items-center justify-start gap-4"
          >
            <!-- header Menu -->
            <div
              class="flex items-center justify-center lg:hidden cursor-pointer"
              aria-label="Show header_menu"
              @click="$store.showHeaderMenu = !$store.showHeaderMenu"
            >
              <!--  -->
              <Icon
                name="solar:hamburger-menu-linear"
                class="text-3xl translate"
              />
              <!--  -->
            </div>
            <!-- header Menu -->

            <!-- logo -->
            <div class="logo">
              <HeaderLogo
                :mobile-logo="mobileLogo"
                :desktop-logo="desktopLogo"
                :default-logo="$store.defaults.logo"
              />
            </div>
            <!-- logo -->
          </div>
          <!-- Left Content -->

          <!-- Center Content -->
          <div
            class="w-full lg:w-2/4 flex order-3 lg:order-none items-center justify-center mt-4 lg:mt-0"
          >
            <!--  Search -->
            <HeaderSearch
              :is-active="header.search.active"
              :placeholder="header.search.text"
              :search-bg-color="searchBgColor"
              :search-text-color="searchTextColor"
            />
            <!-- Search -->
          </div>
          <!-- Center Content -->

          <!-- Right Content -->
          <div
            class="w-1/2 lg:w-1/4 flex order-2 lg:order-none items-center justify-end"
          >
            <!-- Icons -->
            <div class="flex items-center justify-end gap-4 lg:gap-6">
              <!-- Wishlist -->
              <HeaderIcons
                link="/wishlist"
                title="Wishlist"
                icon-name="solar:heart-linear"
                :is-active="wishlist.active"
                :badge-count="$store.wishlist.length"
                :text="wishlist.text"
                :text-color="textColor"
                :bg-color="bgColor"
              />
              <!-- Wishlist -->

              <!-- Cart -->
              <HeaderIcons
                link="/cart"
                title="Cart"
                icon-name="solar:cart-large-2-linear"
                :is-active="cart.active"
                :badge-count="$store.cart.length"
                :text="cart.text"
                :text-color="textColor"
                :bg-color="bgColor"
              />
              <!-- Cart -->

              <!-- Account -->
              <HeaderIcons
                :link="customer ? '/account/orders' : '/account/login'"
                title="Account"
                icon-name="solar:user-outline"
                :is-active="account.active"
                :text="
                  customer
                    ? firstLetters(customer.firstname, customer.lastname)
                    : account.text
                "
              />
              <!-- Account -->
            </div>
            <!--  -->
          </div>
          <!-- Right Content -->
        </header>
        <!--  -->
      </div>
      <!-- Header -->

      <!-- Header Menu -->
      <div class="header border-b border-third">
        <!--  -->
        <HeaderMenu :bg-color="bgColor" :text-color="textColor" />
        <!--  -->
      </div>
      <!-- Header Menu -->
    </div>

    <!--  -->
    <appsLoader placement="AFTER_HEADER" />
    <!--  -->
  </div>
  <!--  -->
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMainStore } from '@/stores/main';
import { useNuxtApp } from '#app';

// Access global settings
const { $settings }: any = useNuxtApp();
const $store = useMainStore();

// Reactive state
const activeId = ref<string | null>(null);

// Extract topHeader data
const topHeader = ref($settings.sections.top_header);

const colors = ref(topHeader.value.colors);

// Default $store languages and currencies
const storeLanguages = ref($settings.store_languages);
const storeCurrencies = ref($settings.store_currencies);

// Computed: Determine if dropdowns are available
const hasDropdowns = computed(
  () => topHeader.value.language.active || topHeader.value.currency.active
);

// Generate dropdown menus
const dropdownMenus = computed(() =>
  [
    {
      _id: 'lang',
      text: $store.language.code,
      active: topHeader.value.language.active,
      children: storeLanguages.value.map((l: any) => ({
        _id: l.code,
        text: l.name,
        url: `?lang=${l.code}`,
      })),
    },
    {
      _id: 'currency',
      text: $store.currency.code,
      active: topHeader.value.currency.active,
      children: storeCurrencies.value.map((c: any) => ({
        _id: c.code,
        text: c.name,
        url: `?cur=${c.code}`,
      })),
    },
  ].filter((item) => item.active)
);
</script>

<template>
  <!--  -->
  <div
    class="relative border-b border-third"
    :style="{
      backgroundColor: colors.background_color,
      color: colors.text_color,
    }"
  >
    <!-- Placement -->
    <AppsLoader placement="BEFORE_TOP_HEADER" />
    <!-- Placement -->

    <!-- Top Header -->
    <div
      class="flex flex-col md:flex-row gap-2 md:gap-0 flex-wrap items-center justify-between container p-2"
    >
      <!-- Left Content -->
      <div
        class="flex flex-col md:flex-row items-center justify-center md:justify-start w-full md:w-2/3 gap-2 md:gap-6"
      >
        <!--  -->
        <div
          v-if="topHeader.phone.number.length >= 0"
          class="w-full md:w-auto flex items-center justify-center md:justify-start gap-2 text-s font-normal hover:text-secondary"
        >
          <!--  -->
          <Icon name="solar:phone-rounded-linear" class="text-2xl translate" />
          <!--  -->

          <!--  -->
          <span>{{ topHeader.phone.number }}</span>
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div
          v-if="topHeader.location.address.length >= 0"
          class="w-full md:w-auto flex items-center justify-center md:justify-start gap-2 text-s font-normal hover:text-secondary"
        >
          <!--  -->
          <Icon name="solar:map-point-wave-linear" class="text-xl translate" />
          <!--  -->

          <!--  -->
          <span>{{ topHeader.location.address }}</span>
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div
          v-if="topHeader.work.time.length >= 0"
          class="w-full md:w-auto flex items-center justify-center md:justify-start gap-2 text-s font-normal hover:text-secondary"
        >
          <!--  -->
          <Icon name="solar:clock-circle-linear" class="text-xl translate" />
          <!--  -->

          <!--  -->
          <span>{{ topHeader.work.time }}</span>
          <!--  -->
        </div>
        <!--  -->
      </div>
      <!-- Left Content -->

      <!-- Right Content -->
      <div
        v-if="hasDropdowns"
        class="w-full md:w-1/3 flex items-center justify-center md:justify-end gap-2 md:gap-6"
      >
        <!--  -->
        <div
          v-for="menu in dropdownMenus"
          :key="menu._id"
          class="popup relative"
          @mouseover="activeId = menu._id"
          @mouseleave="activeId = null"
        >
          <!--  -->
          <div
            class="flex gap-2 items-center font-normal cursor-pointer hover:text-secondary"
          >
            <!--  -->
            <Icon
              :name="
                menu._id == 'lang'
                  ? 'solar:planet-linear'
                  : 'solar:chat-round-money-linear'
              "
              class="text-xl translate"
            />
            <!--  -->

            <!--  -->
            <span class="text-s font-normal">{{ menu.text }}</span>
            <!--  -->

            <!--  -->
            <Icon
              v-if="menu.children && menu.children.length > 0"
              name="solar:alt-arrow-down-linear"
              class="text-xl translate"
              :class="[
                activeId === menu._id
                  ? 'rotate-180 transition-all duration-300'
                  : '',
              ]"
            />
            <!--  -->
          </div>
          <!--  -->

          <!-- -->
          <transition name="fade">
            <!--  -->
            <div
              v-if="activeId === menu._id"
              class="absolute z-10 popup-lc top-full mt-2.5 border border-t-0 rounded-b-lg shadow-lg border-third"
              :style="{
                backgroundColor: colors.background_color,
                color: colors.text_color,
              }"
            >
              <!--  -->
              <div class="w-28 flex flex-col gap-1 p-2 mx-auto">
                <!--  -->
                <div v-for="(child, index) in menu.children" :key="index">
                  <!--  -->
                  <a
                    class="text-s font-normal hover:text-secondary"
                    :href="child.url"
                    >{{ child.text }}</a
                  >
                  <!--  -->

                  <!--  -->
                  <div
                    v-if="child.children && child.children.length > 0"
                    class="flex flex-col gap-1"
                  >
                    <!--  -->
                    <div
                      v-for="(subChild, subIndex) in child.children"
                      :key="subIndex"
                    >
                      <!--  -->
                      <a
                        class="text-s font-normal hover:text-secondary"
                        :href="subChild.url"
                        >{{ subChild.text }}</a
                      >
                      <!--  -->
                    </div>
                    <!--  -->
                  </div>
                  <!--  -->
                </div>
                <!--  -->
              </div>
              <!--  -->
            </div>
            <!--  -->
          </transition>
          <!--  -->
        </div>
        <!--  -->
      </div>
      <!-- right Content -->
    </div>
    <!-- Top Header -->

    <!-- Placement -->
    <div class="sticky top-0 left-0 right-0">
      <AppsLoader placement="BEFORE_TOP_HEADER_STICKY" />
    </div>
    <!-- Placement -->

    <!-- Placement -->
    <AppsLoader placement="AFTER_TOP_HEADER" />
    <!-- Placement -->
  </div>
  <!--  -->
</template>

<style lang="scss" scoped>
.popup {
  .popup-lc {
    @each $child, $right in (odd: 23%, even: 3%) {
      &:nth-child(#{$child}) {
        right: $right;
      }
    }
  }

  [dir='rtl'] & {
    .popup-lc {
      @each $child, $left in (odd: 24%, even: 18%) {
        &:nth-child(#{$child}) {
          left: $left;
          right: auto;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .popup {
    .popup-lc {
      @each $child, $right in (odd: -70%, even: -50%) {
        &:nth-child(#{$child}) {
          right: $right;
        }
      }
    }

    [dir='rtl'] & {
      .popup-lc {
        @each $child, $left in (odd: -82%, even: -52%) {
          &:nth-child(#{$child}) {
            left: $left;
            right: auto;
          }
        }
      }
    }
  }
}
</style>

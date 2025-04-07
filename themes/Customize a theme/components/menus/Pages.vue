<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  headerMenu: {
    type: Object,
    default: null,
  },
  textColor: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    required: true,
  },
});

const activeId2 = ref(null);
</script>

<template>
  <!--  -->
  <nav v-if="props.headerMenu" class="flex gap-4 items-center justify-center">
    <!--  -->
    <div v-for="(menu, index) in props.headerMenu.items" :key="index">
      <!--  -->
      <div
        class="cursor-pointer"
        @mouseover="activeId2 = activeId2 = menu._id"
        @mouseleave="activeId2 = activeId2 = null"
      >
        <!--  -->
        <NuxtLink
          class="flex gap-2 items-center cursor-pointer hover:text-secondary"
          :to="menu.url"
        >
          <!--  -->
          <span class="text-sm">{{ menu.text }}</span>
          <!--  -->

          <!--  -->
          <Icon
            v-if="menu.childrens.length > 0"
            name="solar:alt-arrow-down-linear"
            class="text-xl translate"
            :class="[
              activeId2 == menu._id
                ? 'rotate-180 transition-all duration-300'
                : '',
            ]"
          />
          <!--  -->
        </NuxtLink>
        <!-- Main Child -->

        <!-- Sub Child -->
        <transition name="fade">
          <!--  -->
          <div
            v-if="menu._id == activeId2 && menu.childrens.length > 0"
            :style="{ backgroundColor: props.bgColor, color: props.textColor }"
            class="absolute top-full left-0 right-0 z-10 border-t border-b border-third"
          >
            <!--  -->
            <div class="container flex gap-4 px-4 py-6">
              <!--  -->
              <div
                v-for="(childMenu, index2) in menu.childrens.slice(0, 5)"
                :key="index2"
                class="w-1/5"
              >
                <!--  -->
                <NuxtLink
                  class="text-sm hover:text-secondary"
                  :to="childMenu.url"
                >
                  {{ childMenu.text }}
                </NuxtLink>
                <!--  -->

                <!--  -->
                <div
                  v-if="childMenu.childrens && childMenu.childrens.length > 0"
                  class="flex flex-col gap-2"
                >
                  <!--  -->
                  <div
                    v-for="(subChildMenu, index3) in childMenu.childrens"
                    :key="index3"
                  >
                    <!--  -->
                    <nuxt-link
                      class="text-sm hover:text-secondary"
                      :to="subChildMenu.url"
                    >
                      <!--  -->
                      {{ subChildMenu.text }}
                      <!--  -->
                    </nuxt-link>
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
        <!-- Sub Child -->
      </div>
      <!--  -->
    </div>
    <!--  -->
  </nav>
  <!--  -->
</template>

<style scoped>
[dir='rtl'] .mr-16-ar {
  margin-left: 4rem;
  margin-right: 0;
}

::placeholder {
  color: var(--search-text-color);
}

[dir='rtl'] .col-width-ar {
  right: 100%;
  left: 0px;
}

[dir='rtl'] .cart-direction {
  left: 0px;
  right: auto;
}

.col-width {
  width: 14.5rem;
}

@media (min-width: 1120px) {
  .col-width {
    width: 15rem;
  }
}

@media (min-width: 1150px) {
  .col-width {
    width: 16rem;
  }
}

@media (min-width: 1200px) {
  .col-width {
    width: 16.5rem;
  }
}
</style>

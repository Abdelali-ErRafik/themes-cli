<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMainStore } from '@/stores/main';
import { useNuxtApp } from '#app';

const { $settings } = useNuxtApp();
const $store = useMainStore();

const displayCollMenu = ref(false);

const subItems = ref(null);
const activeId = ref(null);

const header = $settings.sections.header;

const mobileLogo = ref(header.logo.mobile);

const bgColor = ref(header.colors.background_color);
const textColor = ref(header.colors.text_color);

const storeLanguages = ref($settings.store_languages);
const storeCurrencies = ref($settings.store_currencies);

const headerMenu = computed(() => header.menu);
const collectionsMenu = ref(header.collections.menu);

const dropdownMenus = computed(() => {
  return [
    {
      _id: 'lang',
      text: $store.language.code,
      active: header.language.active,
      childrens: storeLanguages.value.map((l: any) => ({
        _id: l.code,
        text: l.name,
        url: `?lang=${l.code}`,
      })),
    },
    {
      _id: 'currency',
      text: $store.currency.code,
      active: header.currency.active,
      childrens: storeCurrencies.value.map((c: any) => ({
        _id: c.code,
        text: c.name,
        url: `?cur=${c.code}`,
      })),
    },
  ].filter((item) => item.active);
});

// Methods
const showCollectionsMenu = () => {
  displayCollMenu.value = !displayCollMenu.value;
};

const setActive = (id: string, idRet: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.classList.toggle('active-subcollections');
  }

  const icon = document.getElementById(idRet);
  if (icon) {
    icon.classList.toggle('active-svg');
  }
};
</script>

<template>
  <!--  -->
  <transition name="fade">
    <!-- -->
    <div v-if="$store.showHeaderMenu" class="fixed inset-0 z-20 flex">
      <!--  -->
      <div
        class="fixed inset-0 bg-black opacity-50 cursor-pointer"
        @click="$store.showHeaderMenu = false"
      ></div>
      <!--  -->

      <!--  -->
      <div
        style="width: calc(100% - 3rem)"
        class="overflow-y-auto sidebar header-bg header-text-color scroll-y header-color"
        :style="{ backgroundColor: bgColor, color: textColor }"
      >
        <!--  -->

        <!--  -->
        <div class="flex items-center justify-between w-full pt-4 pb-2 px-4">
          <!--  -->
          <HeaderLogo
            :mobile-logo="mobileLogo"
            :default-logo="$store.defaults.logo"
          />
          <!--  -->

          <!--  -->
          <button
            class="text-white hover:text-secondary"
            solar:hamburger-menu-linear
            aria-label="Close button"
            @click="$store.showHeaderMenu = false"
          >
            <!--  -->
            <Icon
              name="material-symbols:close-rounded"
              class="text-3xl lg:text-3xl translate"
            />
            <!--  -->
          </button>
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div v-if="collectionsMenu" class="py-2 px-4">
          <!--  -->
          <div
            class="flex gap-4 items-center w-full h-12 px-5 text-white cursor-pointer text-sm font-bold bg-secondary rounded-sm hover:opacity-80 transition-all duration-300"
            @click="showCollectionsMenu()"
          >
            <!--  -->
            <Icon
              name="solar:hamburger-menu-linear"
              class="text-3xl lg:text-3xl translate"
            />
            <!--  -->

            <!--  -->
            <span>{{ header.collections.text }}</span>
            <!--  -->
          </div>
          <!--  -->

          <!--  -->
          <transition name="slide-down">
            <!--  -->
            <div
              v-if="displayCollMenu == true && collectionsMenu.length > 0"
              class="pb-4 mt-4 border-b border-third"
            >
              <!--  -->
              <div
                v-for="(item, index) in collectionsMenu"
                :key="index"
                class="flex flex-col"
              >
                <!--  -->
                <div
                  class="flex items-center justify-between py-3 cursor-pointer hover:text-secondary"
                  :class="activeId == item._id ? 'text-secondary' : ''"
                  @click="activeId = activeId != item._id ? item._id : null"
                >
                  <!--  -->
                  <NuxtLink class="text-sm" :to="item.url">{{
                    item.name
                  }}</NuxtLink>
                  <!--  -->

                  <!--  -->
                  <Icon
                    v-if="item.childrens.length > 0"
                    name="solar:alt-arrow-down-linear"
                    class="text-xl translate"
                    :class="[
                      activeId == item._id
                        ? 'rotate-180 transition-all duration-300'
                        : '',
                    ]"
                  />
                  <!--  -->
                </div>
                <!--  -->

                <!--  -->
                <transition name="slide-down">
                  <!--  -->
                  <div v-if="item._id == activeId">
                    <!--  -->
                    <div v-for="(coll, index2) in item.childrens" :key="index2">
                      <!--  -->
                      <div
                        class="flex items-center justify-between py-3 cursor-pointer hover:text-secondary"
                        :class="
                          subItems == coll.collectionId ? 'text-secondary' : ''
                        "
                        @click="
                          subItems =
                            subItems != coll.collectionId
                              ? coll.collectionId
                              : null
                        "
                      >
                        <!--  -->
                        <NuxtLink class="text-sm" :to="coll.url">
                          {{ coll.name }}
                        </NuxtLink>
                        <!--  -->

                        <!--  -->
                        <Icon
                          v-if="coll.childrens.length > 0"
                          name="solar:alt-arrow-down-linear"
                          class="text-xl translate"
                          :class="[
                            subItems == coll.collectionId
                              ? 'rotate-180 transition-all duration-300'
                              : '',
                          ]"
                        />
                        <!--  -->
                      </div>
                      <!--  -->

                      <!--  -->
                      <transition name="slide-down">
                        <!--  -->
                        <div v-if="coll.collectionId == subItems">
                          <!--  -->
                          <div
                            v-if="coll.childrens && coll.childrens.length > 0"
                          >
                            <!--  -->
                            <div
                              v-for="(child, index3) in coll.childrens"
                              :key="index3"
                            >
                              <!--  -->
                              <div
                                class="flex items-center justify-between py-3 cursor-pointer px-7 hover:text-secondary"
                              >
                                <!--  -->
                                <nuxt-link class="text-sm" :to="child.url">
                                  {{ child.name }}
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
                      </transition>
                      <!--  -->
                    </div>
                  </div>
                  <!--  -->
                </transition>
                <!--  -->
              </div>
              <!--  -->
            </div>
            <!--  -->
          </transition>
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div v-if="headerMenu" class="py-2 px-4">
          <!--  -->
          <div
            v-for="(menu, i) in headerMenu.items"
            :key="i"
            class="flex flex-col border-t border-third"
          >
            <!--  -->
            <div
              class="flex items-center justify-between py-3 cursor-pointer px-7 hover:text-secondary"
              :class="activeId == menu._id ? 'text-secondary' : ''"
              @click="activeId = activeId != menu._id ? menu._id : null"
            >
              <!--  -->
              <NuxtLink class="font-bold text-sm" :to="menu.url">{{
                menu.text
              }}</NuxtLink>
              <!--  -->

              <!--  -->
              <Icon
                v-if="menu.childrens && menu.childrens.length > 0"
                name="solar:alt-arrow-down-linear"
                class="text-xl translate"
                :class="[
                  activeId == menu._id
                    ? 'rotate-180 transition-all duration-300'
                    : '',
                ]"
              />
              <!--  -->
            </div>
            <!--  -->

            <!--  -->
            <transition name="slide-down">
              <!--  -->
              <div v-if="menu._id == activeId">
                <!--  -->
                <div v-for="(item, index) in menu.childrens" :key="index">
                  <!--  -->
                  <div
                    :id="i + 'ret'"
                    class="flex items-center justify-between py-3 cursor-pointer px-7 hover:text-secondary"
                    @click="setActive(i + 'fit', i + 'ret')"
                  >
                    <!--  -->
                    <NuxtLink class="font-bold text-sm" :to="item.url">
                      {{ item.text }}
                    </NuxtLink>
                    <!--  -->

                    <!--  -->
                    <Icon
                      v-if="item.childrens.length > 0"
                      name="solar:alt-arrow-down-linear"
                      class="text-xl translate"
                    />
                    <!--  -->
                  </div>
                  <!--  -->

                  <!--  -->
                  <div
                    :id="i + 'fit'"
                    class="relative overflow-hidden transition-all duration-300 max-h-0"
                  >
                    <!--  -->
                    <div v-if="item.childrens && item.childrens.length > 0">
                      <!--  -->
                      <div
                        v-for="(child, ii) in item.childrens"
                        :key="ii"
                        class=""
                      >
                        <!--  -->
                        <div
                          class="flex items-center justify-between py-3 cursor-pointer px-7 hover:text-secondary"
                        >
                          <!--  -->
                          <nuxt-link class="font-bold text-sm" :to="child.url">
                            {{ child.text }}
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
              </div>
              <!--  -->
            </transition>
            <!--  -->
          </div>
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div
          v-if="header.language.active || header.currency.active"
          class="border-b border-third px-4"
        >
          <!--  -->
          <div
            v-for="(item, i) in dropdownMenus"
            :key="i"
            class="flex flex-col border-t border-third"
          >
            <!--  -->
            <div
              class="flex items-center justify-between py-3 cursor-pointer px-7 hover:text-secondary"
              :class="activeId == item._id ? 'text-secondary' : ''"
              @click="activeId = activeId != item._id ? item._id : null"
            >
              <!--  -->
              <span class="font-bold text-sm">{{ item.text }}</span>
              <!--  -->

              <!--  -->
              <Icon
                v-if="item.childrens.length > 0"
                name="solar:alt-arrow-down-linear"
                class="text-xl translate"
                :class="[
                  activeId == item._id
                    ? 'rotate-180 transition-all duration-300'
                    : '',
                ]"
              />
              <!--  -->
            </div>
            <!--  -->

            <!--  -->
            <transition name="slide-down">
              <!--  -->
              <div v-if="item._id == activeId">
                <!--  -->
                <div v-for="(item2, index) in item.childrens" :key="index">
                  <!--  -->
                  <div
                    class="flex items-center py-3 cursor-pointer px-7 hover:text-secondary"
                  >
                    <!--  -->
                    <a class="font-bold text-sm" :href="item2.url">
                      {{ item2.text }}
                    </a>
                    <!--  -->
                  </div>
                  <!--  -->

                  <!--  -->
                  <div v-for="(child, ii) in item2.childrens" :key="ii">
                    <!--  -->
                    <div
                      class="flex items-center justify-between py-3 cursor-pointer px-7 hover:text-secondary"
                    >
                      <!--  -->
                      <a class="font-bold text-sm" :href="child.url">
                        {{ child.text }}
                      </a>
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
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->
  </transition>
  <!--  -->
</template>

<style scoped>
.sidebar {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
}

[dir='rtl'] .sidebar {
  right: 0px;
  left: auto;
}

.active-subcollections {
  max-height: 500px;
}

.active-subcollections {
  max-height: 500px;
}

.active-svg {
  color: var(--secondary-color);
}

.active-svg svg {
  transform: rotate(180deg);
}
</style>

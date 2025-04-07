<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  collectionsMenu: {
    type: Object,
    required: true,
  },
  text: {
    type: String,
    required: true,
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

const subItems = ref(null);
const activeID = ref(null);
const showMenu = ref(false);
</script>

<template>
  <!--  -->
  <nav v-if="props.collectionsMenu" class="relative">
    <!--  -->
    <div
      class="flex gap-2 items-center text-base font-normal cursor-pointer rounded-sm bg-secondary text-white px-4 py-1 hover:opacity-80 transition-all duration-300"
      @click="showMenu = !showMenu"
    >
      <!--  -->
      <Icon name="solar:hamburger-menu-linear" class="text-3xl translate" />
      <!--  -->

      <!--  -->
      <span class="text-sm font-medium">{{ props.text }}</span>
      <!--  -->
    </div>
    <!--  -->

    <transition name="fade">
      <!--  -->
      <div
        v-if="showMenu == true && props.collectionsMenu.length > 0"
        class="w-full absolute z-10 top-full border border-third"
        :style="{ backgroundColor: props.bgColor, color: props.textColor }"
      >
        <!--  -->
        <div class="flex flex-col gap-4 px-4 py-6">
          <!--  -->
          <div
            v-for="(coll, index) in props.collectionsMenu"
            :key="index"
            @mouseover="activeID = activeID = coll._id"
            @mouseleave="activeID = activeID = null"
          >
            <!-- Main Child -->
            <div
              class="flex items-center justify-between cursor-pointer text-xs hover:text-secondary"
            >
              <!--  -->
              <NuxtLink class="text-sm" :to="coll.slug">
                {{ coll.name }}
              </NuxtLink>
              <!--  -->

              <!--  -->
              <Icon
                v-if="coll.childrens.length > 0"
                name="solar:alt-arrow-down-linear"
                class="text-xl translate"
                :class="[
                  activeID == coll._id
                    ? 'rotate-180 transition-all duration-300'
                    : '',
                ]"
              />
              <!--  -->
            </div>
            <!-- Main Child -->

            <!-- Sub subChildCollection -->
            <transition name="fade">
              <!--  -->
              <div
                v-if="coll._id == activeID && coll.childrens.length > 0"
                :style="{
                  backgroundColor: props.bgColor,
                  color: props.textColor,
                }"
                class="w-full absolute top-0 left-0 right-0 z-20 border border-third"
              >
                <!--  -->
                <div class="flex flex-col gap-4 px-4 py-6">
                  <!--  -->
                  <div
                    v-for="(childColl, index2) in coll.childrens"
                    :key="index2"
                    @mouseover="subItems = subItems = childColl.collectionId"
                    @mouseleave="subItems = subItems = null"
                  >
                    <!--  -->
                    <div
                      class="flex items-center justify-between cursor-pointer text-xs hover:text-secondary"
                    >
                      <!--  -->
                      <NuxtLink class="text-sm" :to="childColl.slug">
                        {{ childColl.name }}
                      </NuxtLink>
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
        </div>
      </div>
    </transition>
  </nav>
  <!--  -->
</template>

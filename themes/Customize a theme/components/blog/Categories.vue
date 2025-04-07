<script setup type="ts">
import { ref } from 'vue';

const props = defineProps({
  sidebar: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  setParams: {
    type: Function,
    required: true,
  },
});

const isOpen = ref(true);

const toggleCategories = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <!--  -->
  <div
    v-if="sidebar.categories.active"
    class="border border-third rounded-lg overflow-hidden"
  >
    <!--  -->
    <div
      v-if="sidebar.categories.title.length > 0"
      class="h-10 flex items-center justify-between bg-third px-4 cursor-pointer hover:text-secondary transition-color duration-300"
      @click="toggleCategories"
    >
      <!--  -->
      <h2 class="font-medium tracking-normal text-sm capitalize">
        {{ sidebar.categories.title }}
      </h2>
      <!--  -->

      <!--  -->
      <Icon
        :name="'solar:alt-arrow-down-linear'"
        :class="[
          'text-xl transition-transform duration-300',
          { 'rotate-180': isOpen },
        ]"
      />
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <transition name="slide-down">
      <!--  -->
      <div v-if="isOpen" class="flex flex-col gap-3 px-4 py-3">
        <!--  -->
        <div v-for="(item, i) in categories" :key="i">
          <!--  -->
          <label
            class="relative flex items-center w-full gap-2 cursor-pointer hover:text-primary hover:bg-third"
          >
            <!--  -->
            <input
              :id="item.slug"
              hidden
              type="checkbox"
              class="absolute top-0 left-0 form-checkbox"
              style="z-index: -1"
              @change="setParams($event, 'categories.slug-in', item.slug)"
            />
            <!--  -->
            <div
              class="w-4 h-4 flex justify-center items-center bg-white border border-third rounded-sm"
            >
              <!--  -->
              <Icon
                name="material-symbols:check-rounded"
                class="hidden text-xl translate text-white"
              />
              <!--  -->
            </div>
            <!--  -->

            <!--  -->
            <label
              class="capitalize cursor-pointer text-sm text-gray"
              :for="item.slug"
            >
              {{ item.name }}
            </label>
            <!--  -->
          </label>
          <!--  -->
        </div>
        <!--  -->
      </div>
      <!--  -->
    </transition>
    <!--  -->
  </div>
  <!--  -->
</template>

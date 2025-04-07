<script setup lang="ts">
const props: any = defineProps({
  sidebar: {
    type: Object,
    required: true,
  },
  collections: {
    type: Array,
    required: true,
  },
  params: {
    type: Object,
    required: true,
  },
  setParams: {
    type: Function,
    required: true,
  },
});

const isOpen = ref(false);

const toggleCollections = () => {
  isOpen.value = !isOpen.value;
};

const setActive = (contentId: any, arrowId: any) => {
  const content = document.getElementById(contentId);
  const arrow = document.getElementById(arrowId);

  if (content && arrow) {
    if (content.style.maxHeight === '0px' || !content.style.maxHeight) {
      content.style.maxHeight = content.scrollHeight + 'px';
      arrow.style.transform = 'rotate(180deg)';
    } else {
      content.style.maxHeight = '0px';
      arrow.style.transform = 'rotate(0deg)';
    }
  }
};
</script>

<template>
  <!--  -->
  <div
    v-if="
      props.sidebar.collections.active &&
      props.collections &&
      props.collections.length > 0
    "
    class="border border-third rounded-lg overflow-hidden"
  >
    <!--  -->
    <div
      v-if="sidebar.collections.title.length > 0"
      class="h-10 flex items-center justify-between bg-third px-4 cursor-pointer hover:text-secondary transition-color duration-300"
      @click="toggleCollections"
    >
      <!--  -->
      <h2 class="font-medium tracking-normal text-sm capitalize">
        {{ sidebar.collections.title }}
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
        <template v-for="(item, i) in props.collections" :key="i">
          <!--  -->
          <div v-if="item.childrens && item.childrens.length > 0">
            <!--  -->
            <div
              class="flex items-center justify-between w-full cursor-pointer"
            >
              <!--  -->
              <SidebarCheckbox
                :item="item"
                :params="props.params"
                :set-params="props.setParams"
              />
              <!--  -->

              <!--  -->
              <div
                :id="i + 'ret'"
                class="transition-all duration-300 svg-display"
                @click="setActive(i + 'fit', i + 'ret')"
              >
                <!--  -->
                <div class="transition-all duration-300 chevron-rotate">
                  <!--  -->
                  <Icon
                    name="solar:alt-arrow-down-linear"
                    class="text-xl translate"
                  />
                  <!--  -->
                </div>
                <!--  -->
              </div>
              <!--  -->
            </div>
            <!--  -->

            <!--  -->
            <div
              v-if="item.childrens.length"
              :id="i + 'fit'"
              class="relative overflow-hidden transition-all duration-300 max-h-0"
            >
              <!--  -->
              <div class="flex flex-col gap-3 mt-3 ml-8">
                <!--  -->
                <template v-for="(child, key) in item.childrens" :key="key">
                  <!--  -->
                  <SidebarChild
                    :item="child"
                    :params="props.params"
                    :parent-index="i"
                    :current-key="key"
                    :set-params="props.setParams"
                    @set-active="setActive"
                  />
                </template>
                <!--  -->
              </div>
              <!--  -->
            </div>
            <!--  -->
          </div>
          <!--  -->

          <!--  -->
          <SidebarCheckbox
            v-else
            :item="item"
            :params="props.params"
            :set-params="props.setParams"
          />
          <!--  -->
        </template>
        <!--  -->
      </div>
      <!--  -->
    </transition>
  </div>
  <!--  -->
</template>

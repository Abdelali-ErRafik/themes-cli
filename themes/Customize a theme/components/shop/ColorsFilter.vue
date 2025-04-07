<script setup lang="ts">
const props: any = defineProps({
  sidebar: {
    type: Object,
    required: true,
  },
  filters: {
    type: Object,
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

const toggleColors = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <!--  -->
  <div
    v-if="
      props.sidebar.colors.active &&
      props.filters &&
      props.filters.colors &&
      props.filters.colors.length > 0
    "
    class="border border-third rounded-lg overflow-hidden"
  >
    <!--  -->
    <div
      v-if="sidebar.colors.title.length > 0"
      class="h-10 flex items-center justify-between bg-third px-4 cursor-pointer hover:text-secondary transition-color duration-300"
      @click="toggleColors"
    >
      <!--  -->
      <h2 class="font-medium tracking-normal text-sm capitalize">
        {{ sidebar.colors.title }}
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
        <div v-for="(item, i) in props.filters.colors" :key="i">
          <!--  -->
          <label
            class="relative flex items-center w-full gap-4 cursor-pointer hover:bg-third"
          >
            <!--  -->
            <input
              :id="item.value1"
              hidden
              type="checkbox"
              class="absolute top-0 left-0 form-checkbox"
              style="z-index: -1"
              :checked="
                props.params['options.values.value1'] &&
                props.params['options.values.value1'].indexOf(item.value1) >= 0
              "
              @change="
                props.setParams($event, 'options.values.value1', item.value1)
              "
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
              :for="item.value1"
              :aria-label="item.value1"
            >
              {{ item.value1 }}
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

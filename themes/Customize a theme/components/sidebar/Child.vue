<template>
  <!--  -->
  <div>
    <!--  -->
    <div
      v-if="item.childrens && item.childrens.length > 0"
      class="flex items-center justify-between w-full cursor-pointer"
    >
      <!--  -->
      <SidebarCheckbox :item="item" :params="params" :set-params="setParams" />
      <!--  -->

      <!--  -->
      <div
        :id="currentKey + `reti-${parentIndex}`"
        class="transition-all duration-300 svg-display"
        @click="
          $emit(
            'set-active',
            currentKey + `fiti-${parentIndex}`,
            currentKey + `reti-${parentIndex}`
          )
        "
      >
        <!--  -->
        <div class="transition-all duration-300 chevron-rotate">
          <!--  -->
          <Icon name="solar:alt-arrow-down-linear" class="text-xl translate" />
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
      :params="params"
      :set-params="setParams"
    />
    <!--  -->

    <!--  -->
    <div
      v-if="item.childrens && item.childrens.length"
      :id="currentKey + `fiti-${parentIndex}`"
      class="relative overflow-hidden transition-all duration-300 max-h-0"
    >
      <!--  -->
      <div class="flex flex-col gap-3 mt-3 ml-8">
        <!--  -->
        <template v-for="(child, index) in item.childrens" :key="index">
          <!--  -->
          <SidebarChild
            :item="child"
            :params="params"
            :parent-index="parentIndex"
            :current-key="index"
            :set-params="setParams"
            @set-active="$emit('set-active', $1, $2)"
          />
        </template>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  params: {
    type: Object,
    required: true,
  },
  parentIndex: {
    type: [Number, String],
    required: true,
  },
  currentKey: {
    type: [Number, String],
    required: true,
  },
  setParams: {
    type: Function,
    required: true,
  },
});
</script>

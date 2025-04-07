<script setup lang="ts">
const props = defineProps({
  item: {
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

const isChecked = computed(
  () =>
    props.params['collections.slug-in'] &&
    props.params['collections.slug-in'].includes(props.item.slug)
);
</script>

<template>
  <!--  -->
  <label
    class="relative flex items-center w-full gap-4 cursor-pointer hover:bg-third"
  >
    <!--  -->
    <input
      :id="item.slug"
      hidden
      type="checkbox"
      class="absolute top-0 left-0 form-checkbox"
      style="z-index: -1"
      :checked="isChecked"
      @change="setParams($event, 'collections.slug-in', item.slug)"
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
      >{{ item.name }}</label
    >
    <!--  -->
  </label>
  <!--  -->
</template>

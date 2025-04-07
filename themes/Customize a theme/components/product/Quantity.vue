<script setup lang="ts">
const props: any = defineProps({
  quantity: Object,
});

const emit = defineEmits(['selected']);

const value = ref(props.quantity.value || props.quantity.default || 1);

watch(value, (val) => {
  if (val > props.quantity.instock) value.value = props.quantity.instock;
  if (val < props.quantity.min) value.value = props.quantity.default;
  if (isNaN(val)) value.value = props.quantity.default;
  emit('selected', value.value);
});

const inc = (inc: any) => {
  value.value =
    Number(value.value) + Number(props.quantity.increment) * Number(inc);
};
</script>

<template>
  <!--  -->
  <div
    class="flex items-center bg-white border border-third rounded-lg overflow-hidden"
  >
    <!--  -->
    <button
      class="h-10 w-14 flex items-center justify-center hover:bg-secondary hover:text-white"
      :class="value > props.quantity.min ? 'bg-gray' : 'bg-primary text-white '"
      @click="inc(-1)"
    >
      <!--  -->
      <Icon name="iconoir:minus" class="text-xl translate" />
      <!--  -->
    </button>

    <!--  -->
    <div class="w-full flex items-center justify-center">
      <!--  -->
      <label class="w-full relative">
        <!--  -->
        <span class="pr-2 text-sm font-medium text-center">{{ value }}</span>
        <!--  -->

        <!--  -->
        <input
          v-model="value"
          :min="props.quantity.min"
          :max="props.quantity.max"
          class="absolute inset-0 w-full h-full text-sm text-center bg-opacity-0 outline-none"
          type="number"
        />
        <!--  -->
      </label>
      <!--  -->

      <!--  -->
      <div v-if="props.quantity.unit" class="flex items-center justify-center">
        <!--  -->
        <span class="text-sm font-medium"> {{ props.quantity.unit }} </span>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <button
      class="h-10 w-14 flex items-center justify-center hover:bg-secondary hover:text-white"
      :class="
        value < props.quantity.instock ? 'bg-gray' : 'bg-primary text-white'
      "
      @click="inc(1)"
    >
      <!--  -->
      <Icon name="iconoir:plus" class="text-xl translate" />
      <!--  -->
    </button>
    <!--  -->
  </div>
  <!--  -->
</template>

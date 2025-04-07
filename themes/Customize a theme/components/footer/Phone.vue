<script setup>
defineProps({
  callUs: {
    type: Object,
    required: true,
  },
  textColor: {
    type: String,
    default: '#000000',
  },
});
</script>

<template>
  <!--  -->
  <div class="flex items-center justify-center">
    <!--  -->
    <a class="flex items-center gap-4" :href="'tel:' + callUs.number">
      <!--  -->
      <span
        class="flex items-center justify-center p-3 border rounded-full"
        :style="{ borderColor: textColor }"
      >
        <!--  -->
        <Icon name="solar:phone-rounded-linear" class="text-2xl translate" />
        <!--  -->
      </span>
      <!--  -->
      <!--  -->
      <div class="flex flex-col">
        <!--  -->
        <span style="direction: ltr" class="mb-1 text-xl font-medium">{{
          callUs.number
        }}</span>
        <!--  -->
        <!--  -->
        <span v-if="callUs.work_time.length > 0" class="text-xs opacity-60">{{
          callUs.work_time
        }}</span>
        <!--  -->
      </div>
      <!--  -->
    </a>
    <!--  -->
  </div>
  <!--  -->
</template>

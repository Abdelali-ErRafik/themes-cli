<template>
  <!--  -->
  <div
    class="flex flex-col w-full gap-4 px-4 menu sm:w-1/2 lg:w-auto lg:flex-1"
  >
    <!--  -->
    <h1 class="font-medium text-sm">{{ about.store_name }}</h1>
    <!--  -->

    <!--  -->
    <div class="flex flex-col gap-3 text-sm">
      <!--  -->
      <div v-if="about.text" v-html="about.text"></div>
      <!--  -->

      <!-- about.location_url -->
      <span
        v-if="about.location"
        class="flex items-center gap-2 hover:text-secondary"
      >
        <!--  -->
        <Icon name="solar:map-point-wave-linear" class="text-2xl translate" />
        <!--  -->

        <!--  -->
        <span>{{ about.location }}</span>
        <!--  -->
      </span>
      <!--  -->

      <!--  -->
      <span
        v-if="about.gmail"
        class="flex items-center gap-2 hover:text-secondary"
      >
        <!--  -->
        <Icon name="oui:email" class="text-xl translate" />
        <!--  -->

        <!--  -->
        <a :href="'mailto:' + about.gmail">{{ about.gmail }}</a>
        <!--  -->
      </span>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

<script setup>
defineProps({
  about: {
    type: Object,
    required: true,
  },
});
</script>

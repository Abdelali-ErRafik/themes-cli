<script setup lang="ts">
const props: any = defineProps({
  sidebar: {
    type: Object,
    required: true,
    validator(value: any) {
      return 'active' in value;
    },
  },
  total: {
    type: Number,
    default: 0,
  },
  articlesText: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <!--  -->
  <div
    v-if="props.sidebar.active"
    class="w-fit md:min-w-48 h-10 hidden lg:flex gap-2 items-center justify-center rounded-lg bg-third px-4 hover:scale-105 hover:opacity-90 transition-all duration-300"
  >
    <!--  -->
    <span class="text-sm font-medium">
      <!--  -->
      <span v-if="props.total" class="font-bold text-secondary">
        {{ `( ${props.total} )` }}
      </span>
      <!--  -->
      {{ props.articlesText }}
      <!--  -->
    </span>
    <!--  -->
  </div>
  <!--  -->
</template>

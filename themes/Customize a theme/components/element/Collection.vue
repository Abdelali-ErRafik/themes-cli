<script setup lang="ts">
const props: any = defineProps({
  item: {
    type: Object,
    required: true,
  },
  page: {
    type: String,
    required: false,
    default: '',
  },
});

const { $settings }: any = useNuxtApp();
const collections = $settings.sections.collections;
</script>

<template>
  <!--  -->
  <div class="group flex flex-col items-center gap-4">
    <!--  -->
    <NuxtLink
      :to="
        props.item.childrens.length > 0
          ? `/collections/${props.item.slug}`
          : `/shop/${props.item.slug}`
      "
      class="relative block overflow-hidden"
    >
      <!--  -->
      <div class="relative overflow-hidden rounded-full">
        <!--  -->
        <div class="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
          <!--  -->
          <ImageLoader
            img-class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            :src="props.item.image ? props.item.image.src : null"
            :alt="props.item.name"
          />
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div
          class="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"
        />
        <!--  -->

        <!--  -->
        <div
          v-if="!props.item.image"
          class="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"
        />
        <!--  -->
      </div>
      <!--  -->
    </NuxtLink>
    <!--  -->

    <!--  -->
    <NuxtLink
      :to="
        props.item.childrens.length > 0
          ? `/collections/${props.item.slug}`
          : `/shop/${props.item.slug}`
      "
      class="flex flex-col gap-1 text-center group-hover:text-primary-600 transition-colors duration-200"
    >
      <!--  -->
      <h3
        class="text-sm md:text-base font-bold truncate"
        :title="props.item.name"
      >
        {{ props.item.name }}
      </h3>
      <!--  -->

      <!--  -->
      <p v-if="props.item.childrens?.length > 0" class="text-xs text-third">
        {{ `${props.item.childrens.length} ${collections.count_text}` }}
      </p>
      <!--  -->
    </NuxtLink>
    <!--  -->
  </div>
  <!--  -->
</template>

<style scoped>
@keyframes subtle-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.group:hover img {
  animation: subtle-bounce 1s ease infinite;
}
</style>

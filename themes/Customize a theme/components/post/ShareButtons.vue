<script setup lang="ts">
import { computed } from 'vue';

const props: any = defineProps({
  post: {
    type: Object,
    required: true,
  },
  socialMedia: {
    type: Array,
    required: true,
  },
});

const filteredSocialMedia = computed(() =>
  props.socialMedia.filter((s: any) => props.post.share_buttons[s.name])
);
</script>

<template>
  <!--  -->
  <div v-if="post.share_buttons.active" class="flex flex-col gap-4">
    <!--  -->
    <div class="flex items-center justify-center md:justify-start">
      <!--  -->
      <h3
        v-if="post.share_buttons.title.length > 0"
        class="text-lg font-black text-primary"
      >
        {{ post.share_buttons.title }}
      </h3>
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <div class="flex items-center justify-center md:justify-start gap-4">
      <!--  -->
      <a
        v-for="item in filteredSocialMedia"
        :key="item.name"
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="w-10 h-10 flex items-center justify-center p-2 rounded-full hover:opacity-90 hover:scale-105 transition-all duration-300"
        :style="{
          backgroundColor: item.color,
        }"
      >
        <!--  -->
        <Icon :name="item.image" :class="item.size" class="text-white" />
        <!--  -->
      </a>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
  footer: {
    type: Object,
    required: true,
  },
});

const socialMedia = ref([
  {
    name: 'facebook',
    image: 'hugeicons:facebook-02',
  },
  {
    name: 'twitter',
    image: 'hugeicons:new-twitter',
  },
  {
    name: 'instagram',
    image: 'hugeicons:instagram',
  },
  {
    name: 'youtube',
    image: 'hugeicons:youtube',
  },
  {
    name: 'linkedin',
    image: 'hugeicons:linkedin-02',
  },
  {
    name: 'whatsapp',
    image: 'hugeicons:whatsapp',
  },
  {
    name: 'snapchat',
    image: 'hugeicons:snapchat',
  },
  {
    name: 'tiktok',
    image: 'ic:baseline-tiktok',
  },
]);

const filteredSocialMedia = computed(() =>
  socialMedia.value.filter((s) => props.footer.social_media[s.name])
);
</script>

<template>
  <!--  -->
  <div class="flex flex-col gap-2">
    <!--  -->
    <h3
      v-if="props.footer.social_media.title.length > 0"
      class="flex items-center text-base font-medium"
    >
      {{ props.footer.social_media.title }}
    </h3>
    <!--  -->

    <!--  -->
    <div class="flex items-center gap-2">
      <!--  -->
      <a
        v-for="item in filteredSocialMedia"
        :key="item.name"
        :href="props.footer.social_media[item.name]"
        target="_blank"
        rel="noopener noreferrer"
        class="w-10 h-10 flex items-center justify-center p-2 border-2 cursor-pointer rounded-full hover:text-secondary hover:opacity-90 hover:scale-105 transition-all duration-300"
      >
        <!--  -->
        <Icon :name="item.image" class="text-3xl translate" />
        <!--  -->
      </a>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

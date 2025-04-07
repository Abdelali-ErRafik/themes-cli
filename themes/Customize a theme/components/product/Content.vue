<script setup lang="ts">
import { ref } from 'vue';
import { useMainStore } from '@/stores/main';

const $store = useMainStore();

const props: any = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    required: true,
  },
  product: {
    type: Object,
    required: true,
  },
});

const description = ref(true);
const reviews = ref(false);

const switchToDescription = () => {
  description.value = true;
  reviews.value = false;
};

const switchToReviews = () => {
  description.value = false;
  reviews.value = true;
};

const hasReviewsApp = computed(() =>
  $store.apps.find((a: any) => a.placement?.indexOf('REPLACE_REVIEWS') >= 0)
);

const showReviewsTab = computed(() => props.product.reviews.active);
</script>

<template>
  <!--  -->
  <div v-if="!props.loading && item">
    <!--  -->
    <div class="flex gap-4 items-center border-b border-third pt-1 px-4">
      <!--  -->
      <div
        class="leading-10 border-b-4 border-black hover:text-secondary cursor-pointer transition-all duration-300"
        :class="
          description ? 'text-secondary border-secondary' : 'border-transparent'
        "
        @click="switchToDescription"
      >
        <!--  -->
        <span class="text-base font-medium">
          {{ props.product.description.description_name }}
        </span>
        <!--  -->
      </div>
      <!--  -->

      <!--  -->
      <div
        v-if="showReviewsTab"
        class="leading-10 border-b-4 border-black hover:text-secondary cursor-pointer transition-all duration-300"
        :class="
          reviews ? 'text-secondary border-secondary' : 'border-transparent'
        "
        @click="switchToReviews"
      >
        <!--  -->
        <span class="text-base font-medium">
          {{ props.product.reviews.title }} ({{
            props.item.review.reviews.length
          }})
        </span>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <div class="p-4">
      <!--  -->
      <div v-if="description">
        <!--  -->
        <h2
          id="description"
          class="text-[15px] leading-7"
          v-html="props.item.html"
        ></h2>
        <!--  -->

        <!--  -->
        <div
          v-if="props.item.html.length === 0"
          class="capitalize text-center text-base"
        >
          {{ props.product.description.description_empty_text }}
        </div>
        <!--  -->
      </div>
      <!--  -->

      <!--  -->
      <div v-if="reviews">
        <!--  -->
        <div v-if="props.item && props.product.reviews.active" class="reviews">
          <!--  -->
          <ProductReviews v-if="!hasReviewsApp" :item="props.item" />
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <AppsLoader placement="REPLACE_REVIEWS" />
        <!--  -->

        <!--  -->
        <div
          v-if="props.item.review.reviews.length === 0"
          class="capitalize text-center text-base"
        >
          {{ props.product.reviews.reviews_empty_text }}
        </div>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

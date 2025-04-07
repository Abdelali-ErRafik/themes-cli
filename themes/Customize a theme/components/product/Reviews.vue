<script setup lang="ts">
import { ref, watch } from 'vue';
import { useMainStore } from '@/stores/main';
const { $storeino }: any = useNuxtApp();

const $store = useMainStore();

const props = defineProps({
  item: { type: Object, default: null },
});

const reviews: any = ref({ paginate: { page: 0 }, results: [] });
const loading = ref(true);

const fetchReviews = async () => {
  if (!props.item || !props.item._id) return;
  console.log('🚀 ~ fetchReviews ~ props.item._id:', props.item._id);

  try {
    const { data } = await $storeino.reviews.search({
      'product._id': props.item._id,
      page: reviews.value.paginate.page + 1,
    });
    console.log('🚀 ~ fetchReviews ~ data:', data);

    reviews.value = data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
  } finally {
    loading.value = false;
  }
};

watch(
  () => props.item,
  async (newItem) => {
    if (newItem && newItem._id) {
      loading.value = true;
      await fetchReviews();
    }
  },
  { immediate: true }
);
</script>

<template>
  <!--  -->
  <div v-if="props.item && props.item.review.reviews.length > 0">
    <!--  -->
    <div v-if="loading" class="flex items-center justify-center my-10">
      <LoaderGlobal></LoaderGlobal>
    </div>
    <!--  -->

    <!--  -->
    <div v-if="!loading" id="reviews" class="flex flex-col gap-4 services">
      <!--  -->
      <div
        v-for="(review, index) in reviews.results"
        :key="index"
        class="service"
      >
        <!--  -->
        <div class="flex gap-4">
          <!--  -->
          <div class="avatar">
            <!--  -->
            <ReviewsAvatar
              :name="`${review.customer.firstname} ${review.customer.lastname}`"
            />
            <!--  -->
          </div>
          <!--  -->

          <!--  -->
          <div class="flex flex-col gap-2">
            <!--  -->
            <span class="text-base font-medium capitalize">{{
              `${review.customer.firstname} ${review.customer.lastname}`
            }}</span>
            <!--  -->

            <!--  -->
            <div class="flex gap-0.5 items-center mb-1">
              <!--  -->
              <span
                v-for="(star, i) in 5"
                :key="i"
                class="bg-text-secondary"
                :class="
                  star <= review.rating
                    ? 'bg-reviews-active'
                    : 'bg-reviews-inactive'
                "
              >
                <!--  -->
                <svg
                  aria-label="star icon"
                  class="w-2.5 h-2.5"
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 -0.5 21 21"
                >
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-99.000000, -320.000000)"
                      fill="currentColor"
                    >
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        <path
                          id="star_favorite-[#1499]"
                          d="M60.556381,172.206 C60.1080307,172.639 59.9043306,173.263 60.0093306,173.875 L60.6865811,177.791 C60.8976313,179.01 59.9211306,180 58.8133798,180 C58.5214796,180 58.2201294,179.931 57.9282291,179.779 L54.3844766,177.93 C54.1072764,177.786 53.8038262,177.714 53.499326,177.714 C53.1958758,177.714 52.8924256,177.786 52.6152254,177.93 L49.0714729,179.779 C48.7795727,179.931 48.4782224,180 48.1863222,180 C47.0785715,180 46.1020708,179.01 46.3131209,177.791 L46.9903714,173.875 C47.0953715,173.263 46.8916713,172.639 46.443321,172.206 L43.575769,169.433 C42.4480682,168.342 43.0707186,166.441 44.6289197,166.216 L48.5916225,165.645 C49.211123,165.556 49.7466233,165.17 50.0227735,164.613 L51.7951748,161.051 C52.143775,160.35 52.8220755,160 53.499326,160 C54.1776265,160 54.855927,160.35 55.2045272,161.051 L56.9769285,164.613 C57.2530787,165.17 57.7885791,165.556 58.4080795,165.645 L62.3707823,166.216 C63.9289834,166.441 64.5516338,168.342 63.423933,169.433 L60.556381,172.206 Z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
                <!--  -->
              </span>
              <!--  -->
            </div>
            <!--  -->

            <!--  -->
            <div class="leading-7 tracking-normal text-xs">
              {{ review.content }}
            </div>
            <!--  -->

            <!--  -->
            <div
              v-if="review.images.length > 0"
              class="w-full mt-3 overflow-auto scroll-x"
            >
              <!--  -->
              <div class="flex gap-2">
                <!--  -->
                <ImageLoader
                  v-for="(image, index) in review.images"
                  :key="index"
                  width="100"
                  height="100"
                  img-class="w-12 h-12 cursor-pointer"
                  :src="image"
                  :alt="`${review.rating} stars - ${review.content}`"
                  @click="$store.fullImage = image"
                />
              </div>
              <!--  -->
            </div>
            <!--  -->
          </div>
          <!--  -->
        </div>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

<style scoped>
.services .service:not(:last-child) {
  padding-bottom: 1.25rem;
  border-bottom-width: 1px;
  border-color: rgb(209, 213, 219);
}
</style>

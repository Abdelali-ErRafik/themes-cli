<script setup lang="ts">
import { computed } from 'vue';

const props: any = defineProps({
  paginate: {
    type: Object,
    required: true,
  },
  pagination: {
    type: String,
    required: true,
  },
  getItems: {
    type: Function,
    required: true,
  },
});

const pages = computed(() => {
  const pagesArray = [];
  const currentPage = props.paginate.current_page;
  const lastPage = props.paginate.last_page;

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(lastPage, currentPage + 2);

  if (currentPage <= 3) {
    endPage = Math.min(5, lastPage);
  }
  if (currentPage >= lastPage - 2) {
    startPage = Math.max(1, lastPage - 4);
  }

  for (let i = startPage; i <= endPage; i++) {
    pagesArray.push(i);
  }

  return pagesArray;
});
</script>

<template>
  <!--  -->
  <div
    v-if="paginate.last_page > 0"
    class="flex flex-wrap items-center justify-center gap-2 mt-8 md:mt-10"
  >
    <!--  -->
    <button
      v-if="paginate.current_page > 1"
      aria-label="left_button"
      class="h-10 flex items-center justify-center gap-2 px-4 bg-secondary text-white border border-secondary rounded-full hover:bg-transparent hover:text-secondary transition-all duration-300"
      @click="getItems(paginate.current_page - 1)"
    >
      <!--  -->
      <Icon name="solar:alt-arrow-left-linear" class="text-xl translate" />
      <!--  -->

      <!--  -->
      <span class="text-sm font-medium">{{
        props.pagination.previous_text
      }}</span>
      <!--  -->
    </button>
    <!--  -->

    <!--  -->
    <button
      v-for="page in pages"
      :key="page"
      aria-label="pagination button"
      class="h-10 min-h-10 flex items-center justify-center gap-2 px-4 border rounded-lg text-primary hover:bg-secondary hover:text-white transition-all duration-300"
      :class="{
        'border-secondary': page === paginate.current_page,
        'border-third': page !== paginate.current_page,
      }"
      @click="getItems(page)"
    >
      <!--  -->
      <span aria-label="pagination icon" class="text-sm font-medium">{{
        page
      }}</span>
      <!--  -->
    </button>
    <!--  -->

    <!--  -->
    <button
      v-if="paginate.current_page < paginate.last_page"
      aria-label="right_button"
      class="h-10 flex items-center justify-center gap-2 px-4 bg-secondary text-white border border-secondary rounded-full hover:bg-transparent hover:text-secondary transition-all duration-300"
      @click="getItems(paginate.current_page + 1)"
    >
      <!--  -->
      <span class="text-sm font-medium">{{ props.pagination.next_text }}</span>
      <!--  -->

      <!--  -->
      <Icon name="solar:alt-arrow-right-linear" class="text-xl translate" />
      <!--  -->
    </button>
    <!--  -->
  </div>
  <!--  -->
</template>

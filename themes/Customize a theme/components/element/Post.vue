<script setup lang="ts">
const props: any = defineProps({
  item: Object,
  page: {
    type: String,
    required: false,
  },
});

const { $settings }: any = useNuxtApp();
const blog = $settings.sections.blog;

const posts = $settings.sections.posts;
const categories = ref(props.item.categories);

const getDate = (createdDate: any) => {
  const date = new Date(createdDate);
  const options: Record<any, any> = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};
</script>

<template>
  <!--  -->
  <div
    class="flex gap-4 p-4"
    :class="props.page == 'home' ? 'h-full flex-col' : 'flex-row items-center'"
  >
    <!--  -->
    <div
      class="relative bg-third border border-third rounded-lg overflow-hidden"
      :class="props.page == 'home' ? 'w-full pb-3/4' : 'w-2/5 pb-[38%]'"
    >
      <!--  -->
      <NuxtLink
        :to="`/posts/${props.item.slug}`"
        :aria-label="props.item.title"
        class="absolute inset-0 w-full h-full"
      >
        <!--  -->
        <ImageLoader
          :src="props.item.image ? props.item.image.url : null"
          :alt="props.item.title"
          img-class="object-cover w-full h-full"
        />
        <!--  -->
      </NuxtLink>
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <div
      class="flex flex-col"
      :class="
        props.page == 'home'
          ? 'h-full w-full justify-between gap-4'
          : 'w-3/5 gap-6'
      "
    >
      <!--  -->
      <div
        class="flex flex-col"
        :class="props.page == 'home' ? 'gap-2' : 'gap-4'"
      >
        <!--  -->
        <div v-if="props.page == 'home' && posts.publisher.active">
          <!--  -->
          <div class="flex flex-wrap items-center gap-1 text-sm">
            <!--  -->
            <span
              v-if="posts.publisher.text"
              class="italic font-medium text-gray"
              style="font-family: 'Times New Roman', Times, serif"
              >{{ posts.publisher.text }}</span
            >
            <!--  -->

            <!--  -->
            <span
              v-if="props.item.publisher.firstname"
              class="font-medium capitalize"
            >
              {{ props.item.publisher.firstname }}
            </span>
            <!--  -->

            <!--  -->
            <span
              v-if="props.item.publisher.lastname"
              class="font-medium capitalize"
            >
              {{ props.item.publisher.lastname }}
            </span>
            <!--  -->
          </div>
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <NuxtLink
          :to="`/posts/${props.item.slug}`"
          :aria-label="props.item.title"
        >
          <!--  -->
          <h3 class="text-xl md:text-2xl font-black text-primary">
            {{ props.item.title }}
          </h3>
          <!--  -->
        </NuxtLink>
        <!--  -->

        <!--  -->
        <div class="flex flex-wrap items-center gap-4">
          <!--  -->
          <div v-if="blog.date_creation.active" class="flex items-center gap-1">
            <!--  -->
            <Icon
              name="solar:clock-circle-linear"
              class="text-base text-secondary"
            />
            <!--  -->

            <!--  -->
            <span class="text-xs font-medium">{{
              getDate(props.item.createdAt)
            }}</span>
            <!--  -->
          </div>
          <!--  -->

          <!--  -->
          <div
            v-if="categories.length > 0 && blog.categories.active"
            class="flex items-center gap-1 categories"
          >
            <!--  -->
            <Icon name="solar:tag-linear" class="text-base text-secondary" />
            <!--  -->

            <!--  -->
            <div
              v-for="(category, index) in categories"
              :key="index"
              class="break flex items-center text-xs font-medium"
            >
              <!--  -->
              {{ category.name }}
              <!--  -->
              <span>,&nbsp;</span>
              <!--  -->
            </div>
            <!--  -->
          </div>
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <h3 class="text-sm text-third">
          {{
            props.item.excerpt.length > 150
              ? props.item.excerpt.slice(0, 150) + '...'
              : props.item.excerpt
          }}
        </h3>
        <!--  -->
      </div>
      <!--  -->

      <!--  -->
      <NuxtLink
        :to="`/posts/${props.item.slug}`"
        :aria-label="props.item.title"
        :class="
          props.page == 'home'
            ? 'bg-transparent text-secondary hover:bg-secondary hover:text-white'
            : 'bg-secondary text-white hover:bg-transparent hover:text-secondary'
        "
        class="w-fit h-10 flex items-center justify-center px-8 cursor-pointer rounded-full border border-secondary click-effect"
      >
        <!--  -->
        <span class="text-sm font-medium">{{ blog.button.text }}</span>
        <!--  -->
      </NuxtLink>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

<style scoped>
.categories .break:last-child span {
  display: none;
}
</style>

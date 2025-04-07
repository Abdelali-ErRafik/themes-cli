<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMainStore } from '@/stores/main';

const props: any = defineProps({
  page: { type: String, require: false, default: 'home' },
  upsell: { type: Object, default: null },
  item: Object,
});

const { $settings, $storeino, $tools }: any = useNuxtApp();
const $store = useMainStore();

const products = $settings.sections.products;
const alerts = ref($settings.sections.alerts);

const inStockColor = ref(products.stock.in_stock_color);
const outOfStockColor = ref(products.stock.out_of_stock_color);

const reviewsInActiveColor = ref(products.reviews.inactive_color);
const reviewsActiveColor = ref(products.reviews.active_color);

const sizes = ref(props.item.sizes);
const brand = ref(props.item.brand);

const tags = ref(props.item.tags);
const collections = ref(props.item.collections);

const reference = ref(props.item.reference);

const variant = ref(
  props.item.type === 'variant' ? props.item.variants?.[0] : null
);

const quantity = ref(props.item.quantity);

const discount = ref(props.upsell ? props.upsell.discount : null);
const outOfStock = ref(false);

const isInWishlist = computed(() =>
  $store.wishlist.some((item) => item._id === props.item._id)
);

const stockText = computed(() =>
  outOfStock.value
    ? products.stock.out_of_stock_text
    : products.stock.in_stock_ext
);

const stockColor = computed(() =>
  outOfStock.value ? outOfStockColor.value : inStockColor.value
);

onMounted(() => {
  if (props.item.type === 'simple') {
    handleSimpleProduct();
  } else {
    handleVariantProduct();
  }
});

const handleSimpleProduct = () => {
  if (discount.value) {
    props.item.originalPrice = $tools.copy(props.item.price);
    if (discount.value.type === 'percentage') {
      props.item.price.salePrice =
        props.item.price.salePrice -
        (props.item.price.salePrice * discount.value.value) / 100;
      props.item.price.comparePrice =
        props.item.price.comparePrice -
        (props.item.price.comparePrice * discount.value.value) / 100;
    } else {
      props.item.price.salePrice =
        props.item.price.salePrice - discount.value.value;
      props.item.price.comparePrice =
        props.item.price.comparePrice - discount.value.value;
    }
  }
  checkOutOfStock();
};

const handleVariantProduct = () => {
  if (discount.value) {
    props.item.variants?.forEach((variant: any) => {
      variant.originalPrice = $tools.copy(variant.price);
      if (discount.value?.type === 'percentage') {
        variant.price.salePrice =
          variant.price.salePrice -
          (variant.price.salePrice * discount.value.value) / 100;
        variant.price.comparePrice =
          variant.price.comparePrice -
          (variant.price.comparePrice * discount.value.value) / 100;
      } else {
        variant.price.salePrice =
          variant.price.salePrice - discount.value!.value;
        variant.price.comparePrice =
          variant.price.comparePrice - discount.value!.value;
      }
    });
  }
  checkOutOfStock();
};

const checkOutOfStock = () => {
  if (props.item.type === 'simple') {
    outOfStock.value =
      !props.item.outStock.disabled && props.item.quantity.instock <= 0;
  } else {
    outOfStock.value =
      !props.item.outStock.disabled &&
      props.item.variants?.[0] &&
      props.item.variants[0].quantity.instock <= 0;
  }
};

const addToCart = () => {
  const item = {
    _id: props.item._id,
    quantity: quantity.value.value || props.item.quantity.default,
    price: variant.value
      ? variant.value.price.salePrice
      : props.item.price.salePrice,
    variant: variant.value ? { _id: variant.value._id } : null,
    upsell: props.upsell,
  };

  $tools.call('ADD_TO_CART', item);
  $tools.toast(alerts.value.cart.added_text);

  if (products.add_to_cart.to_checkout) {
    setTimeout(() => {
      window.location.href = '/checkout2';
    }, 500);
  }

  $storeino.fbpx('AddToCart', {
    content_name: props.item.name,
    content_ids: [props.item._id],
    content_type: 'product',
    value: variant.value
      ? variant.value.price.salePrice
      : props.item.price.salePrice,
    currency: $store.currency?.code || 'USD',
  });
};

const toggleWishlist = () => {
  if (isInWishlist.value) {
    removeFromWishlist();
  } else {
    addToWishlist();
  }
};

const addToWishlist = () => {
  $tools.call('ADD_TO_WISHLIST', props.item);
  $tools.toast(alerts.value.wishlist.added_text);
};

const removeFromWishlist = () => {
  $tools.call('REMOVE_FROM_WISHLIST', props.item);
  $tools.toast(alerts.value.wishlist.removed_text);
};
</script>

<template>
  <!--  -->
  <div
    :class="props.page == 'shop' ? 'flex-row' : 'flex-col'"
    class="w-full h-full flex"
  >
    <!--  -->
    <div
      :class="props.page == 'shop' ? 'w-1/3 pb-[35%]' : 'w-full pb-full'"
      class="w-1/3 wishlist relative overflow-hidden shadow"
    >
      <!--  -->
      <NuxtLink
        :to="`/products/${props.item.slug}`"
        :title="props.item.name"
        :aria-label="props.item.name"
        class="absolute inset-0"
      >
        <!--  -->
        <ImageLoader
          img-class="object-cover w-full h-full"
          :src="props.item.images.length > 0 ? props.item.images[0].src : null"
          :alt="props.item.name"
        />
        <!--  -->
      </NuxtLink>
      <!--  -->

      <!--  -->
      <div
        v-if="products.add_to_wishlist.active"
        :class="page == 'wishlist' ? 'opacity-1' : 'opacity-0'"
        class="wishlist-icon"
      >
        <!--  -->
        <transition name="fade">
          <button
            :title="isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'"
            :class="page == 'wishlist' ? 'bottom-2' : 'bottom-0'"
            class="h-9 w-9 flex items-center justify-center absolute z-10 right-2 rounded-full bg-white text-secondary shadow hover:bg-secondary hover:text-white transition-all duration-300"
            @click="toggleWishlist"
          >
            <!--  -->
            <Icon
              :name="isInWishlist ? 'solar:heart-bold' : 'solar:heart-linear'"
              class="flex items-center justify-center text-2xl"
            />
            <!--  -->
          </button>
          <!--  -->
        </transition>
        <!--  -->
      </div>
      <!--  -->

      <!--  -->
      <div v-if="products.stock.active" class="absolute top-1 left-1 z-10 m-2">
        <!--  -->
        <div
          class="h-6 flex items-center justify-center text-white rounded-sm px-2"
          :style="{ backgroundColor: stockColor }"
        >
          <!--  -->
          <span class="text-xs font-normal">{{ stockText }}</span>
          <!--  -->
        </div>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->

    <!--  -->
    <div
      :class="props.page == 'shop' ? 'w-2/3 flex-row' : 'w-full flex-col'"
      class="h-full flex justify-between gap-2 p-3"
    >
      <!--  -->
      <div class="flex flex-col gap-2">
        <!--  -->
        <NuxtLink
          :to="`/products/${props.item.slug}`"
          class="text-s font-medium leading-5 overflow-hidden text-ellipsis whitespace-normal line-clamp-3"
        >
          {{ props.item.name }}
        </NuxtLink>
        <!--  -->

        <!--  -->
        <div v-if="products.reviews.active" class="flex gap-1.5 items-center">
          <!--  -->
          <div class="flex items-center gap-1">
            <Icon
              v-for="star in 5"
              :key="star"
              :name="
                star <= props.item.review.rating
                  ? 'solar:star-bold'
                  : 'solar:star-linear'
              "
              :style="{
                color:
                  star <= props.item.review.rating
                    ? reviewsActiveColor
                    : reviewsInActiveColor,
              }"
              class="flex items-center justify-center text-base"
            />
          </div>

          <!--  -->
          <span class="text-s font-medium align-middle text-secondary"
            >( {{ props.item.review.reviews.length }} )</span
          >
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div
          v-if="products.reference.active && reference"
          class="flex items-center"
        >
          <!--  -->
          <span class="text-s font-medium capitalize">
            {{ `${products.reference.text} : ` }}
            <!--  -->
            <NuxtLink
              :to="`/shop/?ref=${reference}`"
              class="font-normal hover:text-secondary"
              >{{ reference }}</NuxtLink
            >
            <!--  -->
          </span>
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div
          v-if="products.collections.active && collections.length > 0"
          class="flex items-center"
        >
          <!--  -->
          <span class="text-s font-medium capitalize"
            >{{ `${products.collections.text} : ` }}
            <!--  -->
            <NuxtLink
              v-for="(collection, index) in collections"
              :key="index"
              :to="`/shop/${collection.name}`"
              class="font-normal hover:text-secondary"
              >{{ collection.name }}</NuxtLink
            >
            <!--  -->
          </span>
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div
          v-if="products.tags.active && tags.length > 0"
          class="flex items-center"
        >
          <!--  -->
          <span class="text-s font-medium capitalize">
            {{ `${products.tags.text} : ` }}
            <!--  -->
            <NuxtLink
              v-for="(tag, index) in tags"
              :key="index"
              class="font-normal hover:text-secondary"
              >{{ tag }}</NuxtLink
            >
            <!--  -->
          </span>
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div v-if="brand && products.brand.active" class="flex items-center">
          <!--  -->
          <span class="text-s font-medium capitalize">
            {{ `${products.brand.text} : ` }}

            <NuxtLink
              :to="`/shop/?brands=${brand.slug}`"
              class="font-normal hover:text-secondary"
            >
              {{ brand.name }}
            </NuxtLink>
            <!--  -->
          </span>
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div
          v-if="sizes.weight && products.weight.active"
          class="flex items-center"
        >
          <!--  -->
          <span class="text-s font-medium capitalize">
            {{ `${products.weight.text} : ` }}
            <!--  -->
            <span class="font-normal">
              {{ sizes.weight.value + sizes.weight.unit }}
            </span>
            <!--  -->
          </span>
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div
          v-if="sizes.volume && products.volume.active"
          class="flex items-center"
        >
          <!--  -->
          <span class="text-s font-medium capitalize">
            {{ `${products.volume.text} : ` }}
            <!--  -->
            <span class="font-normal">
              {{ sizes.volume.value + sizes.volume.unit }}
            </span>
            <!--  -->
          </span>
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div
          v-if="sizes.dimensions && products.dimensions.active"
          class="flex items-center"
        >
          <!--  -->
          <span class="text-s font-medium capitalize">
            {{ `${products.dimensions.text} : ` }}
            <!--  -->
            <span class="font-normal">
              {{
                `${sizes.dimensions.width + sizes.dimensions.unit},
              ${sizes.dimensions.height + sizes.dimensions.unit},
              ${sizes.dimensions.depth + sizes.dimensions.unit}`
              }}
            </span>
            <!--  -->
          </span>
          <!--  -->
        </div>
        <!--  -->
      </div>
      <!--  -->

      <!--  -->
      <div
        :class="
          props.page == 'shop' ? 'flex-col items-end' : 'flex-row items-center'
        "
        class="flex justify-between text-x"
      >
        <!--  -->
        <div class="flex gap-1 items-end justify-center">
          <!--  -->
          <ProductPrice
            page="home"
            :type="props.item.type"
            :price="props.item.price"
            :variants="props.item.variants"
            price-style="text-lg font-black"
            currency-style="text-x font-bold leading-[0.6rem]"
            sub-price-style="text-sm font-normal"
          />
          <!--  -->

          <!--  -->
          <div
            v-if="discount"
            class="flex items-center justify-center h-5 px-2 rounded-sm bg-primary text-white"
          >
            <!--  -->
            <span class="text-xs font-normal"
              >-{{ discount.value }}
              {{
                discount.type == 'percentage' ? '%' : $store.currency.symbol
              }}</span
            >
            <!--  -->
          </div>
          <!--  -->
        </div>
        <!--  -->

        <!--  -->
        <div
          v-if="products.add_to_cart.active"
          class="flex flex-col items-end justify-center"
        >
          <!--  -->
          <button
            v-if="
              !outOfStock &&
              props.item.type == 'simple' &&
              props.item.price.salePrice > 0
            "
            class="h-9 w-9 flex items-center justify-center rounded-full border border-secondary bg-secondary text-white hover:bg-transparent hover:text-secondary transition-all duration-300"
            @click="addToCart()"
          >
            <!--  -->
            <Icon name="solar:cart-large-2-linear" class="text-2xl translate" />
            <!--  -->
          </button>
          <!--  -->

          <!--  -->
          <NuxtLink
            v-if="!outOfStock && props.item.type == 'variable'"
            :to="`/products/${props.item.slug}`"
            class="h-9 w-9 flex items-center justify-center rounded-full border border-secondary bg-secondary text-white hover:bg-transparent hover:text-secondary transition-all duration-300"
          >
            <!--  -->
            <Icon name="solar:eye-linear" class="text-2xl translate" />
            <!--  -->
          </NuxtLink>
          <!--  -->

          <!--  -->
          <NuxtLink
            v-if="outOfStock"
            :to="`/products/${props.item.slug}`"
            class="h-9 w-9 flex items-center justify-center rounded-full border border-secondary bg-secondary text-white hover:bg-transparent hover:text-secondary transition-all duration-300"
          >
            <!--  -->
            <Icon name="solar:eye-linear" class="text-2xl translate" />
            <!--  -->
          </NuxtLink>
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
.wishlist:hover .wishlist-icon {
  opacity: 1;
}

.wishlist .wishlist-icon > button {
  transition: all 0.3s ease-in-out;
}

.wishlist:hover .wishlist-icon > button {
  transform: translateY(-0.5rem);
}
</style>

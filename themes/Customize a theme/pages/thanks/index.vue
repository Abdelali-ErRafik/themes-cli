<template>
  <div class="container">
    <div class="flex flex-col items-center gap-5 py-24 text-center md:gap-6 lg:gap-7">
        <!-- title -->
        <h1 class="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary">
            <span>{{ $settings.sections.thanks.title }}</span>
        </h1>
        <!-- title -->

        <!-- orderCode -->
        <div class="flex items-center justify-center px-4 py-1 text-base bg-gray-100 rounded-full" v-if="orderCode">
          <span v-if="this.$store.state.language.code == 'AR'" class="text-sm md:text-base">الطلبية #: </span>
          <span v-else-if="this.$store.state.language.code == 'FR'" class="text-sm md:text-base">Commande #: </span>
          <span v-else class="text-sm md:text-base">Order #: </span>
          <span class="text-sm md:text-base">{{ orderCode }}</span>
        </div>  
        <!-- orderCode -->

        <!-- text thank you -->
        <p class="text-2xl font-semibold text-gray-700 md:text-3xl lg:text-4xl">{{ $settings.sections.thanks.description }}</p>
        <!-- text thank you -->

        <!-- button -->
        <nuxt-link to="/shop" class="inline-flex px-4 py-2.5 text-sm font-medium tracking-wider rounded-full shadow-sm md:px-6 md:py-3 bg-primary text-gray-50 hover:shadow-lg"> 
          {{ $settings.sections.thanks.buttons.back_to_shop_text }}
        </nuxt-link>
        <!-- button -->
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      orderCode: null
    };
  },
	mounted() {
		this.$tools.call('PAGE_VIEW');
		this.$storeino.fbpx('PageView');
		this.$storeino.fbpx('Purchase');
		if (this.$route.query.pixel) {
      let pixelData = JSON.parse(this.$route.query.pixel);
      window.snapPurchase({
            price: pixelData.total,
            transaction_id: this.$route.query.code,
            currency: this.$store.state.currency && this.$store.state.currency.code ? this.$store.state.currency.code : "",
            item_ids:pixelData.content_ids,
            click_id:this.$route.query.ScCid ? this.$route.query.ScCid  : null
          });
    }
    // take OrderId from url
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    this.orderCode = params.get("code");
	}
}
</script>
<template>
    <div class="container">

        <div class=" bg-white my-2 p-3">
        <h2 class="text-2xl mb-2">{{ $settings.sections.wishlist.title }}</h2>
        <hr>
        <div v-if="loading.wishlist" class="flex justify-center items-center my-5">
            <si-loader></si-loader>
        </div>
        <div class="flex flex-wrap">
            <div v-for="(item, i) in items" :key="i" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <si-product :item="item"></si-product>
            </div>
        </div>
        <div v-if="!loading.wishlist && items.length == 0" class="flex flex-col items-center py-4">
            <h2 class="w-full text-center py-3">{{ $settings.sections.wishlist.empty_text }}</h2>
            <nuxt-link to="/shop" class="flex items-center p-2 justify-center bg-primary text-white">
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-5 h-5 translate"><path fill="currentColor" d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"></path></svg>
                <span>&ensp;</span>
                <span class="w-full">{{ $settings.sections.wishlist.buttons.back_to_shop_text }}</span>
            </nuxt-link>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: { wishlist: true },
            items: []
        }
    },
    async fetch(){
        this.$store.state.seo.title = this.$settings.sections.wishlist.title + ' - ' + this.$settings.store_name;
        this.$store.state.seo.description = this.$settings.sections.wishlist.description || this.$settings.store_description;
        await this.initWishlist();
    },
    watch: {
        async "$store.state.cart.length"(){
            await this.initWishlist();
        }
    },
    methods: {
        async initWishlist(){
            this.items = [];
            const ids = this.$store.state.wishlist.map(item => item._id);
            this.loading.wishlist = true;
            if(ids.length > 0){
                try{
                    const response = await this.$storeino.products.search({ '_id-in': ids, limit: 1000 });
                    this.items = response.data.results;
                }catch(e){
                    console.log({e});
                }
            }
            this.loading.wishlist = false;
        },
        async remove(item){
            this.$tools.call('REMOVE_FROM_WISHLIST', item);
        }
    },
}
</script>

<template>
    <div class="container">
        <div class="p-3 my-2 bg-white ">
            <h2 class="mb-2 text-2xl">{{$settings.sections.cart.title}}</h2>
            <hr>
            <div v-if="loading.cart" class="flex items-center justify-center my-5">
                <si-loader></si-loader>
            </div>
            <div class="flex flex-col cart-items">
                <si-cart-item v-for="(item,i) in items" @remove="remove" :item="item" :key="i" />
            </div>
            <div v-if="!loading.cart && items.length > 0" class="flex flex-col mb-2 shadow">
                <div class="flex justify-between p-2 bg-white">
                    <h2>{{ $settings.sections.cart.total_text }}</h2>
                    <h2 class="text-2xl text-red-700">{{ total }} {{ $store.state.currency.symbol }}</h2>
                </div>
                <div class="flex justify-between w-full p-2">
                    <nuxt-link to="/shop" class="flex items-center justify-center w-1/2 p-2 text-2xl text-gray-900 bg-gray-200 md:w-auto">
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-5 h-5 translate"><path fill="currentColor" d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"></path></svg>
                        <span>&ensp;</span>
                        <span class="w-full overflow-hidden whitespace-nowrap overflow-ellipsis">{{ $settings.sections.cart.buttons.back_to_shop_text }}</span>
                    </nuxt-link>
                    <a href="/checkout2" class="flex items-center justify-center w-1/2 p-2 text-2xl text-white whitespace-nowrap md:w-auto bg-primary">
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-5 h-5 translate"><path fill="currentColor" d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"></path></svg>
                        <span>&ensp;</span>
                        <span class="w-full overflow-hidden whitespace-nowrap overflow-ellipsis">{{ $settings.sections.cart.buttons.checkout_text }}</span>
                    </a>
                </div>
            </div>
            <div v-if="!loading.cart && items.length == 0" class="flex flex-col items-center py-4">
                <h2 class="w-full py-3 text-center">{{ $settings.sections.cart.empty_text }}</h2>
                <nuxt-link to="/shop" class="flex items-center justify-center p-2 text-white bg-primary">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-5 h-5 translate"><path fill="currentColor" d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"></path></svg>
                <span>&ensp;</span>
                    <span class="w-full">{{ $settings.sections.cart.buttons.back_to_shop_text }}</span>
                </nuxt-link>
            </div>
        </div>
        <div class="flex flex-col mb-2 bg-white" v-if="!loading.cart && items.length > 0">
            <div class="m-2" v-if="upsells.length > 0">
                <h2 class="text-2xl">{{ $settings.sections.cart.upsell.title }}</h2>
            </div>
            <div v-if="loading.upsells" class="flex items-center justify-center my-5">
                <si-loader></si-loader>
            </div>
            <div class="flex flex-wrap" v-if="upsells.length > 0">
                <template v-for="(upsell, i) in upsells">
                    <div v-for="(product, ii) in upsell.products" :key="ii+'_'+i" class="w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <si-product :item="product" :upsell="upsell"></si-product>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: { cart: true, upsells: true },
            items: [],
            total: 0,
            upsells: []
        }
    },
    async fetch(){
        this.$store.state.seo.title = this.$settings.sections.cart.title + ' - ' + this.$settings.store_name;
        this.$store.state.seo.description = this.$settings.sections.cart.description || this.$settings.store_description;
        await this.initCart();
        if(this.items.length > 0){
            await this.getUpsells();
        }
    },
    mounted() {
      this.$storeino.fbpx('PageView')
    },
    watch: {
        async "$store.state.cart.length"(){
            await this.initCart();
            await this.getUpsells();
        },
        items: {
            deep: true,
            handler(){
                this.calcTotal();
            }
        }
    },
    methods: {
        async getUpsells(){
            const ids = this.$store.state.cart.map(item => item._id);
            this.loading.upsells = true;
            if(ids.length > 0){
                try{
                    const response = await this.$storeino.upsells.search({ 'with': ['products'],'product._id-in': ids, limit: 1000 });
                    this.upsells = response.data.results;
                }catch(e){
                    console.log({e});
                }
            }
            this.loading.upsells = false;
        },
        async initCart(){
            this.items = [];
            const ids = this.$store.state.cart.map(item => item._id);
            this.loading.cart = true;
            if(ids.length > 0){
                try{
                    const response = await this.$storeino.products.search({ '_id-in': ids, limit: 1000 });
                    const products = response.data.results;
                    for (const item of this.$store.state.cart) {
                        const cartItem = {};
                        const product = products.find(p => p._id === item._id);
                        cartItem._id = product._id;
                        cartItem.slug = product.slug;
                        cartItem.name = product.name;
                        cartItem.price = product.price.salePrice;
                        cartItem.quantity = product.quantity;
                        cartItem.quantity.value = item.quantity;
                        cartItem.image = product.images.length > 0 ? product.images[0].src : '';
                        if(item.variant && item.variant._id){
                            cartItem.variant = product.variants.find(variant => variant._id === item.variant._id);
                            cartItem.price = cartItem.variant.price.salePrice;
                        }
                        if(item.upsell){
                            cartItem.upsell = item.upsell;
                            const discount = cartItem.upsell.type == 'percentage' ? cartItem.price * (cartItem.upsell.value / 100) : cartItem.upsell.value
                            cartItem.price = cartItem.price - discount;
                        }
                        cartItem.total = cartItem.price * cartItem.quantity.value;
                        this.items.push(cartItem);
                    }
                    this.calcTotal();
                }catch(e){
                    console.log({e});
                }
            }
            this.loading.cart = false;
        },
        async remove(item){
            this.$tools.call('REMOVE_FROM_CART', item);
        },
        calcTotal(){
            this.total = this.items.reduce((total, item) => total + (item.price * item.quantity.value), 0);
        }
    },
}
</script>

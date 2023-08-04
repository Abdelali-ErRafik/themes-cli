<template>
<div class="relative flex flex-col">
    <div v-if="$settings.sections.products.add_to_wishlist.active">
        <button v-if="$store.state.wishlist.find(i=>i._id==item._id)" @click="removeFromWishlist" title="Wishlist" class="absolute z-10 p-2 m-2 mx-1 bg-gray-100 rounded-md item top-1 right-2 hover:bg-gray-200">
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 text-red-600 translate"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
        </button>
        <button v-else @click="addToWishlist" title="Wishlist" class="absolute z-10 p-2 m-2 mx-1 bg-gray-100 rounded-md item top-1 right-2 hover:bg-gray-200">
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 translate"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z" class=""></path></svg>
        </button>
    </div>
    <div v-if="discount" class="absolute top-0 left-0 z-10 flex items-center justify-center h-10 p-2 text-white bg-red-700 rounded-br-lg">
        <b>-{{discount.value}} {{ discount.type == 'percentage' ? '%' : this.$store.state.currency.symbol }}</b>
    </div>
    <div class="relative flex h-full overflow-hidden">
        <div class="flex flex-col w-full h-full bg-white border shadow-md">
            <div class="relative w-100 pb-full">
                <nuxt-link :to="`/products/${item.slug}`" :title="item.name" :aria-label="item.name">
                    <si-image  width="400" height="400" class="absolute inset-0 object-cover w-full h-full" :src="item.images.length > 0 ? item.images[0].src : null" :alt="item.name"/>
                </nuxt-link>
            </div>
            <div class="h-full text-center">
                <nuxt-link :to="`/products/${item.slug}`">
                    <h3 class="m-2 text-xl two-lines">{{ item.name }}</h3>
                </nuxt-link>
            </div>
            <hr class="my-1">
            <div class="flex items-center justify-center" v-if="$settings.sections.products.show_reviews">
                <div class="flex mb-1">
                    <span v-for="(star,i) in 5" :class="star <= item.review.rating ? 'text-yellow-500 ': 'text-gray-400'" :key="i">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-6 h-6 translate"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path></svg>
                    </span>
                </div>
                <span class="text-sm text-gray-600" key="count">({{ item.review.reviews.length }})</span>
            </div>
            <si-product-price :type="item.type" :price="item.price" :variants="item.variants"></si-product-price>
            <div v-if="outofstock && item.type == 'simple'" class="flex justify-center p-2 text-white bg-red-700 ai-c">
                    <b>{{ 'Out of stock' }}</b>
            </div>
            <button v-else-if="$settings.sections.products.add_to_cart.active" @click="filpped=true" class="flex justify-center p-2 text-white ai-c bg-primary">
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-6 h-6 translate"><path fill="currentColor" d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"></path></svg>
                <span>&ensp;</span>
                <span class="w-full">{{ $settings.sections.products.add_to_cart.text }}</span>
            </button>
        </div>
        <transition name="flip">
        <div v-if="filpped" class="absolute z-10 flex flex-col w-full h-full bg-white shadow-md">
            <button class="close-button" @click="filpped=false">
                <i class="close-icon"></i>
            </button>
            <div class="h-full overflow-auto">
                <nuxt-link v-if="item.options.length < 3" class="text-center" :to="`/products/${item.slug}`">
                    <h3 class="m-2 text-xl two-lines">{{ item.name }}</h3>
                </nuxt-link>
                <div class="flex items-center justify-center" v-if="item.type == 'simple' && $settings.sections.products.show_reviews">
                    <div class="flex mb-1">
                        <span v-for="(star,i) in 5" :class="star <= item.review.rating ? 'text-yellow-500 ': 'text-gray-400'" :key="i">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-6 h-6 translate"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path></svg>
                        </span>
                    </div>
                    <span class="text-sm text-gray-600" key="count">({{ item.review.reviews.length }})</span>
                </div>
                <si-product-price class="text-2xl" v-if="item.type == 'simple'" :type="item.type" :originalPrice="item.originalPrice" :price="item.price" :variants="item.variants"></si-product-price>
                <hr class="my-1">
                <div class="w-full">
                    <si-product-variants v-if="item.type=='variable'" showPrice :options="item.options" :variants="item.variants" :images="item.images" @selected="variantSelected"></si-product-variants>
                    <hr v-if="item.type=='variable'" class="my-1">
                    <div class="flex justify-center" v-show="!outofstock">
                        <si-product-quantity @selected="quantitySelected" :quantity="quantity"></si-product-quantity>
                    </div>
                </div>
            </div>
            <div v-if="outofstock" class="flex justify-center p-2 text-white bg-red-700 ai-c">
                    <b>{{ 'Out of stock' }}</b>
            </div>
            <button v-else-if="$settings.sections.products.add_to_cart.active" @click="addToCart" class="flex justify-center p-2 text-white ai-c bg-primary click-effect">
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-6 h-6 translate"><path fill="currentColor" d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"></path></svg>
                <span>&ensp;</span>
                <span class="w-full" v-if="added">{{ $settings.sections.products.added_text }}</span>
                <span class="w-full" v-else>{{ $settings.sections.products.confirm_text }}</span>
            </button>
        </div>
        </transition>
    </div>
</div>
</template>
<script>
export default {
    props: {
        upsell: { type: Object, default: null },
        item: Object,
    },
    async fetch(){
        if(this.item.type == 'simple'){
            if(this.discount){
                this.item.originalPrice = this.$tools.copy(this.item.price);
                if(this.discount.type == 'percentage'){
                        this.item.price.salePrice = this.item.price.salePrice - (this.item.price.salePrice * this.discount.value / 100)
                        this.item.price.comparePrice = this.item.price.comparePrice - (this.item.price.comparePrice * this.discount.value / 100)
                }else{
                    this.item.price.salePrice = this.item.price.salePrice - this.discount.value
                    this.item.price.comparePrice = this.item.price.comparePrice - this.discount.value
                }
            }
            if(!this.item.outStock.disabled && this.item.quantity.instock <= 0){
                this.outofstock = true;
            }
        }else{
            if(this.discount){
                this.item.variants.forEach(variant => {
                    variant.originalPrice = this.$tools.copy(variant.price)
                    if(this.discount.type == 'percentage'){
                        variant.price.salePrice = variant.price.salePrice - (variant.price.salePrice * this.discount.value / 100)
                        variant.price.comparePrice = variant.price.comparePrice - (variant.price.comparePrice * this.discount.value / 100)
                    }else{
                        variant.price.salePrice = variant.price.salePrice - this.discount.value
                        variant.price.comparePrice = variant.price.comparePrice - this.discount.value
                    }
                });
            }
            if(!this.item.outStock.disabled && this.item.variants[0] && this.item.variants[0].quantity.instock <= 0){
                this.outofstock = true;
            }else{
                this.outofstock = false;
            }
        }
    },
    data() {
        return {
            filpped: false,
            added: false,
            variant: this.item.type == 'variant' ? this.item.variants[0] : null,
            quantity: this.item.quantity,
            price: { salePrice: 0, comparePrice: 0 },
            discount: this.upsell ? this.upsell.discount : null,
            outofstock: false
        }
    },
    methods: {
        addToCart() {
            let item = {
                _id: this.item._id,
                quantity: this.quantity.value ? this.quantity.value : this.item.quantity.default,
                price: this.variant?this.variant.price.salePrice : this.item.price.salePrice,
                variant: this.variant ? { _id: this.variant._id } : null,
                upsell: this.upsell
            };
            this.$tools.call('ADD_TO_CART', item);
            this.$tools.toast(this.$settings.sections.alerts.added_to_cart);
            this.added = true;
            if(this.$settings.sections.products.add_to_cart_to_checkout){
                setTimeout(() => {
                        window.location.href = '/checkout2';
                }, 500);
            }
            setTimeout(() => {
                this.added = false;
            }, 2000);
             this.$storeino.fbpx('AddToCart',{
               content_name: this.item.name,
               content_ids: [this.item._id],
               content_type: "product",
               value: this.variant?this.variant.price.salePrice : this.item.price.salePrice,
               currency: this.$store.state.currency && this.$store.state.currency.code ? this.$store.state.currency.code : "USD"
            })
        },
        variantSelected(variant){
            this.variant = variant;
            if(!this.item.outStock.disabled && this.variant.quantity.instock <= 0){
                this.outofstock = true;
            }else{
                this.outofstock = false;
            }
            this.quantitySelected(this.item.quantity.value);
        },
        quantitySelected(quantity){
            this.item.quantity.value = quantity;
            if(this.variant){
                this.price.salePrice = this.variant.price.salePrice * quantity;
                this.price.comparePrice = this.variant.price.comparePrice * quantity;
            }else{
                this.price.salePrice = this.item.price.salePrice * quantity;
                this.price.comparePrice = this.item.price.comparePrice * quantity;
            }
        },
        addToWishlist(){
            this.$tools.call('ADD_TO_WISHLIST', this.item);
            this.$tools.toast(this.$settings.sections.alerts.added_to_wishlist);
        },
        removeFromWishlist(){
            this.$tools.call('REMOVE_FROM_WISHLIST', this.item);
            this.$tools.toast(this.$settings.sections.alerts.removed_from_wishlist);
        }
    },
}
</script>
<style scoped>
    .close-button{
        position: absolute;
        right: 1px;
        top: 1px;
    }
    .close-icon{
        display: block;
        width: 30px;
        height: 30px;
        overflow: hidden;
        position: relative;
        border-radius: 5px;
        background: #ffffff;
        border: 7px solid #ffffff;
        box-shadow: 0 0 5px #00000022;
    }
    .close-icon::before, .close-icon::after{
        content: '';
        width: 40px;
        height: 2px;
        display: block;
        position: absolute;
        background-color: #7c7c7c;
    }
    .close-icon::before{
        transform: rotate(45deg);
        top: 14px;
        left: -5px;
    }
    .close-icon::after{
        transform: rotate(-45deg);
        top: 0px;
        left: -5px;
    }
    .icon-star::before {
        content: '\e918';
        font-size: 14px !important;
    }
    .flip-enter-active, .flip-leave-active {
        transition: transform .5s;
    }
    .flip-enter, .flip-leave-to {
        transform: translateX(-100%);
    }
</style>

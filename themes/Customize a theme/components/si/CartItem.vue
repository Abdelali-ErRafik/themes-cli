<template>
    <div>
        <div class="flex justify-between flex-wrap relative mb-2 p-2 shadow">
            <div class="flex md:w-1/2">
                <div class="flex items-center w-full">
                    <nuxt-link class="w-1/4 flex" :to="`/products/${item.slug}`">
                        <si-image class="border-2 border-gray-300 rounded-md object-contain w-full" :src="item.image" :alt="item.name"/>
                    </nuxt-link>
                    <div class="w-3/4">
                        <div class="flex flex-col p-2">
                            <nuxt-link class="text-2xl" :to="`/products/${item.slug}`">{{ item.name }}</nuxt-link>
                            <nuxt-link class="text-gray-600" :to="`/products/${item.slug}`"><b v-if="item.variant">{{ item.variant.name }}</b></nuxt-link>
                            <div v-if="item.upsell">
                                <b class="bg-red-700 text-white inline-block p-1 rounded-lg">-{{ item.upsell.value }} {{ item.upsell.type == 'percentage' ? '%' : $store.state.currency.symbol }}</b>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <div class="flex flex-col justify-center w-1/2 md:w-1/4 bg-gray-100 md:bg-white p-2">
                <si-product-quantity @selected="quantitySelected" :quantity="item.quantity"/>
            </div>
            <div class="flex flex-col justify-center w-1/2 md:w-1/4 bg-gray-100 md:bg-white p-2 relative">
                <div class="text-gray-600">
                    <b class="text-xl">{{ item.quantity.value }} x</b>
                    <b class="text-xl">{{ item.price }} {{ $store.state.currency.symbol }}</b>
                </div>
                <h2 class="text-2xl text-red-700">{{ item.total }} {{ $store.state.currency.symbol }}</h2>
            </div>
            <div class="absolute top-0 right-0">
                <button class="w-8 h-8 justify-center items-center bg-white rounded-md shadow" @click="remove">&times;</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: { type: Object, required: true },
        quantity: { type: Number, default: 1 }
    },
    async fetch(){
        this.quantitySelected(this.item.quantity.value);
    },
    methods: {
        remove(){
            this.$emit("remove", this.item);
        },
        quantitySelected(quantity){
            this.item.quantity.value = quantity;
            this.item.total = this.item.price * quantity;
            let item = null;
            if(this.item.variant) item = this.$store.state.cart.find(i => i._id == this.item._id && this.item && i.variant._id == this.item.variant._id);
            else item = this.$store.state.cart.find(i => i._id == this.item._id && this.item && !i.variant);
            this.$tools.call('ADD_TO_CART', { ...item, quantity: quantity });
        }
    },
}
</script>
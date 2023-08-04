<template>
    <div>
        <meta itemprop="priceCurrency" :content="$store.state.currency.code" />
        <div class="price flex justify-center my-2" v-if="type=='simple'">
            <b class="text-primary">{{ price.salePrice }}{{ $store.state.currency.symbol }}</b>
            <span class="flex w-2"></span>
            <span class="relative" v-if="price.comparePrice > 0">
                <b class="text-gray-600">{{ price.comparePrice }}{{ $store.state.currency.symbol }}</b>
                <span class="compare-price absolute top-3 block w-full bg-red-600"></span>
            </span>
            <meta itemprop="price" :content="price.salePrice" />
        </div>
        <div class="price flex justify-center my-2" v-else-if="minPrice != maxPrice">
            <meta itemprop="price" :content="minPrice" />
            <b class=" text-primary">{{ minPrice }}{{ $store.state.currency.symbol }}</b>
            <span class="flex">~</span>
            <b class=" text-primary">{{ maxPrice }}{{ $store.state.currency.symbol }}</b>
        </div>
        <div class="price flex justify-center my-2" v-else-if="variants.length > 0">
            <meta itemprop="price" :content="variants[0].price.salePrice" />
            <b class=" text-primary">{{ variants[0].price.salePrice }}{{ $store.state.currency.symbol }}</b>
            <span class="flex w-2"></span>
            <span class="relative" v-if="variants[0].price.comparePrice > 0">
                <b class="text-gray-600">{{ variants[0].price.comparePrice }}{{ $store.state.currency.symbol }}</b>
                <span class="compare-price absolute top-3 block w-full bg-red-600"></span>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        type: String,
        price: Object,
        originalPrice: { type: Object, default: null },
        variants: { type: Array, default: [] }
    },
    data() {
        return {
            minPrice : this.type == 'variable' ? Math.min(...this.variants.map(v=>v.price.salePrice)) : 0,
            maxPrice : this.type == 'variable' ? Math.max(...this.variants.map(v=>v.price.salePrice)) : 0,
        }
    },
}
</script>
<style>
.compare-price{
    height: 0.2em;
    transform: rotate(-12deg);
    opacity: .5;
}
</style>
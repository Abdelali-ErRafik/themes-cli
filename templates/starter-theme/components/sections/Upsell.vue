<template>
    <div class="container" v-if="item">
        <div class="m-2">
            <h2 class="text-2xl">{{ $settings.sections.product.upsell.title }}</h2>
        </div>
        <div class="flex flex-wrap">
            <div v-for="(product, i) in item.products" :key="i" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <si-product :item="product" :upsell="item"></si-product>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: { type: Object, default: null },
    }
}
</script>
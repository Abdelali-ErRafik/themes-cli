<template>
    <div class="w-full flex flex-col h-full bg-white shadow">
        <nuxt-link class="flex pb-full relative" :aria-label="item.name" :to="item.childrens.length > 0 ? `/collections/${item.slug}` : `/shop/${item.slug}`">
            <si-image width="400" height="400" class="h-full w-full absolute inset-0  object-cover" :src="item.image ? item.image.src : null" :alt="item.name" srcset=""/>
        </nuxt-link>
        <nuxt-link :to="item.childrens.length > 0 ? `/collections/${item.slug}` : `/shop/${item.slug}`">
            <h3 class="p-2 text-center text-xl">{{ item.name }} <span v-if="item.childrens.length > 0">({{ item.childrens.length }})</span></h3>
        </nuxt-link>
    </div>
</template>
<script>
export default {
    props: {
        item: Object
    }
}
</script>
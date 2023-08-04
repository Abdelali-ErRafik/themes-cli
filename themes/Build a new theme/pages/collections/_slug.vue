<template>
    <div class="container">
        <div v-if="item" class="flex items-center bg-white border m-2">
            <div class="w-40 h-40 p-2 bs-bb">
                <si-image width="400" height="400" class="w-100 h-100 object-contain" :src="item.image ? item.image.src : null" :alt="item.name" srcset=""/>
            </div>
            <span class="w-2">&ensp;</span>
            <div class="flex flex-1 flex-col justify-start items-start">
                <h1 class="text-center">{{ item.name }}</h1>
                <p class="text-center">{{ item.description }}</p>
            </div>
        </div>
        <div class="flex flex-wrap">
            <div v-if="loading" class="flex justify-center items-center my-5">
                <si-loader></si-loader>
            </div>
            <div v-for="(item,i) in items" :key="i" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <si-collection :item="item"></si-collection>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: [],
            item: null,
            loading: true,
        }
    },
    async fetch(){
        this.items = [];
        this.loading = true;
        try{
            const { data } = await this.$storeino.collections.get({ slug: this.$route.params.slug});
            this.item = data;
            const { data : { results } } = await this.$storeino.collections.search({ parent: data._id });
            this.items = results;
        }catch(e){
            console.log({e});
        }
        this.loading = false;
    },
    mounted() {
      this.$storeino.fbpx('PageView')
    }
}
</script>

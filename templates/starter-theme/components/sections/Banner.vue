<template>
    <div class="container">
        <div class="flex flex-wrap p-2">
            <div v-if="banner.items" class="relative w-full overflow-hidden" :class="banner.right && banner.right.active ? 'md:w-3/4' : ''">
                <div class="inset-0 flex flex-wrap h-full mx-2 slider-item" :class="'last'" v-if="lastItem">
                    <div class="relative w-full image md:w-2/3">
                        <nuxt-img width="600" height="300" class="object-cover h-48 max-h-full bg-gray-200 md:h-full" :src="lastItem.image ? lastItem.image.src: $store.state.defaults.sliderImage" :alt="lastItem.title"/>
                        <div class="absolute bottom-0 flex p-2">
                            <span v-for="(x,y) in Object.keys(banner.items)" :key="y" :class="y==activeIndex ?'bg-gray-200': ''" class="flex w-4 h-4 mx-1 bg-white rounded-full cursor-pointer" @click="activeIndex=y"></span>
                        </div>
                    </div>
                    <div class="w-full text-white text md:w-1/3 bg-primary">
                        <div class="flex flex-col justify-between h-full p-2">
                            <h2 class="mb-2 text-2xl">{{ lastItem.title }}</h2>
                            <p class="mb-2">{{ lastItem.description }}</p>
                            <router-link class="flex justify-center w-full p-2 bg-white text-primary" v-show="lastItem.button.active" :to="lastItem.button.url">{{ lastItem.button.text }}</router-link>
                        </div>
                    </div>
                </div>
                <template v-for="(key,i) in Object.keys(banner.items)">
                    <div class="relative flex flex-wrap h-full mx-2 slider-item" :class="i==activeIndex ? 'active': ''" :key="i">
                        <div class="relative w-full image md:w-2/3">
                            <nuxt-img width="100%" height="300" class="object-cover h-48 max-h-full bg-gray-200 md:h-full" :src="banner.items[key].image ? banner.items[key].image.src : $store.state.defaults.sliderImage" :alt="banner.items[key].title"/>
                            <div class="absolute bottom-0 flex p-2">
                                <span v-for="(x,y) in Object.keys(banner.items)" :key="y" :class="y==activeIndex ?'bg-gray-200': ''" class="flex w-4 h-4 mx-1 bg-white rounded-full cursor-pointer" @click="animate(y)"></span>
                            </div>
                        </div>
                        <div class="w-full text-white text md:w-1/3 bg-primary">
                            <div class="flex flex-col justify-between h-full p-2">
                                <h2 class="mb-2 text-2xl">{{ banner.items[key].title }}</h2>
                                <p class="mb-2">{{ banner.items[key].description }}</p>
                                <router-link class="flex justify-center w-full p-2 bg-white text-primary" v-show="banner.items[key].button.active" :to="banner.items[key].button.url">{{ banner.items[key].button.text }}</router-link>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div v-if="banner.right && banner.right.active" class="hidden w-full bg-gray-300 md:block md:w-1/4">
                <div class="h-full">
                    <router-link :to="banner.right.url">
                        <nuxt-img class="object-cover h-full " width="300" height="500" :src="banner.right.image ? banner.right.image.src: $store.state.defaults.sideBanner" alt="Banner image"/>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            timeout: null,
            lastItem: null,
            activeIndex: 0,
            banner: this.$settings.sections.banner
        }
    },
    mounted() {
        this.animate();
    },
    methods: {
        animate(index=null){
            if(!this.banner.items) return;
            if(index != null){
                this.lastItem = this.banner.items[`item_${[this.activeIndex]}`];
                this.activeIndex = index;
                clearTimeout(this.timeout);
            }else{
                this.lastItem = this.banner.items[`item_${[this.activeIndex]}`];
                if(this.activeIndex >= Object.keys(this.banner.items).length-1) this.activeIndex = -1;
                this.activeIndex++;
                this.timeout = setTimeout(() => {
                    this.animate();
                }, 3500);
            }
        }
    },
}
</script>
<style>
    .slider-item.last{
        position: absolute;
    }
    .slider-item:not(.active):not(.last){
        position: absolute;
        top: 0;
        transform: translateX(-110%);
    }
    .slider-item.active{
        transform: none;
        transition: .5s;
    }
</style>

<template>
    <div class="container border">
        <div class="flex mb-2 relative">
            <transition name="slideleft" v-if="$settings.sections.blog.sidebar.active">
                <div :class="showSideBar ? 'show':'hide'" class="w-80 md:w-1/4 fixed hidden md:block md:top-0 h-full top-0 bottom-0 bg-white md:relative z-10">
                    <div class="bg-black bg-opacity-50 fixed block md:hidden inset-0" @click="showSideBar=false"></div>
                    <div class="border-r bg-white h-full flex flex-col relative">
                        <div class="w-full flex justify-end md:hidden">
                            <button @click="showSideBar=false" aria-label="Search button" class="item p-1 bg-gray-100 rounded-md m-1 hover:bg-gray-200">
                                <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="w-5 h-5 translate"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" class=""></path></svg>
                            </button>
                        </div>
                        <h2 v-if="$settings.sections.blog.sidebar.categories.active" class="px-2">{{ $settings.sections.blog.sidebar.categories.title }}</h2>
                        <div v-if="$settings.sections.blog.sidebar.categories.active" class="flex flex-col mb-2">
                            <div v-if="loading.categories" class="flex justify-center items-center my-5">
                                <si-loader></si-loader>
                            </div>
                            <div v-for="(item, i) in categories" :key="i" class="flex items-center px-2">
                                <input class="w-4 h-4 mx-1" :id="item.slug" @change="setParams($event, 'categories.slug-in', item.slug)" type="checkbox"/>
                                <label class="cursor-pointer capitalize" :for="item.slug">{{ item.name }}</label>
                            </div>
                        </div>
                        <hr>
                        <div v-if="products.length > 0 && $settings.sections.blog.sidebar.products.active" class="w-full">
                            <si-carousel :size="100" component="si-product" :title="$settings.sections.blog.sidebar.products.title" :list="products" itemClass="w-full"></si-carousel>
                        </div>
                    </div>
                </div>
            </transition>
            <div class="w-full md:w-3/4">
                <div class="bg-white">
                    <div class=" border-b">
                        <div class="flex justify-between items-center p-2">
                            <button @click="showSideBar = true" aria-label="Search button" class="flex block md:hidden items-center flex-col p-2 bg-gray-100 rounded-md mx-1 hover:bg-gray-200">
                                <span class="w-6 my-0.5 h-0.5 bg-gray-800"></span>
                                <span class="w-4 my-0.5 h-0.5 bg-gray-800"></span>
                                <span class="w-2 my-0.5 h-0.5 bg-gray-800"></span>
                                <span class="w-1 my-0.5 h-0.5 bg-gray-800"></span>
                            </button>
                            <select class="bg-white p-2 rounded shadow outline-none" v-model="params.sort">
                                <option v-for="(sort,i) in sorts" :key="i" :value="sort.field">{{ sort.name }}</option>
                            </select>
                            <div class="flex">
                                <button v-for="(grid,i) in girds" :key="i" @click="gridClass=grid.class" class="flex flex-wrap mx-0.5" :style="`width:${grid.width}px`">
                                    <span v-for="i in grid.number" :key="i" class="flex" :class="grid.class == gridClass ? 'bg-primary':'bg-gray-300'" style="margin:1px;width:4px;height:4px" ></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-if="loading.pages" class="flex justify-center items-center my-5">
                        <si-loader></si-loader>
                    </div>
                    <div v-if="!loading.pages && items.length == 0" class="flex justify-center items-center my-5">
                        <h1 class="py-3">{{ $settings.sections.blog.empty_text }}</h1>
                    </div>
                    <div class="flex flex-wrap">
                        <div v-for="(item, i) in items" :key="i" class="p-2" :class="gridClass">
                            <si-post :item="item"></si-post>
                        </div>
                    </div>
                    <div>
                        <!-- Pagination -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: {
                pages: true,
                products: true,
                categories: true,
            },
            query: {},
            param: [],
            products: [],
            showSideBar: false,
            gridClass: 'w-full md:w-1/2 lg:w-1/3',
            items: [],
            categories:[],
            paginate: { page: 1, limit: 12, total: 12 },
            params: { 'categories.slug-in': [], sort: { createdAt: -1 }, type: 'POST' },
            lastParams: { 'categories.slug-in': [], sort: { createdAt: -1 }, type: 'POST' },
            sorts: [
                { field: { 'name': 1 }, name: this.$settings.sections.blog.sorts.name_asc },
                { field: { 'name': -1 }, name: this.$settings.sections.blog.sorts.name_desc },
                { field: { createdAt: -1 }, name: this.$settings.sections.blog.sorts.newest },
                { field: { createdAt: 1 }, name: this.$settings.sections.blog.sorts.oldest }
            ],
            girds: [
                { number: 6, width: 16, class: 'w-full md:w-1/2 lg:w-1/2' },
                { number: 9, width: 21, class: 'w-full md:w-1/2 lg:w-1/3' },
                { number: 12, width: 26, class: 'w-1/2 md:w-1/3 lg:w-1/4' }
            ]
        }
    },
    watch: {
        params: {
            handler(val) {
                if(JSON.stringify(val) !== JSON.stringify(this.lastParams)){
                    this.getItems();
                }
            },
            deep: true
        }
    },
    async fetch(){
        await this.getItems();
        await this.getCategories();
        await this.getProducts();
        this.$store.state.seo.title = this.$settings.sections.blog.title + ' - ' + this.$settings.store_name;
        this.$store.state.seo.description = this.$settings.sections.blog.description || this.$settings.store_description;
    },
    mounted() {
      this.$storeino.fbpx('PageView')
    },
    methods: {
        setParams(e, key, value){
            if(key.indexOf('price') >= 0){
                this.$set(this.params,key, e.target.value);
            }else{
                if(e.target.checked) {
                    if(!this.params[key]) this.params[key] = this.$set(this.params, key, []);
                    this.params[key].push(value);
                } else {
                    this.params[key] = this.params[key].filter(item => item !== value);
                }
            }
            switch(key){
                case 'categories.slug-in': this.param = [...new Set(...this.param, value)];break;
                case 'price.salePrice-from': this.query['price-from'] = value;break;
                case 'price.salePrice-to': this.query['price-to'] = value;break;
                case 'options.values.value1': this.query['colors'] = value;break;
            }
        },
        async getProducts(){
            this.products = [];
            this.loading.products = true;
            try{
                const { data } = await this.$storeino.products.search({limit: 5});
                this.products = data.results;
            }catch(e){
                console.log({e});
            }
            this.loading.products = false;
        },
        async getCategories(){
            this.categories = [];
            this.loading.categories = true;
            try{
                const { data } = await this.$storeino.categories.search({});
                this.categories = data.results;
            }catch(e){
                console.log({e});
            }
            this.loading.categories = false;
        },
        async getItems(){
            this.items = [];
            this.loading.pages = true;
            try{
                this.lastParams = this.$tools.copy(this.params);
                const { data } = await this.$storeino.pages.search(this.params);
                this.items = data.results
            }catch(e){
                console.log({e});
            }
            this.loading.pages = false;
        },
    },
}
</script>
<style>
.color-option label{
    width: 24px;
    height: 24px;
    margin-left: 4px;
    margin-right: 4px;
    box-shadow: 0 0 0px 2px rgb(230, 230, 230);
}
.color-option.active label{
    color: transparent;
    box-shadow: 0 0 0px 2px white, 0 0 0px 4px var(--primary-color);
    margin-left: 6px;
    margin-right: 6px;
    width: 20px;
    height: 20px;
}

.slideleft-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.slideleft-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slideleft-enter-to, .slideleft-leave {
    width: 100%;
}

.slideleft-enter, .slideleft-leave-to {
    width: 0%;
}
/* Media screen mobile */
@media (max-width: 768px){
    .show {
        display: block !important;
    }
}

</style>

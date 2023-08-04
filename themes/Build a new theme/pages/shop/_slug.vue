<template>
    <div class="container">
        <div class="relative flex mb-2">

            <transition name="slideleft">
                <div :class="showSideBar ? 'show':'hide'" class="fixed top-0 bottom-0 z-20 hidden h-full bg-white w-80 md:w-1/4 md:block md:top-0 md:relative">
                    <div class="fixed inset-0 block bg-black bg-opacity-50 md:hidden" @click="showSideBar=false"></div>
                    <div class="relative flex flex-col h-full bg-white border-r">
                        <div class="flex justify-end w-full md:hidden">
                            <button @click="showSideBar=false" aria-label="Search button" class="p-1 m-1 bg-gray-100 rounded-md item hover:bg-gray-200">
                                <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="w-5 h-5 translate"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" class=""></path></svg>
                            </button>
                        </div>
                        <h2 v-if="$settings.sections.shop.sidebar.collections.active" class="px-2">{{ $settings.sections.shop.sidebar.collections.title }}</h2>
                        <div v-if="$settings.sections.shop.sidebar.collections.active" class="flex flex-col mb-2">
                            <div v-if="loading.collections" class="flex items-center justify-center my-5">
                                <si-loader></si-loader>
                            </div>
                            <div v-for="(item, i) in collections" :key="i" class="px-2">
                                <div class="flex items-center">
                                    <input v-if="item.childrens && item.childrens.length == 0 " class="w-4 h-4 mx-1" :checked="params['collections.slug-in'] && params['collections.slug-in'].indexOf(item.slug) >= 0" :id="item.slug" @change="setParams($event, 'collections.slug-in', item.slug)" type="checkbox"/>
                                    <label @click="setActive(i+'fit',i+'ret')" v-if="item.childrens && item.childrens.length > 0 " class="capitalize cursor-pointer collec-name" :for="item.slug">{{ item.name }}</label>
                                    <label v-if="item.childrens && item.childrens.length == 0 " class="capitalize cursor-pointer collec-name" :for="item.slug">{{ item.name }}</label>
                                    <svg @click="setActive(i+'fit',i+'ret')" :id="i+'ret'"  v-if="item.childrens && item.childrens.length > 0 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="15" height="15" x="0" y="0" viewBox="0 0 451.847 451.847" style="enable-background:new 0 0 512 512 ; cursor:pointer;" xml:space="preserve" class="rotated"><g>
                                        <g xmlns="http://www.w3.org/2000/svg">
                                            <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751   c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0   c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z" fill="#7a7575" data-original="#000000" style="" class=""/>
                                        </g>
                                        <g xmlns="http://www.w3.org/2000/svg">
                                        </g>
                                        <g xmlns="http://www.w3.org/2000/svg">
                                        </g>
                                        <g xmlns="http://www.w3.org/2000/svg">
                                        </g>
                                        <g xmlns="http://www.w3.org/2000/svg">
                                        </g>
                                        <g xmlns="http://www.w3.org/2000/svg">
                                        </g>
                                        <g xmlns="http://www.w3.org/2000/svg">
                                        </g>
                                        <g xmlns="http://www.w3.org/2000/svg">
                                        </g>
                                        <g xmlns="http://www.w3.org/2000/svg">
                                        </g>
                                        <g xmlns="http://www.w3.org/2000/svg">
                                        </g>
                                        <g xmlns="http://www.w3.org/2000/svg">
                                        </g>
                                        <g xmlns="http://www.w3.org/2000/svg">
                                        </g>
                                        <g xmlns="http://www.w3.org/2000/svg">
                                        </g>
                                        <g xmlns="http://www.w3.org/2000/svg">
                                        </g>
                                        <g xmlns="http://www.w3.org/2000/svg">
                                        </g>
                                        <g xmlns="http://www.w3.org/2000/svg">
                                        </g>
                                        </g>
                                    </svg>
                                </div>
                                <div :id="i+'fit'" class="fit-collapsible" :class="item.childrens.length > 0 ? 'sub-collections' : ''">
                                    <ul class="list-sub-collections fit-collapsible-content" v-if="item.childrens && item.childrens.length > 0" >
                                        <li v-for="(child, i) in item.childrens" :key="i">
                                            <input class="w-4 h-4 mx-1" :checked="params['collections.slug-in'] && params['collections.slug-in'].indexOf(child.slug) >= 0" :id="child.slug" @change="setParams($event, 'collections.slug-in', child.slug)" type="checkbox"/>
                                            <label  :for="child.slug" class="cursor-pointer c-p c-grey">{{ child.name }}</label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr v-if="$settings.sections.shop.sidebar.collections.active">
                        <h2 v-if="$settings.sections.shop.sidebar.prices.active" class="px-2 mt-2">{{ $settings.sections.shop.sidebar.prices.title }}</h2>
                        <div v-if="loading.filters" class="flex items-center justify-center my-5">
                            <si-loader></si-loader>
                        </div>
                        <div v-if="$settings.sections.shop.sidebar.prices.active && filters" class="flex flex-col mb-2" dir="ltr">
                            <si-price-range @change="setParams" :min="filters.prices.min" :max="filters.prices.max" />
                        </div>
                        <hr v-if="$settings.sections.shop.sidebar.prices.active">
                        <h2 class="px-2" v-if="$settings.sections.shop.sidebar.sizes.active">{{ $settings.sections.shop.sidebar.sizes.title }}</h2>
                        <div v-if="$settings.sections.shop.sidebar.sizes.active && loading.filters" class="flex items-center justify-center my-5">
                            <si-loader></si-loader>
                        </div>
                        <div v-if="$settings.sections.shop.sidebar.sizes.active && filters" class="flex flex-wrap mx-2 mb-2">
                            <div v-for="(item, i) in filters.sizes" :key="i" class="flex items-center m-0.5 rounded-md" :class="params['options.values.value1'] && params['options.values.value1'].indexOf(item.value1) >= 0 ? 'bg-primary text-white' : 'bg-gray-200' ">
                                <input hidden :id="item.value1" :checked="params['options.values.value1'] && params['options.values.value1'].indexOf(item.value1) >= 0" @change="setParams($event, 'options.values.value1', item.value1)" type="checkbox"/>
                                <label class="px-2 cursor-pointer" :for="item.value1">{{ item.value1 }}</label>
                            </div>
                        </div>
                        <hr v-if="$settings.sections.shop.sidebar.sizes.active">
                        <h2 class="px-2" v-if="$settings.sections.shop.sidebar.colors.active">{{ $settings.sections.shop.sidebar.colors.title }}</h2>
                        <div v-if="$settings.sections.shop.sidebar.colors.active && loading.filters" class="flex items-center justify-center my-5">
                            <si-loader></si-loader>
                        </div>
                        <div v-if="$settings.sections.shop.sidebar.colors.active && filters" class="flex flex-wrap mx-2 mb-2">
                            <div v-for="(item, i) in filters.colors" :key="i" class="flex items-center my-0.5 color-option" :class="params['options.values.value1'] && params['options.values.value1'].indexOf(item.value1) >= 0 ? 'active' : '' ">
                                <input hidden :id="item.value1" :checked="params['options.values.value1'] && params['options.values.value1'].indexOf(item.value1) >= 0" @change="setParams($event, 'options.values.value1', item.value1)" type="checkbox"/>
                                <label class="rounded-full cursor-pointer" :style="`background-color:${item.value2}`" :for="item.value1" :aria-label="item.value1"></label>
                            </div>
                        </div>
                        <hr v-if="$settings.sections.shop.sidebar.colors.active">
                        <h2 class="px-2" v-if="$settings.sections.shop.sidebar.tags.active">{{ $settings.sections.shop.sidebar.tags.title }}</h2>
                        <div v-if="$settings.sections.shop.sidebar.tags.active && loading.filters" class="flex items-center justify-center my-5">
                            <si-loader></si-loader>
                        </div>
                        <div v-if="$settings.sections.shop.sidebar.tags.active && filters" class="flex flex-col mb-2">
                            <div v-for="(tag, i) in filters.tags" :key="i" class="flex items-center px-2">
                                <input class="w-4 h-4 mx-1" :checked="params['tags-in'] && params['tags-in'].indexOf(tag) >= 0" :id="`tag_${tag}`" @change="setParams($event, 'tags-in', tag)" type="checkbox"/>
                                <label class="capitalize cursor-pointer" :for="`tag_${tag}`">{{ tag }}</label>
                            </div>
                        </div>
                        <hr v-if="$settings.sections.shop.sidebar.tags.active">
                        <h2 class="px-2" v-if="$settings.sections.shop.sidebar.brands.active">{{ $settings.sections.shop.sidebar.brands.title }}</h2>
                        <div class="flex flex-col mb-2">
                            <div v-if="$settings.sections.shop.sidebar.brands.active && loading.brands" class="flex items-center justify-center my-5">
                                <si-loader></si-loader>
                            </div>
                            <div v-if="$settings.sections.shop.sidebar.brands.active">
                                <div v-for="(item, i) in brands" :key="i" class="flex items-center px-2">
                                    <input class="w-4 h-4 mx-1" :id="item.slug" :checked="params['brand.slug-in'] && params['brand.slug-in'].indexOf(item.slug) >= 0" @change="setParams($event, 'brand.slug-in', item.slug)" type="checkbox"/>
                                    <label class="capitalize cursor-pointer" :for="item.slug">{{ item.name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <div class="w-full md:w-3/4">
                <div class="bg-white">
                    <div class="border-b">
                        <div class="flex items-center justify-between p-2">
                            <button @click="showSideBar = true" aria-label="Search button" class="flex flex-col items-center block p-2 mx-1 bg-gray-100 rounded-md md:hidden hover:bg-gray-200">
                                <span class="w-6 my-0.5 h-0.5 bg-gray-800"></span>
                                <span class="w-4 my-0.5 h-0.5 bg-gray-800"></span>
                                <span class="w-2 my-0.5 h-0.5 bg-gray-800"></span>
                                <span class="w-1 my-0.5 h-0.5 bg-gray-800"></span>
                            </button>
                            <select class="p-2 bg-white rounded shadow outline-none" v-model="params.sort">
                                <option v-for="(sort,i) in sorts" :key="i" :value="sort.field">{{ sort.name }}</option>
                            </select>
                            <div class="flex">
                                <button v-for="(grid,i) in girds" :key="i" @click="gridClass=grid.class" class="flex flex-wrap mx-0.5" :style="`width:${grid.width}px`">
                                    <span v-for="i in grid.number" :key="i" class="flex" :class="grid.class == gridClass ? 'bg-primary':'bg-gray-300'" style="margin:1px;width:4px;height:4px" ></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-if="loading.products" class="flex items-center justify-center my-5">
                        <si-loader></si-loader>
                    </div>
                    <div v-if="!loading.products && items.length == 0" class="flex items-center justify-center my-5">
                        <h1 class="py-3">{{ $settings.sections.shop.empty_text }}</h1>
                    </div>
                    <div class="flex flex-wrap">
                        <div v-for="(item, i) in items" :key="i" class="p-2 home-products" :class="gridClass">
                            <si-product :item="item"></si-product>
                        </div>
                    </div>
                    <div v-if="items.length>0" class="flex items-center justify-end w-full p-2 bg-white border-t">
                        <button class="flex items-center p-2 text-white bg-primary" @click="getItems(paginate.current_page-1)">
                            <svg class="h-4 translate" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>
                            <span>&ensp;</span>
                            <span>{{ $settings.sections.shop.pagination.prev_text }}</span>
                        </button>
                        <span>&ensp;</span>
                        <span>{{paginate.current_page}}/{{paginate.last_page}}</span>
                        <span>&ensp;</span>
                        <button class="flex items-center p-2 text-white bg-primary" @click="getItems(paginate.current_page+1)">
                            <span>{{ $settings.sections.shop.pagination.next_text }}</span>
                            <span>&ensp;</span>
                            <svg class="h-4 translate" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
                        </button>
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
                products: true,
                filters: true,
                collections: true,
                brands: true,
            },
            query: {},
            param: [],
            filters: null,
            showSideBar: false,
            gridClass: this.$settings.sections.shop.products ? this.$settings.sections.shop.products.default_size : 'w-full md:w-1/2 lg:w-1/3',
            items: [],
            collections:[],
            brands: [],
            paginate: { page: 1, limit: this.$settings.sections.shop.pagination.limit, total: 12 },
            params: { page: 1, search: this.$route.query.search, limit: this.$settings.sections.shop.pagination.limit, 'collections.slug-in': [], sort: { createdAt: -1 } },
            lastParams: { page: 1, search: this.$route.query.search, limit: this.$settings.sections.shop.pagination.limit, 'collections.slug-in': [], sort: { createdAt: -1 } },
            sorts: [
                { field: { 'price.salePrice': 1 }, name: this.$settings.sections.shop.sorts.price_asc },
                { field: { 'price.salePrice': -1 }, name: this.$settings.sections.shop.sorts.price_desc },
                { field: { 'review.rating': -1 }, name: this.$settings.sections.shop.sorts.rating_desc },
                { field: { 'review.rating': 1 }, name: this.$settings.sections.shop.sorts.rating_asc },
                { field: { 'name': 1 }, name: this.$settings.sections.shop.sorts.name_asc },
                { field: { 'name': -1 }, name: this.$settings.sections.shop.sorts.name_desc },
                { field: { createdAt: -1 }, name: this.$settings.sections.shop.sorts.newest },
                { field: { createdAt: 1 }, name: this.$settings.sections.shop.sorts.oldest }
            ],
            girds: [
                { number: 6, width: 16, class: 'w-full md:w-1/2' },
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
        },
        "$route.query.search"(val){
            this.$set(this.params, 'search', val);
        }
    },
    async fetch(){
        this.$store.state.seo.title = this.$settings.sections.shop.title + ' - ' + this.$settings.store_name;
        this.$store.state.seo.description = this.$settings.sections.shop.description || this.$settings.store_description;
        if(this.$route.params.slug){
            this.param = this.$route.params.slug.split(',');
            this.$route.params.slug.split(',').forEach(item => {
                this.params['collections.slug-in'].push(item);
            });
        }
        for (const key in this.$route.query) {
            if(!this.$route.query[key]) continue;
            switch (key) {
                case 'price-from': this.$set(this.params, 'price.salePrice-from', this.$route.query[key]);break;
                case 'price-to': this.$set(this.params, 'price.salePrice-to', this.$route.query[key]);break;
                case 'colors-size': this.$set(this.params, 'options.values.value1', this.$route.query[key].split(','));break;
                case 'tags': this.$set(this.params, 'tags-in', this.$route.query[key].split(','));break;
                case 'brands': this.$set(this.params, 'brand.slug-in', this.$route.query[key].split(','));break;
                case 'page': this.$set(this.params, 'page', this.$route.query[key]);break;
            }
        }
        this.lastParams = this.params;
        await this.getFilters();
        await this.getItems();
        await this.getCollections();
        await this.getBrands();
        this.subCollections();
    },
    methods: {
        subCollections(){
            for(let itm of this.collections){
                if(itm.childrens && itm.childrens.length>0) itm.childrens = [];
            }
            for(let i=0; i<this.collections.length; i++){
                for(let j=0; j<this.collections.length; j++){
                    if(this.collections[i].parent == this.collections[j]._id ){
                    let childObject = this.collections[i];
                    this.collections[j].childrens.push(childObject);
                    this.collections.splice(i,1);
                        i--;
                    }
                }
            }
        },
        setActive:function(id,idRet){
            var element = document.getElementById(id);
            if(element.classList.contains('active')){
                element.classList.remove('active');
            }else{
                element.classList.add('active');
            }
            var icon = document.getElementById(idRet);
            if(icon.classList.contains('active')){
                icon.classList.remove('active');
            }else{
                icon.classList.add('active');
            }
        },
        setParams(e, key, value){
            if(key.indexOf('price') >= 0 || key.indexOf('page') >= 0){
                this.$set(this.params,key, e.target.value);
                return false;
            }else{
                if(e.target.checked) {
                    if(!this.params[key]) this.params[key] = this.$set(this.params, key, []);
                    this.params[key].push(value);
                } else {
                    this.params[key] = this.params[key].filter(item => item !== value);
                }
            }
            for (const key in this.params) {
                switch(key){
                    case 'collections.slug-in': this.param = this.params[key];break;
                    case 'price.salePrice-from': this.query['price-from'] = this.params[key];break;
                    case 'price.salePrice-to': this.query['price-to'] = this.params[key];break;
                    case 'options.values.value1': this.query['colors-size'] = this.params[key];break;
                    case 'tags-in': this.query['tags'] = this.params[key];break;
                    case 'brand.slug-in': this.query['brands'] = this.params[key];break;
                    case 'page': this.query['page'] = [this.params[key]];break;
                }
            }
            let url = `/shop/`;
            url += this.param.length > 0 ? [...new Set(this.param)].join(',') : '';
            for (const key in this.query) {
                url += url.indexOf('?') == -1 ? '?' : '&';
                if(typeof this.query[key] == 'object'){
                    url += `${key}=${this.query[key].join(',')}`;
                }else url += `${key}=${this.query[key]}`;
            }
            window.history.pushState({}, '', url);
        },
        async getFilters(){
            this.filters = null;
            this.loading.filters = true;
            try{
                const { data } = await this.$storeino.products.filters({});
                this.filters = data;
            }catch(e){
                console.log({e});
            }
            this.loading.filters = false;
        },
        async getCollections(){
            this.collections = [];
            this.loading.collections = true;
            try{
                const { data } = await this.$storeino.collections.search({});
                this.collections = data.results;
            }catch(e){
                console.log({e});
            }
            this.loading.collections = false;
        },
        async getBrands(){
            this.brands = [];
            this.loading.brands = true;
            try{
                const { data } = await this.$storeino.brands.search({});
                this.brands = data.results;
            }catch(e){
                console.log({e});
            }
            this.loading.brands = false;
        },
        async getItems(page=null){
            if(page != null) this.setParams({target:{value: page}}, 'page', page);
            this.items = [];
            this.loading.products = true;
            try{
                this.params.search = this.$route.query.search;
                this.params.page = page || this.paginate.current_page;
                this.params.limit = this.$settings.sections.shop.pagination.limit;
                this.lastParams = this.$tools.copy(this.params);
                const {data} = await this.$storeino.products.search(this.params);
                this.items = data.results;
                this.paginate = data.paginate;
            }catch(e){
                console.log({e});
            }
            this.loading.products = false;
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

[dir="ltr"] .collec-name{
    margin-right: auto;
}

[dir="rtl"] .collec-name{
    margin-left:auto;
}


[dir="ltr"]  .sub-collections .list-sub-collections{
    list-style: none;
    padding-left:40px;
}

  [dir="rtl"]  .sub-collections .list-sub-collections{
    list-style: none;
    padding-right:40px;
  }

  [dir="rtl"]  .list-sub-collections li{
    text-align: right;
  }

 .fit-collapsible{
    overflow: unset;
    text-align: left;
    display: block;
    margin: 0;
    border: 0;
    outline: 0;
    vertical-align: baseline;
    background: 0 0;
  }

  .fit-collapsible .fit-collapsible-content{
    max-height: 0;
    position: relative;
    overflow: hidden;
    transition: 0.4s;
  }

  .fit-collapsible.active .fit-collapsible-content{
    max-height: 500px;
  }

  .rotated{
    transform: rotate(-92deg);
    transition: 0.3s;
  }

  .rotated.active{
    transform: rotate(0deg);
  }

  [dir="rtl"] .rotated {
    transform: rotate(92deg);
    transition: 0.3s;
  }

[dir="rtl"] .rotated.active{
    transform: rotate(0deg);
  }

</style>

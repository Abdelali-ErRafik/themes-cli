<template>
<div class="flex fixed inset-0 z-20" v-if="show">
    <div v-if="$store.state.showHeaderMenu" :class="$store.state.showHeaderMenu? 'opacity-50' : 'opacity-0'" class="flex transition-all delay-500 fixed inset-0 bg-black" @click="$store.state.showHeaderMenu=false"></div>
    <transition name="slideleft">
        <div :class="$store.state.showHeaderMenu ? 'move-in' : 'move-out'" class="transition-all delay-500 max-w-full relative flex flex-col bg-gray-100 w-80">
            <div class="w-full flex justify-end bg-white">
                <button @click="$store.state.showHeaderMenu=false" aria-label="Search button" class="item p-1 bg-gray-100 rounded-md m-1 hover:bg-gray-200">
                    <si-svg><svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="w-5 h-5 translate"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" class=""></path></svg></si-svg>
                </button>
            </div>
            <div v-if="menu">
                <ul v-for="(item, i) in menu.items" :key="i" class="flex flex-col">
                    <li class="flex items-center mb-1 justify-between w-full rounded-md bg-white">
                        <router-link class="p-2 m-1 w-full flex hover:text-green-700" :to="item.url">{{ item.text }}</router-link>
                        <button class="bg-white p-2 mx-1" @click="activeId = activeId != item._id ? item._id : null">
                            <si-svg>
                                <svg v-if="item.childrens && item.childrens.length > 0" class="w-3 transform" :class="activeId==item._id ? 'rotate-180': ''" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve">
                                    <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                                </svg>
                            </si-svg>
                        </button>
                    </li>
                    <transition name="slide">
                    <div v-if="item._id == activeId">
                        <div v-for="(item,i) in item.childrens" :key="i" class="bg-gray-100">
                            <router-link class="p-2 m-1 rounded-md bg-gray-50 hover:bg-white hover:text-green-700 flex" :to="item.url">{{item.text}}</router-link>
                            <ul class="p-2" v-if="item.childrens && item.childrens.length > 0">
                                <li v-for="(child,ii) in item.childrens" :key="ii">
                                    <nuxt-link  class="p-2 m-1 rounded-md bg-gray-50 hover:bg-white hover:text-green-700 flex" :to="child.url">
                                        {{ child.text }}
                                    </nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </transition>
                </ul>
            </div>
            <div class="border-t border-b p-2 bg-white my-2 flex justify-center">
                <router-link v-if="$settings.sections.header.icons.account" to="/account/orders" title="Account" class="item p-2 bg-gray-100 rounded-md mx-1 hover:bg-gray-200">
                    <si-svg><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 h-5 translate"><path fill="currentColor" d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path></svg></si-svg>
                </router-link>
                <router-link v-if="$settings.sections.header.icons.wishlist" to="/wishlist" title="Wishlist" class="item p-2 bg-gray-100 rounded-md mx-1 hover:bg-gray-200 relative">
                    <si-svg><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 translate"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z" class=""></path></svg></si-svg>
                    <small class="-top-2 -right-2 rounded-full absolute w-5 h-5 p-2 bg-red-700 text-white flex justify-center items-center">{{ $store.state.wishlist.length }}</small>
                </router-link>
            </div>
            <div>
                <ul v-for="(item, i) in otherMenu" :key="i" class="flex flex-col">
                    <li class="flex items-center mb-1 justify-between w-full rounded-md bg-white">
                        <a class="p-2 m-1 w-full flex hover:text-green-700" :href="item.url">{{ item.text }}</a>
                        <button class="bg-white p-2 mx-1" @click="activeId = activeId != item._id ? item._id : null">
                            <svg v-if="item.childrens && item.childrens.length > 0" class="w-3 transform" :class="activeId==item._id ? 'rotate-180': ''" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve">
                                <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                            </svg>
                        </button>
                    </li>
                    <transition name="slide">
                    <div v-if="item._id == activeId">
                        <div v-for="(item,i) in item.childrens" :key="i" class="bg-gray-100">
                            <a class="p-2 m-1 rounded-md bg-gray-50 hover:bg-white hover:text-green-700 flex" :href="item.url">{{item.text}}</a>
                            <ul class="p-2" v-if="item.childrens && item.childrens.length > 0">
                                <li v-for="(child,ii) in item.childrens" :key="ii">
                                    <a class="p-2 m-1 rounded-md bg-gray-50 hover:bg-white hover:text-green-700 flex" :href="child.url">
                                        {{ child.text }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </transition>
                </ul>
            </div>
        </div>
     </transition>
</div>
</template>
<script>
export default {
    data() {
        return {
            show: false,
            activeId: null,
            menu: this.$settings.sections.header.menu,
            otherMenu: [
                {
                    _id: "lang",
                    text: this.$store.state.language.code,
                    active: this.$settings.sections.header.icons.language,
                    childrens: this.$settings.store_languages.map(l=> {
                        return {
                            _id: l.code,
                            text: l.name,
                            url: `?lang=${l.code}`
                        }
                    })
                },
                {
                    _id: "currency",
                    text: this.$store.state.currency.code,
                    active: this.$settings.sections.header.icons.currency,
                    childrens: this.$settings.store_currencies.map(c=> {
                        return {
                            _id: c.code,
                            text: c.name,
                            url: `?cur=${c.code}`
                        }
                    })
                }
            ].filter(item=> item.active)
        }
    },
    watch: {
        "$route.params": {
            handler() {
                this.$store.state.showHeaderMenu = false
            },
            deep: true
        },
        "$store.state.showHeaderMenu"(val){
            if(val){
                this.show = val;
            }else{
                setTimeout(() => {
                    this.show = val;
                },500);
            }
        }
    }
}
</script>
<style>
[dir='ltr'] .move-out{ transform: translateX(-40em); }
[dir='ltr'] .move-in{ transform: translateX(-20em); }
[dir="rtl"] .move-out{ transform: translateX(40em); }
[dir="rtl"] .move-in{ transform: translateX(20em); }
</style>

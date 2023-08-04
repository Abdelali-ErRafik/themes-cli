<template>
  <div class="bg-white">
      <div class="flex flex-wrap justify-start container" v-if="menu">
        <div v-for="(item,i) in menu.items" :key="i" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <div class="p-2 h-full border-l border-r">
                <h4 class="text-xl menu-title px-2">
                    <router-link :to="item.url">{{item.text}}</router-link>
                </h4>
                <ul class="p-2" v-if="item.childrens && item.childrens.length > 0">
                    <li v-for="(child,ii) in item.childrens" :key="ii">
                        <nuxt-link :to="child.url" class="submenu-title">
                            {{ child.text }}
                        </nuxt-link>
                        <ul class="p-2 rounded-md bg-gray-100" v-if="child.childrens && child.childrens.length > 0">
                            <li v-for="(child2,iii) in child.childrens" :key="iii">
                                <nuxt-link :to="child2.url" class="subsubmenu-title">
                                    {{ child2.text }}
                                </nuxt-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: this.$settings.sections.footer.menu
    };
  },
};
</script>
<style>
    .menu-title{
        border-left: 4px solid var(--primary-color);
    }
</style>

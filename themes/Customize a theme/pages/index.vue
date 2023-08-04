<template>
  <div>
    <sections-banner v-if="$settings.sections.banner.active"></sections-banner>
    <sections-collections v-if="$settings.sections.collections.active"></sections-collections>
    <template v-for="i in 5">
      <sections-products :key="i" :data-key="i" v-if="$settings.sections[`products_${i}`].active" :section="$settings.sections[`products_${i}`]"></sections-products>
    </template>
    <sections-posts v-if="$settings.sections.posts.active"></sections-posts>
    <sections-services v-if="$settings.sections.services.active"></sections-services>
    <div class="container">
      <si-app-loader  placement="BEFORE_HOME_FOOTER"/>
    </div>
  </div>
</template>
<script>
export default {
  async fetch(){
    this.$store.state.seo.title = this.$settings.store_name;
    this.$store.state.seo.description = this.$settings.store_description;
  },
  mounted() {
    this.$tools.call('PAGE_VIEW');
    this.$storeino.fbpx('PageView')
  },
}
</script>

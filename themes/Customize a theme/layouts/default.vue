<template>
    <div class="bg-gray-50 transition-all delay-300" :class="$store.state.showHeaderMenu ? 'to-right' : ''">
        <component :is="'style'">
            :root{ --primary-rgb: {{ rgb.r }}, {{rgb.g}}, {{ rgb.b }}; --primary-color: rgb(var(--primary-rgb)); }
            .bg-primary{ background-color: var(--primary-color); }
            .bg-primary:hover{ background-color: rgb(var(--primary-rgb),0.8); }
            .text-primary{ color: var(--primary-color); }
        </component>
        <sections-header-top></sections-header-top>
        <sections-header></sections-header>
        <sections-header-menu></sections-header-menu>
        <Nuxt />
        <sections-footer></sections-footer>
        <div class="bg-white flex">
            <hr class="my-2 w-full">
        </div>
        <sections-footer-menu></sections-footer-menu>
        <sections-copyright></sections-copyright>
        <si-full-image></si-full-image>
        <div dir="ltr" class="currency-switcher" v-if="$store.state.showCurrencyModal">
        <div class="currency-switcher-overlay" @click="$store.state.showCurrencyModal=false"></div>
        <form class="currency-switcher-modal">
          <div class="currency-switcher-header">
            Switch Language/Currency
          </div>
          <div class="currency-switcher-body">
            <div class="currency-switcher-inputs">
              <div class="currency-switcher-input">
                <label for="currency-switcher-currency">Currency</label>
                <select id="currency-switcher-currency" class="bg-gray-100" name="currency" v-model="$store.state.currency.code">
                  <option v-for="currency in $settings.store_currencies" :key="currency.code" :value="currency.code">{{ currency.name }} ({{ currency.symbol }})</option>
                </select>
              </div>
              <div class="currency-switcher-input">
                <label for="currency-switcher-currency">Language</label>
                <select id="currency-switcher-language" class="bg-gray-100" name="lang" v-model="$store.state.language.code">
                  <option v-for="language in $settings.store_languages" :key="language.code" :value="language.code">{{ language.name }} ({{ language.code }})</option>
                </select>
              </div>
            </div>
          </div>
          <div class="currency-switcher-actions">
            <button type="button" @click="$store.state.showCurrencyModal=false">Cancel</button>
            <button type="submit">Switch</button>
          </div>
        </form>
      </div>
      <div v-if="$settings.other_scripts" class="other-scripts" v-html="$settings.other_scripts"></div>

    </div>
</template>
<script>
export default {
    head(){
        return {
            title: this.$store.state.seo.title,
            meta: [
                { hid: 'description', name: 'description', content: this.$store.state.seo.description },
                { hid: 'keywords', name: 'keywords', content: this.$store.state.seo.keywords.join(',') },
                { hid: 'og:title', property: 'og:title', content: this.$store.state.seo.title },
                { hid: 'og:site_name', property: 'og:site_name', content: this.$settings.store_name },
                { hid: 'og:description', property: 'og:description', content: this.$store.state.seo.description },
                { hid: 'og:image', property: 'og:image', content: this.$store.state.seo.image },
                { hid: 'og:url', property: 'og:url', content: this.$store.state.seo.url },
                { hid: 'og:type', property: 'og:type', content: 'website' },
                { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                { hid: 'twitter:title', name: 'twitter:title', content: this.$store.state.seo.title },
                { hid: 'twitter:description', name: 'twitter:description', content: this.$store.state.seo.description },
                { hid: 'twitter:image', name: 'twitter:image', content: this.$store.state.seo.logo },
                { hid: 'twitter:url', name: 'twitter:url', content: this.$store.state.seo.url },
                { hid: "theme-color", property: "theme-color", content: this.$settings.style.primary_color },
                { hid: "currency", name: "currency", content: this.$store.state.currency.code },
                { hid: "product:price:currency", property: "product:price:currency", content: this.$store.state.currency.code },
                { hid: "priceCurrency", itemprop: "priceCurrency", content: this.$store.state.currency.code },
                ...this.$store.state.seo.metaTags
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: this.$settings.store_favicon ? this.$settings.store_favicon.src : this.$store.state.defaults.icon },
                { rel: "dns-prefetch", href: 'https://storeno.b-cdn.net/stores/' },
                { rel: 'preconnect', href: 'https://connect.facebook.net', crossorigin: "anonymous" },
                { rel: 'preload', href: 'https://connect.facebook.net/en_US/fbevents.js', as: 'script' },
                ...this.otherLinks
            ],
            htmlAttrs: {
                lang: this.$store.state.language.code,
                dir: this.$store.state.language.code == 'AR' ? 'rtl' : 'ltr'
            }
        }
    },
    data() {
        return {
            rgb: { r: 0, g: 130, b: 70 },
            otherLinks: [
                ]
        }
    },
    async fetch(){
        this.$store.state.seo.title = this.$settings.store_name;
        this.$store.state.seo.description = this.$settings.store_description;
        this.$store.state.seo.keywords = this.$settings.store_keywords || [];
        if(this.$settings.store_og_image){ this.$store.state.seo.image = this.$settings.store_og_image.src; }
        if(this.$settings.favicon){ this.$store.state.seo.favicon = this.$settings.favicon.src; }
        this.rgb = this.$tools.hexToRgb(this.$settings.style.primary_color);
        if(this.$store.state.language.code == 'AR'){
            this.otherLinks = [
                { rel: "preconnect", href: 'https://fonts.googleapis.com' },
                { rel: "preconnect", href: 'https://fonts.gstatic.com', crossorigin: true },
                { rel: "stylesheet", href: 'https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700&display=swap' }
            ]
        }
    },
    methods: {
    }
}
</script>
<style>
    [dir='ltr'] .to-right{
        transform: translateX(20rem);
    }
    [dir='rtl'] .to-right{
        transform: translateX(-20rem) !important;
    }
    .currency-switcher {display: flex; position: fixed; z-index: 9999; top: 0; left: 0; width: 100%; height: 100%; align-items: center; justify-content: center; background: #00000078;}
    .currency-switcher-overlay {position: fixed; top: 0; left: 0; width: 100%; height: 100%;}
    .currency-switcher-modal {background: white;border-radius: 10px;min-width: 320px; position: relative;}
    .currency-switcher-header {padding: 5px 10px;font-size: 1.25em;font-weight: bold;border-bottom: 1px solid #00000026;}
    .currency-switcher-actions {display: flex;justify-content: space-between;padding: 5px;border-top: 1px solid #0000003d;}
    .currency-switcher-actions button {border: 0;padding: 10px;border-radius: 5px;cursor: pointer;}
    .currency-switcher-actions button:nth-child(2) {background-color: #479c4a;color: white;}
    .currency-switcher-input {padding: 10px;}
    .currency-switcher-input select {padding: 4px;border-radius: 4px;}
    .currency-switcher-input label {text-transform: uppercase;min-width: 90px;display: inline-block;}
</style>


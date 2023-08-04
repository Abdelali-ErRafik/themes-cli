<template>
    <div class="container">
        <div v-if="loading" class="flex items-center justify-center my-5">
            <si-loader></si-loader>
        </div>
        <div class="flex flex-wrap" v-if="item">
            <meta itemprop="productID" :content="item._id" />
            <div class="w-full md:w-1/2">
                <div class="relative flex flex-col p-2">
                    <button v-if="$store.state.wishlist.find(i=>i._id==item._id)" @click="removeFromWishlist" title="Wishlist" class="absolute p-2 m-2 mx-1 bg-gray-100 rounded-md item top-1 right-2 hover:bg-gray-200">
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 text-red-600 translate"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
                    </button>
                    <button v-else @click="addToWishlist" title="Wishlist" class="absolute p-2 m-2 mx-1 bg-gray-100 rounded-md item top-1 right-2 hover:bg-gray-200">
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 translate"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z" class=""></path></svg>
                    </button>
                    <si-image width="500" height="500" class="w-full bg-white rounded-md shadow cursor-pointer"  @click="$store.state.fullImage=image ? image.src : null" :src="image ? image.src : null " :alt="item.name"/>
                    <div class="w-full overflow-auto">
                        <div class="flex bg-gray-100">
                            <si-image width="100" height="100" class="w-16 h-16 m-1 bg-white rounded-md shadow cursor-pointer" v-for="(image, index) in item.images" @click="setImage(index)" :key="index" :src="image.src" :alt="`${item.name} - ${image.title}`"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full md:w-1/2">
                <div class="p-2">
                    <div class="p-2 bg-white">
                        <h1 class="mb-2 text-3xl font-bold">{{ item.name }}</h1>
                        <meta itemprop="name" :content="item.name" />
                        <div class="flex items-center justify-start mb-2" v-if="$settings.sections.product.reviews.active">
                            <div class="flex mb-1">
                                <span v-for="(star,i) in 5" :class="star <= item.review.rating ? 'text-yellow-500 ': 'text-gray-400'" :key="i">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-5 h-5 translate"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path></svg>
                                </span>
                            </div>
                            <span class="text-sm text-gray-600" key="count">({{ item.review.reviews.length }})</span>
                        </div>
                        <p class="text-xl">{{ item.description }}</p>
                        <si-product-variants class="flex" v-if="item.type=='variable'" :options="item.options" :images="item.images" :variants="item.variants" @selected="variantSelected"></si-product-variants>
                        <si-product-price class="flex text-3xl" :type="'simple'" :price="price" :variants="[]"></si-product-price>
                        <div class="flex justify-start" v-show="!outofstock">
                            <si-product-quantity @selected="quantitySelected" :quantity="quantity"></si-product-quantity>
                        </div>
                        <hr class="my-2">
                        <si-app-loader placement="BEFORE_ADD_TO_CART"/>
                        <div v-if="outofstock" class="flex justify-center p-2 text-white bg-red-700 ai-c">
                                <b>{{ 'Out of stock' }}</b>
                        </div>
                        <div v-else class="flex flex-wrap md:flex-nowrap">
                            <button v-if="$settings.sections.product.add_to_cart.active" @click="addToCart" class="flex justify-center w-full p-2 text-white ai-c bg-primary click-effect">
                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-6 h-6 translate"><path fill="currentColor" d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"></path></svg>
                                <span>&ensp;</span>
                                <span class="w-full">{{ $settings.sections.product.add_to_cart.text }}</span>
                            </button>
                            <span class="w-1 h-1"></span>
                            <button v-if="$settings.sections.product.buy_now.active" v-show="!$store.state.apps.find(a=>a.placement.indexOf('REPLACE_BUYNOW') >= 0)" @click="buyNow" class="flex justify-center w-full p-2 text-white ai-c bg-primary click-effect">
                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-6 h-6 translate"><path fill="currentColor" d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"></path></svg>
                                <span>&ensp;</span>
                                <span class="w-full">{{ $settings.sections.product.buy_now.text }}</span>
                            </button>
                        </div>
                        <si-app-loader v-show="!outofstock" placement="REPLACE_BUYNOW"/>
                        <si-app-loader placement="AFTER_ADD_TO_CART"/>
                    </div>
                    <div class="my-2 bg-white " v-if="$settings.sections.product.share_buttons">
                        <div class="flex items-center">
                            <div class="flex w-full border-b border-gray-200 "></div>
                            <h3 class="p-2 whitespace-nowrap">{{ $settings.sections.product.share_buttons.title }}</h3>
                            <div class="flex w-full border-b border-gray-200 "></div>
                        </div>
                        <div class="flex justify-center ">
                            <div v-for="item in socialMedia.filter(s=>$settings.sections.product.share_buttons[s.name])" :key="item.name" class="flex items-center justify-center h-12 m-2">
                                <a class="flex h-full" :href="item.url" target="_blank" rel="noopener noreferrer">
                                    <si-image class="w-10 h-10" width="40" height="40" :src="item.image" :alt="item.name"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showVarianteModal" class="d-f modal_variante">
    <div class="p-2 modal_variante_content">
      <div class="mb-2 row fs-1-2 ai-c fw-b">
       <p>{{ t('check_choice') }}</p>
       <span class="px-2 c-p b-b br-8" @click="showVarianteModal = false">X</span>
      </div>

      <div class="mb-1 w-f row">
        <div  v-if="showVarianteModal">
          <p class="fw-b fs-1-5">{{ variant.name }}</p>
          <p class="fw-b fs-1">{{ variant.price.salePrice }} {{ $store.state.currency.symbol }}  <small class="fw-500" style="color: #2aa900;">{{ variant.quantity.instock >= quantity ? 'Disponible' : 'OutOfstock'  }}</small></p>
        </div>
        <div class="d-f ai-c jc-c">
            <div class="flex justify-start" v-show="!outofstock">
             <si-product-quantity @selected="quantitySelected" :quantity="quantity"></si-product-quantity>
             </div>
        </div>
      </div>

      <div class="text-div w-f ai-c">
        <div class="fw-w w-f jc-sb" style="height: 2px;background-color: black;" />
        <div class="mb-1 border-solid d-f ai-c w-f" @click="showVariantDiv = !showVariantDiv">
          <div class="d-f ai-c jc-c w-f"><p>{{ t('can_change_choice') }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" v-if="!showVariantDiv" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" v-if="showVariantDiv" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          </div>
        </div>
        <div class="fw-w w-f jc-sb" style="height: 2px;background-color: black;" />
      </div>
      <div v-if="showVariantDiv">
          <si-product-variants class="flex" v-if="item.type == 'variable'" :options="item.options" :images="item.images" :variants="item.variants" @selected="variantSelected"></si-product-variants>
      </div>
      <div class="w-f" >
        <div class="lg-col-12">
            <button  @click="buyNow" class="flex justify-center w-full p-2 text-white ai-c bg-primary click-effect">
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-6 h-6 translate"><path fill="currentColor" d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"></path></svg>
                <span>&ensp;</span>
                <span class="w-full">{{ $settings.sections.product.buy_now.text }}</span>
            </button>
        </div>
      </div>
    </div>
  </div>
        <div v-if="item" class="flex flex-col">
            <div v-if="item && $settings.sections.product.upsell.active" class="upsells">
                <sections-upsell :item="item.upsell"/>
            </div>
            <div  v-if="item" class="p-2 mx-2 my-3 bg-white rounded-md description" id="description" v-html="item.html"></div>
            <si-app-loader placement="AFTER_DESCRIPTION"/>
            <div v-if="item && $settings.sections.product.reviews.active" class="reviews">
                <sections-reviews v-show="!$store.state.apps.find(a=>a.placement.indexOf('REPLACE_REVIEWS') >= 0)" :item="item"></sections-reviews>
            </div>
            <si-app-loader  placement="REPLACE_REVIEWS"/>
            <div v-if="item && $settings.sections.product.related.active" class="related">
                <sections-related-products :item="item"/>
            </div>
        </div>
    </div>
</template>
<script>
import 'leaflet/dist/leaflet.css';
export default {
    data() {
        return {
            loading: true,
            item: null,
            image: null,
            tab: 'description',
            outofstock: false,
            quantity: {},
            showVariantDiv:false,
            showVarianteModal:false,
            variant: null,
            price: { salePrice: 0, comparePrice: 0 },
            socialMedia: [
                {
                    name: 'whatsapp',
                    url: 'https://api.whatsapp.com/send?text={title}%20{url}',
                    image: 'https://storeno.b-cdn.net/themes/palest/whatsapp.png'
                },
                {
                    name: 'facebook',
                    image: 'https://storeno.b-cdn.net/themes/palest/facebook.png',
                    url: 'https://www.facebook.com/sharer.php?u={url}'
                },
                {
                    name: 'twitter',
                    url: 'https://twitter.com/intent/tweet?url={url}&text={title}',
                    image: 'https://storeno.b-cdn.net/themes/palest/twitter.png'
                },
                {
                    name: 'linkedin',
                    url: 'https://www.linkedin.com/sharing/share-offsite/?url={url}',
                    image: 'https://storeno.b-cdn.net/themes/palest/linkedin.png'
                }
            ]
        }
    },
    async fetch() {
        const { slug } = this.$route.params;
        try{
            const { data } = await this.$storeino.products.get({ slug })
            this.item = data;

            this.$store.state.seo.title = (this.item.seo.title || this.item.name) + ' - ' + this.$settings.store_name;
            this.$store.state.seo.description = this.item.seo.description || this.item.description || this.$settings.store_description;
            this.$store.state.seo.keywords = this.item.seo.keywords.length > 0 ? this.item.seo.keywords || [] : this.$settings.store_keywords || [];
            if(this.item.images.length > 0){ this.$store.state.seo.image = this.item.images[0].src; }
            // New meta tags
            [ { hid: "product:price:amount", property: "product:price:amount", content: this.price.salePrice },
            { hid: "productID", itemprop: "productID", content: this.item && this.item ? this.item._id : 'productID' }
            ].forEach(meta=>{
                const index = this.$store.state.seo.metaTags.findIndex(m=>m.hid === meta.hid);
                if(index > -1){ this.$store.state.seo.metaTags.splice(index, 1, meta); }
                this.$store.state.seo.metaTags.push(meta);
            });
            this.loading = false;
            this.quantity = this.item.quantity;
            // Set default image if exists
            if(this.item.images.length > 0) this.setImage(0);
            // Set default variant if exists
            if(this.item.type == 'variable' && this.item.variants.length > 0) this.variantSelected(this.item.variants[0]);
            if(this.item.type == 'simple'){
                // Check outof stock
                if(!this.item.outStock.disabled && this.item.quantity.instock <= 0){
                    this.outofstock = true;
                }
            }
            // Set default quantity
            this.quantitySelected(this.quantity.default);
            // Generate share urls
            let url = `https://${this.$store.state.domain}/posts/${slug}`;
            for (const button of this.socialMedia) {
                button.url = button.url.replace(/\{title\}/gi, this.item.name).replace(/\{url\}/gi, url);
            }
            if(!process.server){
                this.$storeino.fbpx('PageView')
                this.$storeino.fbpx('ViewContent',{
                    content_name: this.item.name?this.item.name:'',
                    content_ids: [this.item._id],
                    content_type: "product",
                    value: this.item.price.salePrice,
                    currency: this.$store.state.currency.code
                });
                this.$tools.call('PAGE_VIEW', this.item);
            }

        }catch(e){
            console.log(e);
            this.$nuxt.error({ statusCode: 404, message: 'product_not_found' })
        }
    },
    mounted() {
        if(this.item) this.$tools.call('PAGE_VIEW', this.item);
        window.addEventListener("APP_LOADER", ()=> {
            window.dispatchEvent(new CustomEvent('CURRENT_PRODUCT', {
                detail: {
                    product_id: this.item._id,
                    product_quantity: this.quantity.value,
                    product_variant: this.variant ? this.variant._id : undefined,
                    product_currency: this.$store.state.currency.code,
                    product_price: this.price
                }
            }));
        });
        if(this.item){
          this.$storeino.fbpx('PageView')
           this.$storeino.fbpx('ViewContent',{
              content_name: this.item.name?this.item.name:'',
              content_ids: [this.item._id],
              content_type: "product",
              value: this.item.price.salePrice,
              currency: this.$store.state.currency.code
            })
        }


        if(this.item){
            const iframes=document.querySelectorAll('iframe')
            for(const ifram of iframes){
            const parent = ifram.parentNode
            if (!parent.classList.contains('video-wrapper')) {
                const div = document.createElement("div");
                ifram.after(div)
                div.classList.add('video-wrapper');
                ifram.style.width=null;
                ifram.style.height=null;
                ifram.setAttribute('width','');
                ifram.setAttribute('height','');
                div.appendChild(ifram)
            }
            }
        }
    },
    methods: {
        t(key){
      const langs = {
        price_title_products: {
          EN: "Price:	",
          FR: "Prix:	",
          AR: "السعر: ",
          ES: "Prezo: ",
          PT: "Preço: "
        },
        check_choice:{
          EN: "Please check your choice :",
          FR: "Veuillez vérifier votre choix:	",
          AR: "يرجى تأكيد الإختيار: ",
          ES: "Por favor marque su elección: ",
          PT :"Por favor, verifique a sua escolha: "
        },
        can_change_choice:{
          EN: "You can change your choice :",
          FR: "Vous pouvez modifier votre choix :	",
          AR: "يمكنك تغيير اختيارك: ",
          ES: "Puede cambiar su elección: ",
          PT:"Você pode alterar sua escolha: "
        }
      }
      return langs[key] && langs[key][this.$store.state.language.code] || '';
    },
        addToCart() {
            // Call add to cart event
            this.$tools.call('ADD_TO_CART', {
                _id: this.item._id,
                quantity: this.quantity.value,
                price: this.variant?this.variant.price.salePrice : this.item.price.salePrice,
                variant: this.variant ? { _id: this.variant._id } : null
            });
            if(this.$settings.sections.products.add_to_cart_to_checkout){
                setTimeout(() => {
                        window.location.href = '/checkout2';
                }, 500);
            }
            this.$tools.toast(this.$settings.sections.alerts.added_to_cart);
        },
        addToWishlist(){
            this.$tools.call('ADD_TO_WISHLIST', this.item);
            this.$tools.toast(this.$settings.sections.alerts.added_to_wishlist);
        },
        removeFromWishlist(){
            this.$tools.call('REMOVE_FROM_WISHLIST', this.item);
            this.$tools.toast(this.$settings.sections.alerts.removed_from_wishlist);
        },
        buyNow() {
            // Add to cart and redirect to checkout
            if (this.$settings.checkout_required_fields.show_variante_reminder && this.item.type =='variable' && !this.showVarianteModal) {
             this.showVarianteModal = true
             return;
            }
            this.addToCart();
            setTimeout(() => {
                window.location.href = '/checkout2';
            }, 500);
        },
        quantitySelected(quantity) {
            this.item.quantity.value = quantity;
            if(this.variant){
                this.price.salePrice = this.variant.price.salePrice * quantity;
                this.price.comparePrice = this.variant.price.comparePrice * quantity;
            }else{
                this.price.salePrice = this.item.price.salePrice * quantity;
                this.price.comparePrice = this.item.price.comparePrice * quantity;
            }
            if(!process.server){
                window.dispatchEvent(new CustomEvent('CURRENT_PRODUCT', {
                    detail: {
                        product_id: this.item._id,
                        product_quantity: this.quantity.value,
                        product_variant: this.variant ? this.variant._id : undefined,
                        product_currency: this.$store.state.currency.code,
                        product_price: this.price
                    }
                }));
            }
        },
        variantSelected(variant) {
            this.variant = variant;
            if(variant.imageId && this.item.images.length > 0){
                let index = this.item.images.findIndex(i=>i._id == variant.imageId);
                if(index == -1) index = 0;
                this.image = this.item.images[index];
            }else if(this.item.images.length > 0){
                this.image = this.item.images[0];
            }
            // Check outof stock
            if(!this.item.outStock.disabled && this.variant.quantity.instock <= 0){
                this.outofstock = true;
            }else{
                this.outofstock = false;
            }
            this.quantitySelected(this.item.quantity.value);
        },
        setImage(index){
            this.image = this.$tools.copy(this.item.images[index]);
        },
        setTab(tab){
            this.tab = tab;
            if(tab == 'reviews' && this.reviews.results.length == 0) this.getReviews();
        }
    },
}
</script>
<style>
.video-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
}
.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.text-div{
  display: flex;
}
@media (max-width: 700px) {
  .text-div{
    display: flex;
    flex-direction: column;
  }
}
.border-solid{
border: solid;
cursor: pointer;
border-radius: 12px;
padding: auto;
}
.row{
    display: flex;
    justify-content: space-between;
}
.modal_variante{
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 99;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #25232866;
}
.modal_variante_content{
 background-color: #ffffff;
 width: 50%;
 z-index: 9888;
 padding: 12px 22px 12px 22px;
 margin: auto;
 border-radius: 8px;
}
@media (max-width: 500px) {
  .modal_variante_content{
    width: 85% !important;
  }
}
.d-f{
    display: flex;
}
.fs-1 { font-size: 1.3em;}
.fs-1-2 { font-size: 1.4em;}
.fs-1-5 { font-size: 1.6em;}
.col-8 {
  width: 70%;
}
.col-2{
  width: 28%;
}
</style>

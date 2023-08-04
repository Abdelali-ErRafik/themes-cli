<template>
    <div class="container my-2 bg-white">
        <div v-if="loading" class="flex items-center justify-center my-5">
            <si-loader></si-loader>
        </div>
        <div v-if="item" class="">
            <h1 class="m-2">{{ item.title }}</h1>
            <hr class="m-0">
            <div class="relative p-2 m-2 bg-fixed bg-center bg-cover border-4 border-white shadow h-80" :style="`background-image:url('${item.image ? item.image.url : null }')`"></div>
            <p class="m-2"><small>{{ item.excerpt }}</small></p>
            <hr>
            <div  v-if="item" class="p-2 mx-2 my-3 bg-white rounded-md description" id="description" v-html="item.content"></div>
            <div class="flex items-center">
                <div class="flex w-full border-b border-gray-200 "></div>
                <h3 class="p-2  whitespace-nowrap">{{ $settings.sections.post.share_buttons.title }}</h3>
                <div class="flex w-full border-b border-gray-200 "></div>
            </div>
            <div class="flex justify-center ">
                <div v-for="item in socialMedia.filter(s=>$settings.sections.post.share_buttons[s.name])" :key="item.name" class="flex items-center justify-center h-12 m-2">
                    <a class="flex h-full" :href="item.url" target="_blank" rel="noopener noreferrer">
                        <si-image class="w-10 h-10" width="40" height="40" :src="item.image" :alt="item.name"/>
                    </a>
                </div>
            </div>
        </div>
        <hr>
        <div v-if="item" class="related">
            <sections-related-posts :item="item"/>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: true,
            item: null,
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
    async fetch(){
        try{
            const { slug } = this.$route.params;
            const { data } = await this.$storeino.pages.get({ slug, type: 'POST' })
            this.item = data;

            this.$store.state.seo.title = this.item.title + ' - ' + this.$settings.store_name;
            this.$store.state.seo.description = this.item.excerpt || this.$settings.store_description;
            if(this.item.image){ this.$store.state.seo.image = this.item.image.url; }


            let url = `https://${this.$store.state.domain}/posts/${slug}`;
            for (const button of this.socialMedia) {
                button.url = button.url.replace(/\{title\}/gi, this.item.title).replace(/\{url\}/gi, url);
            }
            this.loading = false;
        }catch(e){
            console.log({e});
            this.$nuxt.error({ statusCode: 404, message: 'post_not_found' })
        }
    },
    mounted() {
      this.$storeino.fbpx('PageView')
    }
}
</script>

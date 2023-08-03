<template>
<div class="bg-white">
    <si-app-loader placement="BEFORE_FOOTER"/>
    <div class="container py-2">
        <div class="flex flex-wrap">
            <div class="w-full md:w-1/2">
                <div class="p-2 border-r border-l h-full" v-html="$settings.sections.footer.about"></div>
            </div>
            <div class="w-full md:w-1/2">
                <div class="p-2 border-r border-l h-full">
                    <h3 class=" text-lg">{{ $settings.sections.footer.methods.title }}</h3>
                    <div class="flex flex-wrap p-2">
                        <div v-for="item in methods.filter(m=>$settings.sections.footer.methods[m.name])" :key="item.name" class="w-20 h-12 mx-2 flex items-center justify-center border p-2">
                            <si-image width="80" height="40" :src="item.image" :alt="item.name" class="h-full object-contain"/>
                        </div>
                    </div>
                    <h3 class=" text-lg">{{ $settings.sections.footer.social_media.title }}</h3>
                    <div class="flex flex-wrap">
                        <div v-for="item in socialMedia.filter(s=>$settings.sections.footer.social_media[s.name])" :key="item.name" class="h-12 m-2 flex items-center justify-center">
                            <a class="h-full flex" :href="$settings.sections.footer.social_media[item.name]" target="_blank" rel="noopener noreferrer">
                                <si-image class="h-12 w-12" width="40" height="40" :src="item.image" :alt="item.name"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <si-app-loader placement="AFTER_FOOTER"/>
</div>
</template>
<script>
export default {
    data() {
        return {
            methods: [
                {
                    name: 'visa',
                    image: 'https://storeno.b-cdn.net/themes/palest/visa.png'
                },
                {
                    name: 'mastercard',
                    image: 'https://storeno.b-cdn.net/themes/palest/mastercard.png'
                },
                {
                    name: 'transfer',
                    image: 'https://storeno.b-cdn.net/themes/palest/transfer.png'
                },
                {
                    name: 'cash',
                    image: 'https://storeno.b-cdn.net/themes/palest/cod.png'
                }
            ],
            socialMedia: [
                {
                    name: 'facebook',
                    image: 'https://storeno.b-cdn.net/themes/palest/facebook.png'
                },
                {
                    name: 'twitter',
                    image: 'https://storeno.b-cdn.net/themes/palest/twitter.png'
                },
                {
                    name: 'instagram',
                    image: 'https://storeno.b-cdn.net/themes/palest/instagram.png'
                },
                {
                    name: 'youtube',
                    image: 'https://storeno.b-cdn.net/themes/palest/youtube.png'
                },
                {
                    name: 'whatsapp',
                    image: 'https://storeno.b-cdn.net/themes/palest/whatsapp.png'
                },
                {
                    name: 'linkedin',
                    image: 'https://storeno.b-cdn.net/themes/palest/linkedin.png'
                },
                {
                    name: 'snapchat',
                    image: 'https://storeno.b-cdn.net/themes/palest/snapchat.png'
                },
                {
                    name: 'tiktok',
                    image: 'https://storeno.b-cdn.net/themes/palest/tiktok.png'
                }
            ]
        }
    },
}
</script>

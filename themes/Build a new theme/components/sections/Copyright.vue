<template>
    <div class="bg-primary">
        <div class="container mx-auto px-4 py-2">
            <div class="flex justify-between items-center flex-wrap">
                    <h2 class="text-white font-semibold text-2xl">
                        {{ title }}
                    </h2>
                <div class="text-white" v-html="description.replace(/__YEAR__/gi, year)">
                </div>
            </div>
        </div>
        <div id="madeby" style="padding:0.5em;background-color:#222222;color:white;text-align:center"><small>Made by <a style="color:#03a9f4" href="//www.storeino.com/" target="_blank">Storeino.com</a></small></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            year: new Date().getFullYear(),
            title: this.$settings.sections.footer.copyright.store_name,
            description: this.$settings.sections.footer.copyright.text
        }
    },
}
</script>
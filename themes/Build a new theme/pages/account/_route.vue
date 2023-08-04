<template>
    <div v-if="routes.includes(this.$route.params.route)" class="container relative items-center w-full px-10 py-5 overflow-hidden padding-0 margin-0">
      <div class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-white  zi-9999"  v-if="$store.state.loading"  >
        <si-loaderGlobal class="container" />
      </div>
        <iframe class="form-ifrem"  height="100%" width="100%" id="iframe" name="iframe-account" frameborder="0" @load="load"> </iframe>
        <form ref="form" id="account" :action="src" method="get" target="iframe-account">
            <input name="route" :value="this.$route.params.route" hidden>
            <input v-if="this.$route.query&&this.$route.query.orderId" name="query" :value="this.$route.query.orderId" hidden>
        </form>
    </div>
    <div v-else>{{'NOT FOUND'}}</div>
</template>

<script>
export default {
  layout:'account',
  data(){
      return{
          routes:['password','orders','profile','messages','login'],
          src:'/checkout2/orders',
          settings :null,
          iframe:null
      }
  },
   async fetch(){
     if(this.$route.params && this.$route.params.route) this.src="/checkout2/"+this.$route.params.route
     if(this.$route.query && this.$route.query.orderId) this.src=this.src+'?orderId='+this.$route.query.orderId
   },
  mounted(){
      if(this.routes.includes(this.$route.params.route) && document.querySelector("#account")){
          document.querySelector("#account").submit();
      }
      this.$storeino.fbpx('PageView')
  },
  methods:{
      load(){
        if(!process.server){
          this.resizeIframe()
          new ResizeObserver(this.resizeIframe).observe(this.iframe.contentWindow.document.body)
        }
      },
      resizeIframe(){
        this.iframe = document.getElementById("iframe");
        this.iframe.style.height =  this.iframe.contentWindow.document.body.scrollHeight+100 + 'px';
        this.iframe.style.width  =  this.iframe.contentWindow.document.body.scrollWidth + 'px';
      },
      seo() {
      let headTags = {
          title: this.settings ? this.settings.store_name+'-Account' : "Online-Store-Account",
          meta: [
            { hid: "og:description",   property: "og:description", content: this.settings ? this.settings.store_description + " account":'description account' },
            {hid: "twitter:description",   property: "twitter:description", content: this.settings? this.settings.store_description + " account" :'description home page' },
            { hid: "description", name: "description", content: this.settings ? this.settings.store_description + " account" : " description acount" },
          ],
          script:[]
      };
      return headTags;
    },
  }
}
</script>

<style lang="scss" scoped>
</style>

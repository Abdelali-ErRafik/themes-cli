<template>
  <!-- You can delete this file -->
  <div>
    <h2>fetch Products</h2>
    <div v-if="!loading && items.length > 0">
      {{ items }}
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        items: [],
        loading: true
      };
    },
    async fetch(){
      let filter = { status: 'PUBLISH' };
      await this.getProducts(filter);
    },
    methods: {
      async getProducts(filter){
        this.loading = true;
        try{
          const { data } = await this.$storeino.products.search(filter)
          this.items = data.results
        }catch(e){
          console.log({e});
        }
        this.loading = false;
      },
    },
  };
</script>
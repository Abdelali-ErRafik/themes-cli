<template>
    <div class="flex justify-center items-center fixed z-10 inset-0 md:p-10 p-5" v-if="$store.state.fullImage">
        <div @click="$store.state.fullImage=null" class="bg-black absolute inset-0 bg-opacity-25"></div>
        <si-image class="relative md:h-full w-full md:w-auto z-10 object-contain bg-white rounded-md shadow cursor-pointer" :src="$store.state.fullImage" :alt="`Full screen image`"/>
        <button @click="$store.state.fullImage=null" class="absolute top-0 z-20 right-0 m-2 bg-white rounded-lg shadow-lg w-10 h-10 px-2 flex items-center justify-center">&times;</button>
    </div>
</template>
<script>
export default {
    mounted() {
        document.addEventListener('keydown', (e)=>{
            if(e.key == 'Escape' && this.$store.state.fullImage != null) this.$store.state.fullImage=null;
        })
    }
}
</script>
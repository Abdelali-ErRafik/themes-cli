<template>
    <div class="flex items-center justify-center w-12 h-12 bg-primary rounded-md">
        <span class="text-xl font-bold text-white uppercase">{{ letters }}</span>
    </div>
</template>
<script>
export default {
    props: {
        name: { type: String, default: '' },
    },
    data() {
        return {
            letters: this.name.split(' ').map(word => word[0]).join('.'),
        }
    },
}
</script>
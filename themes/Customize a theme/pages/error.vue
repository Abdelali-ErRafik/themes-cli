<template>
    <div class="h-s d-f jc-c w-f bg-page">
        <div class="d-f ai-c jc-c fd-c mx-auto ta-c">
            <nuxt-img src="https://storeno.b-cdn.net/stores/8-2022/1660825134680.gif" alt="graphic-404" width="400" class="mx-auto mb-4 max-w-full"/>
            <h1 class="mb-4 fs-3">Oh no!</h1>
            <h1 class="mb-12 fs-2">Something went wrong.</h1>
            <p class="my-4 t-r">We aren't able to process your payment. Please try again.</p>
            <nuxt-link to="/" class="td-n br-8 px-4 py-2 btn">Back to Home</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "error-payment"
}
</script>

<style>
    .bg-page {
        background-color: #eff1f3;
    }
    .max-w-full {
        max-width: 100%;
    }
    .btn {
        background-color: #00c9dc54;
        color: #008a9b;
    }
</style>
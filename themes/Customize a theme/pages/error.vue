<script setup lang="ts">
defineOptions({
  name: 'ErrorPayment',
});
</script>

<template>
  <!--  -->
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <!--  -->
    <div
      class="w-full max-w-lg px-6 py-12 flex flex-col items-center justify-center text-center"
    >
      <!--  -->
      <div class="w-full max-w-md mb-8 relative">
        <!--  -->
        <img
          src="https://storeno.b-cdn.net/stores/8-2022/1660825134680.gif"
          alt="Payment Error Illustration"
          class="w-full h-auto object-contain"
          loading="eager"
        />
        <!--  -->
      </div>
      <!--  -->

      <!--  -->
      <div class="space-y-4">
        <!--  -->
        <h1 class="text-4xl font-bold text-gray-800">Oh no!</h1>
        <!--  -->

        <!--  -->
        <h2 class="text-2xl font-semibold text-gray-600 mb-8">
          Something went wrong.
        </h2>
        <!--  -->

        <!--  -->
        <p class="text-lg text-gray-600">
          We aren't able to process your payment. Please try again.
        </p>
        <!--  -->

        <!--  -->
        <div class="mt-8">
          <!--  -->
          <NuxtLink
            to="/"
            class="inline-flex items-center px-6 py-3 text-base font-medium text-primary bg-primary/10 rounded-lg transition duration-200 hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
          >
            <!--  -->
            <Icon name="ph:house-bold" class="w-5 h-5 mr-2" />
            <!--  -->
            Back to Home
          </NuxtLink>
          <!--  -->
        </div>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.text-4xl {
  animation: fadeIn 0.6s ease-out;
}
</style>

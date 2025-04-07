<script setup lang="ts">
import { ref, watch } from 'vue';
import type { NuxtError } from '#app';

const props = defineProps({
  error: {
    type: Object as () => NuxtError,
    default: () => ({ statusCode: 500, message: 'Something went wrong.' }),
  },
});

const isHovering = ref(false);
const rotation = ref(0);
let rotationInterval: NodeJS.Timer | null = null;

// Handle rotation on hover
watch(isHovering, (newValue) => {
  if (newValue) {
    rotationInterval = setInterval(() => {
      rotation.value = (rotation.value + 3) % 360;
    }, 16);
  } else {
    clearInterval(rotationInterval || undefined);
    rotationInterval = null;
    rotation.value = 0;
  }
});

// Refresh the page
const handleRefresh = () => {
  window.location.reload();
};

// Log the error for debugging
console.error('Error occurred:', props.error);
</script>

<template>
  <!--  -->
  <div
    class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4"
  >
    <!--  -->
    <div class="max-w-md w-full">
      <!--  -->
      <!--  -->
      <div
        class="bg-white rounded-2xl shadow-xl p-8 space-y-6 relative overflow-hidden"
      >
        <!--  -->
        <div
          class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"
        ></div>
        <!--  -->

        <!--  -->
        <div
          class="absolute -right-20 -top-20 w-40 h-40 bg-red-100 rounded-full opacity-20"
        ></div>
        <!--  -->

        <!--  -->
        <div
          class="absolute -left-20 -bottom-20 w-40 h-40 bg-orange-100 rounded-full opacity-20"
        ></div>
        <!--  -->

        <!-- Error Icon -->
        <div class="flex justify-center">
          <!--  -->
          <div
            class="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center"
            @mouseenter="isHovering = true"
            @mouseleave="isHovering = false"
          >
            <!--  -->
            <Icon
              name="solar:danger-triangle-linear"
              class="text-6xl text-red-500 transform transition-transform translate"
              :style="{ transform: `rotate(${rotation}deg)` }"
            />
            <!--  -->
          </div>
        </div>
        <!--  -->

        <!-- Error Content -->
        <div class="text-center space-y-4">
          <!--  -->
          <h1 class="text-4xl font-bold text-gray-900">
            Error {{ props.error.statusCode }}
          </h1>
          <!--  -->
          <p class="text-lg text-gray-600">
            {{ props.error.message || 'An unexpected error occurred.' }}
          </p>
          <!--  -->
        </div>
        <!--  -->

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            class="text-lg inline-flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 gap-2"
            @click="handleRefresh"
          >
            <!--  -->
            <Icon
              name="solar:refresh-linear"
              class="text-2xl text-white transform transition-transform translate"
            />
            <!--  -->

            <!--  -->
            <span>Try Again</span>
            <!--  -->
          </button>
          <!--  -->
          <NuxtLink
            to="/"
            class="text-lg inline-flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 gap-2"
          >
            <!--  -->
            <Icon
              name="solar:home-2-linear"
              class="text-2xl text-red-500 transform transition-transform translate"
            />
            <!--  -->

            <!--  -->
            <span>Go Home</span>
            <!--  -->
          </NuxtLink>
          <!--  -->
        </div>
        <!--  -->
      </div>
      <!--  -->

      <!-- Additional Help Text -->
      <p class="text-lg text-center text-gray-500 mt-6">
        If the problem persists, please contact support.
      </p>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

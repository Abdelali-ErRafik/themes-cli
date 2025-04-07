<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
  methods: {
    type: Object,
    required: true,
  },
});

const paymentMethods = ref([
  {
    name: 'visa',
    image: 'ri:visa-line',
  },
  {
    name: 'mastercard',
    image: 'uit:master-card',
  },
  {
    name: 'transfer',
    image: 'basil:bank-outline',
  },
  {
    name: 'paypal',
    image: 'hugeicons:paypal',
  },
  {
    name: 'cash',
    image: 'formkit:usdc',
  },
]);

const filteredPaymentMethods = computed(() =>
  paymentMethods.value.filter((s) => props.methods[s.name])
);
</script>

<template>
  <!--  -->
  <div class="flex flex-col gap-2">
    <!--  -->
    <h3 v-if="props.methods" class="flex items-center text-base font-medium">
      {{ props.methods.title }}
    </h3>
    <!--  -->

    <!--  -->
    <div class="flex items-center gap-2">
      <!--  -->
      <span
        v-for="item in filteredPaymentMethods"
        :key="item.name"
        target="_blank"
        rel="noopener noreferrer"
        class="w-10 h-10 flex items-center justify-center cursor-pointer hover:text-secondary hover:opacity-90 hover:scale-105 transition-all duration-300"
      >
        <!--  -->
        <Icon :name="item.image" class="text-3xl translate" />
        <!--  -->
      </span>
      <!--  -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

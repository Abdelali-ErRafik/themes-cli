<script setup lang="ts">
const props: any = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: any) => ['primary', 'secondary'].includes(value),
  },
  icon: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    required: true,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};

const buttonClasses = computed(() => {
  const baseClasses =
    'w-full h-10 flex items-center justify-center click-effect rounded-full border transition-all duration-300 text-white';
  const variantClasses =
    props.variant === 'primary'
      ? 'border-primary bg-primary hover:bg-transparent hover:text-primary'
      : 'border-secondary bg-secondary hover:bg-transparent hover:text-secondary';

  return `${baseClasses} ${variantClasses}`;
});
</script>

<template>
  <!--  -->
  <button v-if="isVisible" :class="buttonClasses" @click="handleClick">
    <!--  -->
    <Icon v-if="icon" :name="icon" class="text-3xl translate" />
    <!--  -->

    <!--  -->
    <span class="text-sm font-medium">{{ text }}</span>
    <!--  -->
  </button>
  <!--  -->
</template>

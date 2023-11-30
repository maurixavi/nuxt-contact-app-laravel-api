<template>
  <button
    :type="type"
    :class="{
      'button-primary': buttonType === 'primary',
      'button-primary-outlined': buttonType === 'primary-outlined',
      'button-secondary': buttonType === 'secondary',
    }"
    class="flex justify-center relative rounded-full py-2 px-16 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
  >
    <div
      v-if="hasLeftIcon"
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
    >
      <slot name="leftIcon"></slot>
    </div>
    <slot />

    <div
      v-if="hasRightIcon"
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
    >
      <slot name="rightIcon"></slot>
    </div>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  buttonType: {
    type: String,
    default: 'primary',
  },
})

const slots = useSlots()

const hasLeftIcon = computed(() => !!slots.leftIcon)
const hasRightIcon = computed(() => !!slots.rightIcon)
</script>

<style scoped>
.button-primary-outlined {
  @apply bg-white border border-primary text-primary hover:text-white hover:bg-primary-200 focus-visible:outline-primary-600;
}

.button-primary {
  @apply bg-primary text-white hover:bg-primary-200 focus-visible:outline-primary-600;
}

.button-secondary {
  @apply bg-violet-400 text-white font-medium tracking-wide uppercase hover:bg-violet-500 focus-visible:outline-primary-600;
}
</style>

<template>
  <main class="w-full">
    <slot />
    <Toast />
  </main>
</template>

<script setup>
import Toast from '@/components/common/others/Toast'
</script>

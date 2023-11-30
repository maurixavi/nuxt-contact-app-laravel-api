<template>
  <div class="w-full">
    <label
      v-if="label !== ''"
      for="email"
      class="block text-sm font-medium leading-6 text-gray-900"
      >{{ label }}</label
    >
    <Switch
      v-model="enabled"
      :class="enabled ? 'bg-primary-800' : 'bg-primary-400'"
      class="mt-2 relative inline-flex h-[26px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        :class="enabled ? 'translate-x-6' : 'translate-x-0'"
        class="pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
      />
    </Switch>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Switch } from '@headlessui/vue'

defineProps({
  label: {
    type: String,
    default: '',
  },
})

const enabled = ref(false)
</script>

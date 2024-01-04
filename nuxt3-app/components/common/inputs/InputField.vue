<template>
  <div class="w-full">
    <label
      v-if="label !== ''"
      for="email"
      class="block text-lg font-semibold leading-6 text-gray-900"
      >{{ label }}</label
    >
    <div class="relative mt-2 rounded-md">
      <div
        v-if="hasLeftIcon"
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <slot name="leftIcon"></slot>
      </div>
      <input
        :id="id"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        :class="{
          'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500':
            error !== '',
          'pl-10': hasLeftIcon,
        }"
        class="block w-full text-slate-500 bg-fuchsia-100 rounded-md border-0 py-2 px-4 pr-4 sm:text-sm sm:leading-6 outline-none focus:outline-none"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div
        v-if="error !== '' && !modelValue"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <ExclamationIcon />
      </div>
    </div>
    <p
      v-if="error !== '' && !modelValue"
      id="email-error"
      class="mt-2 text-sm text-red-600 capitalize"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ExclamationIcon } from '@/components/common/icons'

defineEmits(['update:modelValue'])

defineProps({
  id: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
})

const slots = useSlots()

const hasLeftIcon = computed(() => !!slots.leftIcon)
</script>

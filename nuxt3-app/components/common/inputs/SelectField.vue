<template>
  <div class="w-full">
    <label
      for="email"
      class="block text-sm font-medium leading-6 text-gray-900"
      >{{ label }}</label
    >
    <Listbox v-model="selected">
      <div class="relative mt-2" :class="`z-${zIndex}`">
        <ListboxButton
          class="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-primary-400 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-200 sm:text-sm"
        >
          <span class="block truncate">{{ selected.value }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-for="option in options"
              v-slot="{ active, selected }"
              :key="option.key"
              :value="option"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-primary-200 text-primary-800' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ option.value }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="text-primary-800" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@/components/common/icons'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  zIndex: {
    type: Number,
    default: 10,
  },
  options: {
    type: Array,
    default: () => [],
    validator: (propValue) => {
      return propValue.every(
        (opt) => opt.hasOwnProperty('key') && opt.hasOwnProperty('value')
      )
    },
  },
})

const selected = props.options.length > 0 ? ref(props.options[0]) : ref(null)
</script>

<template>
  <div>
    <p class="block text-lg font-semibold leading-6 text-gray-900 mb-2">
      Address
    </p>

    <input
      :value="modelValue"
      name="address"
      type="text"
      autocomplete="address-line1"
      class="block w-full text-slate-500 bg-fuchsia-100 rounded-md border-0 py-2 px-4 pr-4 sm:text-sm sm:leading-6 outline-none focus:outline-none"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, defineEmits } from 'vue'

defineEmits(['update:modelValue'])

const { modelValue } = defineProps(['modelValue'])

const address = ref(modelValue)

// Load Mapbox Search script
onMounted(() => {
  const mapboxAccessToken =
    'pk.eyJ1IjoibWF1cml4YXZpIiwiYSI6ImNscXRxODhjeDVhNzgyam11bG84eHpxYXYifQ.BAKIprNnxa8Gi4osdE_ePg'

  const script = document.createElement('script')
  script.id = 'search-js'
  script.defer = true
  script.src = 'https://api.mapbox.com/search-js/v1.0.0-beta.18/web.js'
  document.head.appendChild(script)

  script.onload = function () {
    mapboxsearch.autofill({
      accessToken: mapboxAccessToken,
    })

    document
      .querySelector('[name="address"]')
      .addEventListener('mapboxsearch.results', (event) => {
        const suggestedAddress = event.detail.features[0]?.place_name || ''
        address.value = suggestedAddress
      })
  }
})
</script>

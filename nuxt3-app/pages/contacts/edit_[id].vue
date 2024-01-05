<template>
  <PageWrapper>
    <div class="w-full flex justify-center mt-10 mb-10">
      <form class="w-1/2 space-y-4" @submit.prevent="updateContact">
        <button class="text-gray-400 text-base focus:outline-none">
          <nuxt-link :to="`/contacts/${contact.id}`">← Cancel</nuxt-link>
        </button>
        <div class="flex items-center space-x-1">
          <img
            :src="
              contact.profilePicture ||
              'https://cdn4.iconfinder.com/data/icons/office-thick-outline/36/office-14-64.png'
            "
            alt=""
            class="w-12 h-12 rounded-full mr-3"
          />
          <div class="flex flex-col min-w-0 pr-16">
            <h3 class="text-xl font-bold">{{ contact.name }}</h3>
            <p class="text-sm text-gray-400">
              {{ contact.title }}
            </p>
          </div>
        </div>
        <InputField v-model="contact.name" label="Name" :error="errors?.name" />
        <InputField
          v-model="contact.title"
          label="Title"
          :error="errors?.title"
        />
        <InputField v-model="contact.profilePicture" label="Profile Picture" />
        <!--<InputField v-model="contact.address" label="Address" />-->
        <p class="block text-lg font-semibold leading-6 text-gray-900">
          Address
        </p>
        <input
          v-model="contact.address"
          label="Address"
          name="address"
          type="text"
          autocomplete="address-line1"
          class="block w-full text-slate-500 bg-fuchsia-100 rounded-md border-0 py-2 px-4 pr-4 sm:text-sm sm:leading-6 outline-none focus:outline-none"
        />
        <div
          v-if="errors?.address && !contact.address"
          class="mt-2 text-sm text-red-600 capitalize"
        >
          {{ errors.address }}
        </div>
        <InputField
          v-model="contact.phone"
          label="Phone"
          :error="errors?.phone"
        />
        <InputField
          v-model="contact.email"
          label="Email"
          :error="errors?.email"
        />
        <div class="flex justify-center pt-4">
          <Button
            id="submit-button"
            type="submit"
            button-type="secondary"
            class="text-center"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  </PageWrapper>
</template>

<script setup>
import { useContactsStore } from '@/stores/contacts'
import { useToast } from '@/stores/toast'
import PageWrapper from '@/components/layout/wrappers/PageWrapper'
import InputField from '@/components/common/inputs/InputField'
import Button from '@/components/common/buttons/Button'

import { useForm } from 'vee-validate'
import contactSchema from '@/schemas/contactSchema'
const { errors } = useForm({ validationSchema: contactSchema })

console.log(errors.email)

const mapboxAccessToken =
  'pk.eyJ1IjoibWF1cml4YXZpIiwiYSI6ImNscXRxODhjeDVhNzgyam11bG84eHpxYXYifQ.BAKIprNnxa8Gi4osdE_ePg'

// Mapbox Search JS
const script = document.createElement('script')
script.id = 'search-js'
script.defer = true
script.src = 'https://api.mapbox.com/search-js/v1.0.0-beta.18/web.js'
document.head.appendChild(script)

// Callback para ejecutar después de cargar el script de Mapbox
script.onload = function () {
  mapboxsearch.autofill({
    accessToken: mapboxAccessToken,
  })

  document
    .querySelector('[name="address"]')
    .addEventListener('mapboxsearch.results', (event) => {
      console.log('Sugerencias de dirección:', event.detail.features)
    })
}

useHead(() => ({
  title: `My App | Edit Contact`,
  meta: [{ name: 'description', content: 'Contacts Directory App' }],
  bodyAttrs: {
    class: 'test',
  },
}))
</script>

<script>
const { show: showToast } = useToast()

export default {
  name: 'ContactEdit',
  data() {
    return {
      contactId: '',
      contact: {},
    }
  },
  mounted() {
    this.contactId = this.$route.params.id
    this.getContact(this.contactId)
  },
  methods: {
    async getContact(contactId) {
      try {
        const contact = await useContactsStore().getContact(contactId)
        this.contact = contact
      } catch (error) {
        console.error('Error fetching contact:', error)
      }
    },

    async updateContact() {
      try {
        const updatedContact = this.contact
        const contactId = this.$route.params.id
        await useContactsStore().updateContact(contactId, updatedContact)
        showToast('Success!', 'Contact updated successfully.', 'success')
      } catch (error) {
        console.error('Error updating contact:', error)
        showToast(
          'Error!',
          'Error updating contact. Please try again.',
          'danger'
        )
      }
    },
  },
}
</script>

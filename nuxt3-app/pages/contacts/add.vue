<template>
  <PageWrapper>
    <div class="w-full flex justify-center mt-10 mb-10">
      <form class="w-1/2 space-y-4" @submit.prevent="saveContact">
        <button class="text-gray-400 text-base focus:outline-none">
          <nuxt-link to="/contacts" class="flex items-center space-x-1"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="5"
              height="5"
              class="w-4 h-4 mr-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Cancel</nuxt-link
          >
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
        <InputField v-model="contact.name" label="Name" :error="errors.name" />
        <InputField
          v-model="contact.title"
          label="Title"
          :error="errors?.title"
        />
        <InputField v-model="contact.profilePicture" label="Profile Picture" />
        <MapboxSearch v-model="contact.address" />
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
          :error="errors.email"
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
import { useForm } from 'vee-validate'
import contactSchema from '@/schemas/contactSchema'
import PageWrapper from '@/components/layout/wrappers/PageWrapper'
import InputField from '@/components/common/inputs/InputField'
import Button from '@/components/common/buttons/Button'
import MapboxSearch from '@/components/common/inputs/MapboxSearch'

const { errors } = useForm({ validationSchema: contactSchema })

useHead({
  title: 'My App | Add New Contact',
  meta: [{ name: 'description', content: 'Contacts Directory App' }],
  bodyAttrs: {
    class: 'test',
  },
})
</script>

<script>
const store = useContactsStore()
const { show: showToast } = useToast()
export default {
  name: 'ContactNew',
  data() {
    return {
      contact: {
        name: '',
        title: '',
        profilePicture:
          'https://cdn4.iconfinder.com/data/icons/office-thick-outline/36/office-14-64.png',
        address: '',
        phone: '',
        email: '',
      },
    }
  },
  methods: {
    async saveContact() {
      console.log('Entró a saveContact')
      console.log(this.contact)
      try {
        await store.saveContact(this.contact)
        showToast('Success!', 'Contact created successfully.', 'success')
        this.contact.name = ''
        this.contact.title = ''
        this.contact.profilePicture = ''
        this.contact.address = ''
        this.contact.phone = ''
        this.contact.email = ''
      } catch (error) {
        console.error('Error en saveContact:', error)
        showToast('Error!', 'Something went wrong.', 'danger')
      }
    },
  },
}
</script>

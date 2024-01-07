<template>
  <PageWrapper>
    <div class="w-full flex justify-center mt-10 mb-10">
      <form class="w-1/2 space-y-4" @submit.prevent="saveContact">
        <button class="text-gray-400 text-base focus:outline-none">
          <nuxt-link to="/contacts" class="flex items-center space-x-1">
            <svg
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
            Back
          </nuxt-link>
        </button>
        <div class="flex items-center space-x-1">
          <img
            :src="
              currentContact.profilePicture ||
              'https://cdn4.iconfinder.com/data/icons/office-thick-outline/36/office-14-64.png'
            "
            alt=""
            class="w-12 h-12 rounded-full mr-2 mb-4"
          />
          <div class="flex flex-col min-w-0 pr-10 mb-4">
            <h3 class="text-xl font-bold">{{ currentContact.name }}</h3>
            <p class="text-sm text-gray-400">
              {{ currentContact.title }}
            </p>
          </div>
        </div>
        <label class="block text-lg font-semibold leading-6 text-gray-900 mt-8"
          >Address</label
        >
        <p class="text-gray-400 leading-none">{{ currentContact.address }}</p>

        <label class="block text-lg font-semibold leading-6 text-gray-900 mt-4"
          >Phone</label
        >
        <p class="text-gray-400 leading-none">{{ currentContact.phone }}</p>

        <label class="block text-lg font-semibold leading-6 text-gray-900 mt-4"
          >Email</label
        >
        <p class="text-gray-400 leading-none">{{ currentContact.email }}</p>

        <div class="flex justify-center pt-8">
          <Button button-type="secondary" class="text-center">
            <nuxt-link :to="'/contacts/edit_' + currentContact.id"
              >Edit</nuxt-link
            >
          </Button>
        </div>
      </form>
    </div>
  </PageWrapper>
</template>

<script setup>
import PageWrapper from '@/components/layout/wrappers/PageWrapper'
import Button from '@/components/common/buttons/Button'
import { useContactsStore } from '@/stores/contacts'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const contactsStore = useContactsStore()
const route = useRoute()

const contactId = route.params.id
const currentContact = ref({})

onMounted(async () => {
  try {
    // Obtén el contacto usando el store
    currentContact.value = await contactsStore.getContact(contactId)
    console.log(currentContact.value)
  } catch (error) {
    console.error('Error al cargar el contacto:', error)
  }
})
</script>

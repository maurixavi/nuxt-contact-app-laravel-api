<template>
  <PageWrapper>
    <div class="w-full max-w-md mx-auto mt-8">
      <h1 class="text-4xl font-extrabold tracking-tight mb-4">Contacts</h1>

      <div class="relative mb-6 ml-2 mr-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search contact..."
          class="w-full border border-gray-100 rounded px-4 py-2 pr-10 focus:outline-none text-gray-400"
        />
        <span class="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            class="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35"
            ></path>
            <circle cx="10.5" cy="10.5" r="7.5"></circle>
          </svg>
        </span>
      </div>

      <div class="mb-8">
        <table class="w-full">
          <tbody>
            <tr
              v-for="(contact, index) in filteredContacts"
              :key="index"
              class="even:bg-gray-50 odd:bg-white"
            >
              <td class="p-5 flex items-center justify-between">
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
                    <h3 class="text-xl font-semibold">{{ contact.name }}</h3>
                    <p class="text-sm font-semibold text-gray-400">
                      I have some questions about...
                    </p>
                  </div>
                </div>
                <button class="text-gray-500 text-xl focus:outline-none">
                  <nuxt-link :to="`/contacts/${contact.id}`">></nuxt-link>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-center pt-6">
          <Button
            id="submit-button"
            type="submit"
            button-type="secondary"
            class="text-center"
          >
            <nuxt-link to="/contacts/add">Add</nuxt-link>
          </Button>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup>
import { useContactsStore } from '@/stores/contacts'
import PageWrapper from '@/components/layout/wrappers/PageWrapper'
import Button from '@/components/common/buttons/Button'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

useHead({
  title: 'My App | Contacts',
  meta: [{ name: 'description', content: 'Contacts Directory App' }],
  bodyAttrs: {
    class: 'test',
  },
})

const contactsStore = useContactsStore()

const authToken = localStorage.getItem('authToken')

// Check if the token is present and valid before assigning it to the headers of axios.
if (authToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
} else {
  // If there is no token, redirect the user to the login page
  router.push('/auth/login')
}

const searchQuery = ref('')

const sortedContacts = computed(() => {
  return contactsStore.contacts.slice().sort((a, b) => {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()
    return nameA.localeCompare(nameB)
  })
})

const filteredContacts = computed(() => {
  const query = searchQuery.value.toLowerCase()
  const queryWords = query.split(' ').filter(Boolean)

  return sortedContacts.value.filter((contact) => {
    return queryWords.every((word) => {
      return contact.name
        .toLowerCase()
        .split(' ')
        .some((nameWord) => nameWord.startsWith(word))
    })
  })
})

onMounted(() => {
  contactsStore.loadContacts()
})
</script>

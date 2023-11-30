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
        <InputField v-model="contact.name" label="Name" />
        <InputField v-model="contact.title" label="Title" />
        <InputField v-model="contact.profilePicture" label="Profile Picture" />
        <InputField v-model="contact.address" label="Address" />
        <InputField v-model="contact.phone" label="Phone" />
        <InputField v-model="contact.email" label="Email" />
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
        <!--<SelectField label="Options" :options="options" />-->
      </form>
    </div>
  </PageWrapper>
</template>

<script setup>
import PageWrapper from '@/components/layout/wrappers/PageWrapper'
import InputField from '@/components/common/inputs/InputField'
import Button from '@/components/common/buttons/Button'

useHead(() => ({
  title: `My App | Edit Contact`,
  meta: [{ name: 'description', content: 'Contacts Directory App' }],
  bodyAttrs: {
    class: 'test',
  },
}))
/*
const contact = {
  name: '',
  title: '',
  profilePicture: '',
  address: '',
  phone: '',
  email: '',
}*/

/*const onSubmit = async () => {
  // Lógica para manejar el envío del formulario y guardar el contacto
}*/
</script>

<script>
import axios from 'axios'
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
    console.log(this.$route.params.id)
    //alert(this.contactId)
    this.getContact(this.contactId)
  },
  methods: {
    getContact(contactId) {
      //alert('hola')
      axios
        .get(`http://localhost:8000/api/contacts/${contactId}/edit`)
        .then((res) => {
          console.log(res)
          this.contact = res.data.contact
        })
    },

    updateContact() {
      //alert('Contact ID: ' + contactId.value)
      axios
        .put(
          `http://localhost:8000/api/contacts/${this.$route.params.id}/edit`,
          this.contact
        )
        .then((res) => {
          console.log(res, 'res')
          alert(res.data.message)
        })
    },
  },
}
</script>

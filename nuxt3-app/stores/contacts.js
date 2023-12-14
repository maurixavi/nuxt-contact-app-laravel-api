import { defineStore } from 'pinia'
import axios from 'axios'

export const useContactsStore = defineStore('contacts', () => {
  /* -------------------------- STATE -------------------------- */

  const contacts = ref([])

  /* -------------------------- MUTATORS -------------------------- */

  const setContacts = (newContacts) => {
    contacts.value = newContacts
  }

  /* -------------------------- ACTIONS -------------------------- */

  const fetchContacts = async () => {
    try {
      const authToken = localStorage.getItem('authToken')
      if (!authToken) {
        throw new Error('Authentication token not found.')
      }

      const response = await axios.get('http://localhost:8000/api/contacts', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      if (response.status !== 200) {
        throw new Error(response.data)
      }

      return response.data.contacts
    } catch (error) {
      console.error('Error fetching contacts:', error)
      throw new Error('Error fetching contacts')
    }
  }

  const loadContacts = async () => {
    try {
      const contacts = await fetchContacts()
      setContacts(contacts)
    } catch (error) {
      console.error(error.message)
      throw error
    }
  }

  /* -------------------------- RETURN -------------------------- */

  return { contacts, setContacts, loadContacts }
})

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

  const updateContact = async (contactId, updatedContact) => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      throw new Error('Authentication token not found.')
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/contacts/${contactId}/edit`,
        updatedContact,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )

      // Actualiza la lista de contactos después de actualizar uno existente
      await fetchContacts()

      return response.data
    } catch (error) {
      console.error('Error updating contact:', error)
      console.log('Server response:', error.response.data)
      throw new Error('Error updating contact')
    }
  }

  const getContact = async (contactId) => {
    try {
      const authToken = localStorage.getItem('authToken')
      if (!authToken) {
        throw new Error('Authentication token not found.')
      }
      const response = await axios.get(
        `http://localhost:8000/api/contacts/${contactId}/edit`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )

      if (response.status !== 200) {
        throw new Error(response.data)
      }
      console.log('Return:', response.data.contact)
      return response.data.contact
    } catch (error) {
      console.error('Error fetching contact:', error)
      throw new Error('Error fetching contact')
    }
  }

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

      setContacts(response.data.contacts)
    } catch (error) {
      console.error('Error fetching contacts:', error)
      throw new Error('Error fetching contacts')
    }
  }

  const loadContacts = async () => {
    try {
      await fetchContacts()
    } catch (error) {
      console.error(error.message)
      throw error
    }
  }

  const saveContact = async (newContact) => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      throw new Error('Authentication token not found.')
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/contacts',
        newContact,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )

      // Update contacts list after saving a new one
      await fetchContacts()

      return response.data
    } catch (error) {
      console.error('Error saving contact:', error)
      console.log('Server response:', error.response.data)
      throw new Error('Error saving contact')
    }
  }

  /* -------------------------- RETURN -------------------------- */

  return {
    contacts,
    setContacts,
    loadContacts,
    saveContact,
    getContact,
    updateContact,
  }
})

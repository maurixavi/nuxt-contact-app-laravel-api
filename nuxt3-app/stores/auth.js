import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuth = defineStore('auth', () => {
  /* -------------------------- STATE -------------------------- */

  const user = ref(null)

  /* -------------------------- MUTATORS -------------------------- */

  const setUser = (newUser) => {
    user.value = newUser
  }

  /* -------------------------- ACTIONS -------------------------- */

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/login',
        credentials
      )

      if (!response.data.status) {
        throw new Error(response.data.message)
      }

      const authToken = response.data.access_token

      // Set up the token in the headers of axios.
      axios.defaults.headers.common = {
        ...axios.defaults.headers.common,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      }
    } catch (error) {
      console.error('Error during login:', error)
      throw new Error('Error during login')
    }
  }

  /* -------------------------- RETURN -------------------------- */

  return {
    user,
    setUser,
    login,
  }
})

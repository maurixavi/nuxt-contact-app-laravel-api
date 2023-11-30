import { defineStore } from 'pinia'

import useRequest from '@/composables/useRequest'

export const useAuth = defineStore('auth', () => {
  /* -------------------------- STATE -------------------------- */

  const user = ref(null)

  /* -------------------------- MUTATORS -------------------------- */

  const setUser = async (newUser) => {
    user.value = newUser
  }

  /* -------------------------- ACTIONS -------------------------- */

  const getUser = async () => {
    const { get } = useRequest()

    const response = await get('/auth/user')

    if (!response.data.success) {
      throw new Error(response.data)
    }

    setUser(response.data.data.user)
  }

  const login = async (payload) => {
    const { post } = useRequest()
    const token = useCookie('token')
    const context = useNuxtApp()

    const response = await post('/auth/login', payload)

    if (!response.data.success) {
      throw new Error(response.data)
    }

    token.value = response.data.data.token

    context.$axios.defaults.headers = {
      common: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
    }

    await getUser()
  }

  /* -------------------------- RETURN -------------------------- */

  return { user, setUser, login }
})

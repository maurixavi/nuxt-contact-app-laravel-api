import { defineStore } from 'pinia'

import useRequest from '@/composables/useRequest'

export const useExamples = defineStore('examples', () => {
  /* -------------------------- STATE -------------------------- */

  const items = ref([])
  const current = ref(null)

  /* -------------------------- ACTIONS -------------------------- */

  const get = async () => {
    const { get } = useRequest()

    const response = await get('https://jsonplaceholder.typicode.com/todos')

    if (response.status !== 200) {
      throw new Error(response.data)
    }

    items.value = [...response.data]
  }

  const show = async (id) => {
    const { get } = useRequest()

    const response = await get(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    )

    if (response.status !== 200) {
      throw new Error(response.data)
    }

    current.value = { ...response.data }
  }

  /* -------------------------- RETURN -------------------------- */

  return { items, current, get, show }
})

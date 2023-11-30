import { defineStore } from 'pinia'

export const useToast = defineStore('toast', () => {
  /* -------------------------- STATE -------------------------- */

  const visible = ref(false)
  const data = ref({
    title: '',
    message: '',
    type: 'success',
  })

  /* -------------------------- ACTIONS -------------------------- */

  const show = (
    title = 'Success!',
    message = 'The operation was executed successfully.',
    type = 'success'
  ) => {
    data.value = {
      title,
      message,
      type,
    }

    visible.value = true

    setTimeout(() => {
      visible.value = false
      data.value = {
        title: '',
        message: '',
        type: '',
      }
    }, 2500)
  }

  /* -------------------------- RETURN -------------------------- */

  return { visible, data, show }
})

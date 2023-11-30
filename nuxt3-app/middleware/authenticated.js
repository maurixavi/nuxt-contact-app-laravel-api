export default defineNuxtRouteMiddleware(() => {
  const token = useCookie('token')

  if (!token.value) {
    navigateTo('/auth/login')
  }
})

export default function useRequest() {
  const get = async (url) => {
    const { $axios } = useNuxtApp()
    return await $axios.get(url)
  }

  const post = async (url, body) => {
    const { $axios } = useNuxtApp()
    return await $axios.post(url, body)
  }

  return {
    get,
    post,
  }
}

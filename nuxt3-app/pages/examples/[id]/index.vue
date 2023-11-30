<template>
  <PageWrapper>
    <div v-if="!loading" class="w-full mt-10">
      <Card v-if="current" class="p-4"> Title: {{ current.title }} </Card>
    </div>
    <div v-else>Loading...</div>
  </PageWrapper>
</template>

<script setup>
import PageWrapper from '@/components/layout/wrappers/PageWrapper'
import Card from '@/components/common/others/Card'

import { useExamples } from '@/stores/examples'

/* ----------------------------------------------------------------- */

const route = useRoute()
const examples = useExamples()

const id = route.params.id

const loading = ref(true)
const current = computed(() => examples.current)

/* ----------------------------------------------------------------- */

definePageMeta({
  middleware: ['authenticated'],
})

onMounted(async () => {
  try {
    loading.value = true
    await examples.show(id)
  } catch (ex) {
    console.log(ex)
  } finally {
    loading.value = false
  }
})
</script>

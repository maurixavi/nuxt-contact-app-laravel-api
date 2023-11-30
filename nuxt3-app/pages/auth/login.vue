<template>
  <PageWrapper>
    <div class="w-full flex justify-center pt-20">
      <form class="w-1/2 space-y-4" @submit="onSubmit">
        <h1 class="text-4xl font-extrabold tracking-tight text-center mb-12">
          Welcome
        </h1>

        <InputField
          id="email-input"
          v-model="email"
          type="email"
          name="email"
          label=""
          :error="errors.email"
        />

        <InputField
          id="password-input"
          v-model="password"
          type="password"
          name="password"
          label=""
          :error="errors.password"
        />
        <div class="flex justify-center">
          <Button
            id="submit-button"
            type="submit"
            button-type="secondary"
            class="text-center mt-12"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  </PageWrapper>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'

import { useAuth } from '@/stores/auth'
import { useToast } from '@/stores/toast'

import PageWrapper from '@/components/layout/wrappers/PageWrapper'
import InputField from '@/components/common/inputs/InputField'
import Button from '@/components/common/buttons/Button'

import loginSchema from '@/schemas/loginSchema'

import axios from 'axios'
/* ---------------------------------------------------------------- */

const { login } = useAuth()
const { show: showToast } = useToast()

const { errors, handleSubmit } = useForm({ validationSchema: loginSchema })

const { value: email } = useField('email')
const { value: password } = useField('password')

/* ---------------------------------------------------------------- */

definePageMeta({
  layout: 'guest',
})

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/login`, {
      email: values.email,
      password: values.password,
    })
    /*
    await login({
      email: values.email,
      password: values.password,
    })*/
    console.log(response.data)
    const authToken = response.data.access_token
    console.log('AUTH_TOKEN :', authToken)
    // Almacenar el token en localStorage
    localStorage.setItem('authToken', authToken)

    navigateTo('/contacts')
  } catch (ex) {
    showToast('Error', 'Something went wrong.', 'danger')
  }
})
</script>

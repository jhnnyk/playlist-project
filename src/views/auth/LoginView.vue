<script setup>
import useLogin from '@/composables/useLogin'
import { useRouter } from 'vue-router'

const { error, login, isPending } = useLogin()
const router = useRouter()

const email = defineModel('email')
const password = defineModel('password')

const handleSubmit = async () => {
  await login(email.value, password.value)
  if (!error.value) {
    router.push({ name: 'UserPlaylists' })
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" name="email" autocomplete="email" placeholder="Email" v-model="email" />
    <input type="password" name="current-password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

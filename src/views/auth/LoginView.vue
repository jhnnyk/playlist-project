<script setup>
import useLogin from '@/composables/useLogin'

const { error, login } = useLogin()

const email = defineModel('email')
const password = defineModel('password')

const handleSubmit = async () => {
  const res = await login(email.value, password.value)
  if (!error.value) {
    console.log('user logged in. res: ', res)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" name="email" autocomplete="email" placeholder="Email" v-model="email" />
    <input type="password" name="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button>Log in</button>
  </form>
</template>

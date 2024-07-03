<script setup>
import useSignup from '@/composables/useSignup'

const { error, signup, isPending } = useSignup()
const displayName = defineModel('displayName')
const email = defineModel('email')
const password = defineModel('password')

const handleSubmit = async () => {
  const res = await signup(email.value, password.value, displayName.value)
  if (!error.value) {
    console.log('user signed up. res: ', res)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input
      type="text"
      name="displayName"
      autocomplete="username"
      placeholder="Display Name"
      v-model="displayName"
    />
    <input type="email" name="email" autocomplete="email" placeholder="Email" v-model="email" />
    <input
      type="password"
      name="password"
      autocomplete="new-password"
      placeholder="Password"
      v-model="password"
    />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

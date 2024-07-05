<script setup>
import getUser from '@/composables/getUser'
import useLogout from '@/composables/useLogout'
import { useRouter } from 'vue-router'

const { logout } = useLogout()
const router = useRouter()
const { user } = getUser()

const handleClick = async () => {
  await logout()
  console.log('user logged out')
  router.push({ name: 'Login' })
}
</script>

<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/weirdchicken.png" alt="avatar" />
      <h1><RouterLink :to="{ name: 'Home' }">Playlist Project</RouterLink></h1>
      <div class="links">
        <div v-if="user">
          <RouterLink :to="{ name: 'CreatePlaylist' }">Create Playlist</RouterLink>
          <RouterLink :to="{ name: 'UserPlaylists' }">My Playlists</RouterLink>
          <button @click="handleClick">Logout</button>
        </div>
        <div v-else>
          <RouterLink class="btn" :to="{ name: 'Signup' }">Sign up</RouterLink>
          <RouterLink class="btn" :to="{ name: 'Login' }">Log in</RouterLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}

nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

nav h1 {
  margin-left: 20px;
}

nav .links {
  margin-left: auto;
}

nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}

nav img {
  max-height: 60px;
}
</style>

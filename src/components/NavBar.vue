<script setup></script>

<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/weirdchicken.png" alt="avatar" />
      <h1><RouterLink :to="{ name: 'Home' }">Playlist Project</RouterLink></h1>
      <div class="links">
        <button>Logout</button>
        <RouterLink class="btn" :to="{ name: 'Signup' }">Sign up</RouterLink>
        <RouterLink class="btn" :to="{ name: 'Login' }">Log in</RouterLink>
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

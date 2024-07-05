<script setup>
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView.vue'

const { user } = getUser()
const { documents: playlists } = getCollection('playlists', ['userId', '==', user.value.uid])
</script>

<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
    <RouterLink :to="{ name: 'CreatePlaylist' }" class="btn">Create a New Playlist</RouterLink>
  </div>
</template>

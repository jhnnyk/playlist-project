<script setup>
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView.vue'

const { error, documents } = getCollection('playlists')
</script>

<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents">
      <ListView v-bind:playlists="documents" />
    </div>
  </div>
</template>

<script setup>
import getCollection from '@/composables/getCollection'

const { error, documents } = getCollection('playlists')
</script>

<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents">
      <div v-for="doc in documents" :key="doc.id">
        {{ doc.title }}
      </div>
    </div>
  </div>
</template>

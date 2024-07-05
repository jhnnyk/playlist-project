<script setup>
const title = defineModel('title')
const artist = defineModel('artist')
const showForm = defineModel('showForm', { default: false })

const handleSubmit = async () => {
  const newSong = {
    title: title.value,
    artist: artist.value,
    id: Math.floor(Math.random() * 1000000)
  }
  console.log(newSong)
}
</script>

<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Songs</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add a New Song</h4>
      <input type="text" name="title" placeholder="Song Title" v-model="title" />
      <input type="text" name="artist" placeholder="Artist" v-model="artist" />
      <button>Add</button>
    </form>
  </div>
</template>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}

form {
  max-width: 100%;
  text-align: left;
}
</style>

<script setup>
const title = defineModel('title')
const description = defineModel('description')

const handleSubmit = () => {
  console.log(title.value, description.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" name="title" placeholder="Playlist title" v-model="title" required />
    <textarea
      name="description"
      placeholder="Playlist description..."
      v-model="description"
      required
    ></textarea>
    <!-- upload playlist image -->
    <label for="file">Upload playlist cover image</label>
    <input type="file" id="file" />
    <div class="error"></div>
    <button>Create</button>
  </form>
</template>

<style scoped>
input[type='file'] {
  border: 0;
  padding: 0;
}

label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}

button {
  margin-top: 20px;
}
</style>

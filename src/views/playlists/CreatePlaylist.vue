<script setup>
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

const { filePath, url, uploadImage } = useStorage()
const { error, addItemtoDB } = useCollection('playlists')
const { user } = getUser()
const router = useRouter()

const title = defineModel('title')
const description = defineModel('description')
const file = defineModel('file')
const fileError = defineModel('fileError')
const isPending = defineModel('isPending', { default: false })

const handleSubmit = async () => {
  if (file.value) {
    isPending.value = true
    await uploadImage(file.value)
    const res = await addItemtoDB({
      title: title.value,
      description: description.value,
      userId: user.value.uid,
      userName: user.value.displayName,
      coverUrl: url.value,
      filePath: filePath.value,
      songs: [],
      createdAt: timestamp
    })
    isPending.value = false
    if (!error.value) {
      router.push({ name: 'PlaylistDetails', params: { id: res.id } })
    }
  }
}

// allowed file types
const types = ['image/png', 'image/jpeg']

const handleChange = (e) => {
  const selected = e.target.files[0]
  console.log(selected)

  if (selected && types.includes(selected.type)) {
    file.value = selected
    fileError.value = null
  } else {
    file.value = null
    fileError.value = 'Please select an image file (png or jpg)'
  }
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
    <input type="file" id="file" @change="handleChange" />
    <div class="error">{{ fileError }}</div>
    <div class="error"></div>
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving...</button>
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

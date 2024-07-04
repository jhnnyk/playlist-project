import { storage } from '@/firebase/config'
import { ref } from 'vue'
import getUser from './getUser'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const { user } = getUser()

const useStorage = () => {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`
    const imageStorageRef = storageRef(storage, filePath.value)

    try {
      const res = await uploadBytes(imageStorageRef, file)
      url.value = await getDownloadURL(res.ref)
    } catch (err) {
      console.log(err.message)
      error.value = err.message
    }
  }

  return { url, filePath, error, uploadImage }
}

export default useStorage

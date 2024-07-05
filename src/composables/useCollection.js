import { ref } from 'vue'
import { db } from '@/firebase/config'
import { collection, addDoc } from 'firebase/firestore'

const useCollection = (collectionName) => {
  const error = ref(null)
  const isPending = ref(false)

  // add a new document
  const addItemtoDB = async (doc) => {
    error.value = null
    isPending.value = true

    try {
      const res = await addDoc(collection(db, collectionName), doc)
      isPending.value = false
      return res
    } catch (err) {
      console.log(err)
      error.value = 'could not send the message'
      isPending.value = false
    }
  }

  return { error, addItemtoDB, isPending }
}

export default useCollection

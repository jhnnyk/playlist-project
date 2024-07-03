import { ref } from 'vue'
import { db } from '@/firebase/config'
import { collection, addDoc } from 'firebase/firestore'

const useCollection = (collectionName) => {
  const error = ref(null)

  // add a new document
  const addItemtoDB = async (doc) => {
    error.value = null

    try {
      await addDoc(collection(db, collectionName), doc)
    } catch (err) {
      console.log(err)
      error.value = 'could not send the message'
    }
  }

  return { error, addItemtoDB }
}

export default useCollection

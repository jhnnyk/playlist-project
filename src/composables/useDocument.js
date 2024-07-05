import { ref } from 'vue'
import { db } from '@/firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'

const useDocument = (collectionName, id) => {
  const error = ref(null)
  const isPending = ref(false)

  let docRef = doc(db, collectionName, id)

  const deleteDocument = async () => {
    isPending.value = true
    error.value = null

    try {
      const res = await deleteDoc(docRef)
      isPending.value = false
      return res
    } catch (err) {
      console.log(err.message)
      isPending.value = false
      error.value = 'could not delete the document'
    }
  }

  return { error, isPending, deleteDocument }
}

export default useDocument

import { ref, watchEffect } from 'vue'
import { db } from '@/firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'

const getDocument = (collectionName, id) => {
  const document = ref(null)
  const error = ref(null)

  const unsub = onSnapshot(
    doc(db, collectionName, id),
    (_doc) => {
      if (_doc.data()) {
        document.value = { ..._doc.data(), id: _doc.id }
        error.value = null
      } else {
        error.value = 'that document does not exist'
      }
    },
    (err) => {
      console.log(err.message)
      error.value = 'could not fetch the document'
    }
  )

  watchEffect((onInvalidate) => {
    // unsub from document when watcher is stopped (component unmounted)
    onInvalidate(() => unsub())
  })

  return { error, document }
}

export default getDocument

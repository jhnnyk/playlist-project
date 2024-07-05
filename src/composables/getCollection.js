import { ref, watchEffect } from 'vue'
import { db } from '@/firebase/config'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'

const getCollection = (collectionName, userQuery) => {
  const documents = ref(null)
  const error = ref(null)

  // register the Firestore collection reference and query
  let collectionRef = collection(db, collectionName)
  let q

  if (userQuery) {
    q = query(collectionRef, where(...userQuery), orderBy('createdAt'))
  } else {
    q = query(collectionRef, orderBy('createdAt'))
  }

  const unsub = onSnapshot(
    q,
    (snap) => {
      let results = []
      snap.forEach((doc) => {
        // must wait for the server to create the timestamp & send it back
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
      })

      // update values
      documents.value = results
      error.value = null
    },
    (err) => {
      console.log(err.message)
      documents.value = null
      error.value = 'could not fetch data'
    }
  )

  watchEffect((onInvalidate) => {
    // unsub from prev collection when watcher is stopped (component unmounted)
    onInvalidate(() => unsub())
  })

  return { error, documents }
}

export default getCollection

import { auth } from '@/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'

// refs
const user = ref(auth.currentUser)

// listen for auth changes
onAuthStateChanged(auth, (_user) => {
  console.log('user state change. current user: ', _user)
  user.value = _user
})

const getUser = () => {
  return { user }
}

export default getUser

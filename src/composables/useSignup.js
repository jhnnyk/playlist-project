import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { ref } from 'vue'

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, displayName) => {
  error.value = null
  isPending.value = true

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw new Error('Could not complete the signup')
    }
    await updateProfile(auth.currentUser, { displayName })
    error.value = null
    isPending.value = false
    return res
  } catch (err) {
    console.log(err.message)
    error.value = err.message
    isPending.value = false
  }
}

const useSignup = () => {
  return { error, signup, isPending }
}

export default useSignup

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import SignupView from '@/views/auth/SignupView.vue'
import CreatePlaylist from '@/views/playlists/CreatePlaylist.vue'
import PlaylistDetails from '@/views/playlists/PlaylistDetails.vue'
import UserPlaylists from '@/views/playlists/UserPlaylists.vue'
import { auth } from '@/firebase/config'

// route guards
const requireAuth = (to, from, next) => {
  let user = auth.currentUser

  if (!user) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupView
    },
    {
      path: '/playlists/create',
      name: 'CreatePlaylist',
      component: CreatePlaylist,
      beforeEnter: requireAuth
    },
    {
      path: '/playlists/:id',
      name: 'PlaylistDetails',
      component: PlaylistDetails,
      beforeEnter: requireAuth,
      props: true
    },
    {
      path: '/playlists/user',
      name: 'UserPlaylists',
      component: UserPlaylists,
      beforeEnter: requireAuth
    }
  ]
})

export default router

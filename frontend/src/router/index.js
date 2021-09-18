import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// Routes
const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/profile',
    name: 'Profil',
    component: () => import('../views/Profile.vue')
  },
]

// router
const router = new VueRouter({
  routes
})

export default router


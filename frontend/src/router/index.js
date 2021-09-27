import Vue from 'vue';
import VueRouter from 'vue-router';
import Data from '../views/Login.vue';

Vue.use(VueRouter);

// Routes
const routes = [
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
    meta : {
      requiresVisitor: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
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
];

// router
const router = new VueRouter({
  routes
});

// voir si cette section est essentielle
router.beforeEach((to, from, next) => {
  if (to.matched.some((routes) => routes.meta.requiresAuth)) {
    if (!Data.taka.token) {
      next({ 
        name: "Login" || "Accueil",
      });
    } else {
      next();
    }
  } else if (to.matched.some((routes) => routes.meta.requiresVisitor)) {
    if ((Data.data.token = localStorage.getItem("access_token"))) {
      next({
        name: "Home" || "Profile",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;


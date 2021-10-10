import Vue from 'vue';
import VueRouter from 'vue-router';

import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Profile from '../views/Profile.vue';

import Data from '../views/Login.vue';

Vue.use(VueRouter);

// Routes
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta : {
      requiresVisitor: true,
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta : {
      requiresVisitor: true,
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta : {
      requiresAuth: true,
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta : {
      requiresAuth: true,
    }
  },
];

// router
const router = new VueRouter({
  mode: "history",
  routes,
});

// voir si cette section est essentielle
router.beforeEach((to, from, next) => {
  if (to.matched.some((routes) => routes.meta.requiresAuth)) {
    if (!Data.data.token) {
      next({ 
        name: "Login" || "Signup",
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
<template>
  <body>
    <header>
      <div class="image">
        <img class="image__logo" src="./assets/logo.png" alt="Logo Groupomania">
      </div>
      <div class="nav">
        <div class="nav__navigation" > <!-- v-show condition user identifié : v-if="!identified" -->
          <router-link to="/home">Home</router-link> |
          <router-link to="/profile">Profil Utilisateur</router-link> |
          <router-link to="/logout">Logout</router-link> <!-- voir pour mettre un composant logout avec fonction pour mettre fin à la session -->
        </div>
        <div class="nav__navigation" > <!-- disparaît quand user identifié : v-else --> 
          <router-link to="/signup">Signup</router-link> |
          <router-link to="/login">Login</router-link>
        </div>
      </div>
    </header>
    <router-view/>
    <footer>
    </footer>
  </body>
</template>

<script>
// import axios from 'axios';
// import Vue from 'vue';

// new Vue({
//   el : '.nav',
//   data: {
//     identified: true
//   },
//   methods: {
//     login() {
//       const response = axios.get("http://localhost:5000/products");
//       this.users = response.data;
//     }
//   }
// });
</script>


<style lang="scss"></style>
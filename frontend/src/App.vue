<template>
  <body>
    <header>
      <div class="image">
        <img class="image__logo" src="./assets/logo.png" alt="Logo Groupomania">
      </div>
      <div class="nav">
        <div class="nav__navigation" > <!-- disparaît quand user identifié : v-show="!identified" --> 
          <router-link to="/signup">Signup</router-link> |
          <router-link to="/login">Login</router-link>
        </div>
        <div class="nav__navigation" > <!-- v-show condition user identifié : v-show="identified" -->
          <router-link to="/home">Home</router-link> |
          <router-link to="/profile">Profil Utilisateur</router-link> |
          <router-link to="/logout">Logout</router-link> <!-- voir pour mettre un composant logout avec fonction pour mettre fin à la session -->
        </div>
      </div>
    </header>
    <router-view/>
    <footer>
    </footer>
  </body>
</template>

<script>
// import Vue from 'vue'

// var vm = new Vue({
//   el : '.nav',
//   data: {
//     identified: true
//   },
//   methods: {
//     identified: function() {
//       login();
//     },
//   }
// });

// login = function() {

// }

</script>


<style lang="scss"></style>
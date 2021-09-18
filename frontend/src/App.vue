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
          <router-link to="/logout">Logout</router-link>
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


<style lang="scss">
/*
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 1024px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;;
}

header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image {
  &__logo {
  height: 100px;
  }
}

.nav {
  &__navigation {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #FD2D01;
      }
    }
  }
}

footer {
  height: 50px;
}
*/
</style>
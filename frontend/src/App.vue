<template>
  <body>
    <header>
      <div class="image">
        <img class="image__logo" src="./assets/logo.png" alt="Logo Groupomania">
      </div>
      <div class="nav"> <!-- v-show après login -->
        <div class="nav__registration">
          <router-link to="/login">Login</router-link> |
          <router-link to="/signup">Signup</router-link>
        </div>
        <div class="nav__navigation">
          <router-link to="/home">Home</router-link> |
          <router-link to="/profile">Profil Utilisateur</router-link>
        </div>
      </div>
    </header>
    <router-view/>
    <footer>

    </footer>
  </body>
</template>

<style lang="scss">
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
  &__registration {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #FD2D01;
      }
    }
  }
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
</style>
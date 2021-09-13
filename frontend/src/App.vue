<template>
  <body>
    <header>
      <div class="image">
        <img class="image__logo" src="./assets/logo.png" alt="Logo Groupomania">
      </div>
      <div id="nav"> <!-- v-show après login -->
        <router-link to="/">Home</router-link> |
        <router-link to="/Profile">Profil Utilisateur</router-link>
      </div>
    </header>
    <section class="corps"> <!-- disparaît quand utilisateur logged-in -->
      <div class="corps__buttons">
        <button type="submit">SIGN UP</button>
        <button type="submit">LOGIN</button>
      </div>
      <login />
      <signup />
    </section>
    <router-view/>
    <footer>

    </footer>
  </body>
</template>

<script>
import login from '@/components/login.vue'
import signup from '@/components/signup.vue'

export default {
  name: 'Login',
  components: {
    login,
    signup
  }
}
</script>


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

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #FD2D01;
    }
  }
}

.corps {
  width: 100%;
  margin: auto;
  & button {
    margin: 0 10px;
  }
}

footer {
  height: 50px;
}
</style>
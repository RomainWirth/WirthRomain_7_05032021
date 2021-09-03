<template>
  <div id="app">
    <header>
      <div class="image">
        <img class="image__logo" src="./assets/logo.png" alt="Logo Groupomania">
      </div>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/Profile">Profil Utilisateur</router-link>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 1024px;
}

header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image {
  width: 50%;
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
</style>
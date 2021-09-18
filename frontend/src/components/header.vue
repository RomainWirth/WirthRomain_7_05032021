<template>
    <header>
      <div class="image">
        <img class="image__logo" src="./assets/logo.png" alt="Logo Groupomania">
      </div>
      <div class="nav"> <!-- v-show après login -->
        <div class="nav__navigation" > <!-- disparaît quand user identifié : v-show="!identified" --> 
          <router-link to="/login">Login</router-link> |
          <router-link to="/signup">Signup</router-link>
        </div>
        <div class="nav__navigation" > <!-- v-show condition user identifié : v-show="identified" -->
          <router-link to="/home">Home</router-link> |
          <router-link to="/profile">Profil Utilisateur</router-link>
        </div>
      </div>
    </header>
</template>

<script>
export default {
  name: 'Header',
  components: {
    login,
    signup,
    home,
    profile
  }
}
</script>

<style lang="scss"></style>
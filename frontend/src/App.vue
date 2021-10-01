<template>
  <body id="app">
    <header>
      <div class="image">
        <img class="image__logo" src="./assets/logo.png" alt="Logo Groupomania">
      </div>
      <div class="nav">
        <div class="nav__navigation" v-if="identified"> <!-- v-show condition user identifié : v-if="identified" to="/login"-->
          <router-link to="/home">Home</router-link> |
          <router-link to="/profile">Profil Utilisateur</router-link> |
          <router-link to="/login" v-on:click.native="Logout()">Logout</router-link> <!-- voir pour mettre un composant logout avec fonction pour mettre fin à la session v-on:click.native="Logout()" -->
        </div>
        <div class="nav__navigation" v-else> <!-- disparaît quand user identifié : v-else --> 
          <router-link to="/">Signup</router-link> |
          <router-link to="/login">Login</router-link>
        </div>
      </div>
    </header>
    <router-view /> <!-- @identified="setIdentified" -->
    <footer>
    </footer>
  </body>
</template>

<script>
// import axios from 'axios';
// import Vue from 'vue';

export default {
  data() {
    return {
      identified: false
    }
  },
  methods: {
    Logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("u_id");
      this.$router.push("/login");
      this.identified = false;
    },
    // setIdentified(status) {
    //   this.identified = status;
    // }
  }
};
</script>

<style lang="scss"></style>
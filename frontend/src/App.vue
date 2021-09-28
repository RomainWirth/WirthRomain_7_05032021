<template>
  <body id="app">
    <header>
      <div class="image">
        <img class="image__logo" src="./assets/logo.png" alt="Logo Groupomania">
      </div>
      <div class="nav">
        <div class="nav__navigation" v-if="identified"> <!-- v-show condition user identifié : v-if="identified" to="/login"-->
          <router-link to="/Home">Home</router-link> |
          <router-link to="/Profile">Profil Utilisateur</router-link> |
          <router-link to="/Login" v-on:click.native="Logout()">Logout</router-link> <!-- voir pour mettre un composant logout avec fonction pour mettre fin à la session v-on:click.native="Logout()" -->
        </div>
        <div class="nav__navigation" v-else> <!-- disparaît quand user identifié : v-else --> 
          <router-link to="/Signup">Signup</router-link> |
          <router-link to="/Login">Login</router-link>
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
      this.identified = false;
    },
    setIdentified() {
      
    }
  }
};
</script>

<style lang="scss"></style>
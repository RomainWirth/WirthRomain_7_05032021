<template>
    <header>
      <div class="image">
        <img class="image__logo" src="../assets/logo.png" alt="Logo Groupomania"/>
      </div>
      <div class="nav">
        <div class="nav__navigation">
          <span v-if="level === 0" style="color: green; font-weight: bold">Admin</span> | 
          <router-link to="/home">Home</router-link> |
          <router-link to="/profile">Profil Utilisateur</router-link> |
          <router-link to="/" v-on:click.native="Logout()">Logout</router-link>
        </div>
      </div>
    </header>
</template>

<script>
export default {
    name: 'headerNav',
    data() {
        return {
            level: Number,
        }
    },
    async mounted() {
        this.level = Number(localStorage.getItem("level"));
    },
    methods: {
    Logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("userId");
      this.$router.push("/");
    },
  },
}
</script>

<style lang="scss"></style>
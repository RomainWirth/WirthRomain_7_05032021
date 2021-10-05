<template>
  <body>
    <header>
      <div class="image">
        <img class="image__logo" src="../assets/logo.png" alt="Logo Groupomania">
      </div>
      <div class="nav">
        <div class="nav__navigation" > <!-- v-show condition user identifié : v-if="identified" to="/login"-->
          <router-link to="/home">Home</router-link> |
          <router-link to="/profile">Profil Utilisateur</router-link> |
          <router-link to="/login" v-on:click.native="Logout()">Logout</router-link> <!-- voir pour mettre un composant logout avec fonction pour mettre fin à la session v-on:click.native="Logout()" -->
        </div>
      </div>
    </header>
    <section class="home">
      <forum msg="Bienvenue sur le forum de discussion de Groupomania" /> <!-- ajouter un v-show -->
      <!-- <topic /> -->
    </section>
  </body>

</template>

<script>
// @ is an alias to /src
import forum from '@/components/forum.vue';
// import topic from '@/components/topic.vue'

export default {
  name: 'forum',
  components: {
    forum,
    // topic
  },
  methods: {
    Logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("userId");
      this.$router.push("/login");
      this.identified = false;
    },
  }
};
</script>

<style lang="scss"></style>
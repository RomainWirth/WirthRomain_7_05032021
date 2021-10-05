<template>
  <body>
    <header>
      <div class="image">
        <img class="image__logo" src="../assets/logo.png" alt="Logo Groupomania">
      </div>
      <div class="nav">
        <div class="nav__navigation"> <!-- v-show condition user identifié : v-if="identified" to="/login"-->
          <router-link to="/home">Home</router-link> |
          <router-link to="/profile">Profil Utilisateur</router-link> |
          <router-link to="/login" v-on:click.native="Logout()">Logout</router-link> <!-- voir pour mettre un composant logout avec fonction pour mettre fin à la session v-on:click.native="Logout()" -->
        </div>
      </div>
    </header>
    <section class="home">
      <forum />

      <topic v-for="topic in topics" :key="topic" v-bind:title="topic.title" v-bind:content="topic.content" v-bind:user="topic.user" v-bind:date="topic.date" />
    </section>
  </body>

</template>

<script>
// @ is an alias to /src
import forum from '@/components/forum.vue';
import topic from '@/components/topic.vue';

export default {
  name: 'home',
  components: {
    forum,
    topic
  },

  data() {
    return {
      token: localStorage.getItem("access_token"),
      user_id: localStorage.getItem("userId"),
      topics:[{title:"title 1",content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",user:"me",date:"05/10/2021"},{title:"title 2",content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",user:"me",date:"05/10/2021"}]
    }
  },
  methods: {
    getParentMessages(){
      this.topics = [] // recuprer cette list apartir du backend
    },
    Logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("userId");
      this.$router.push("/login");
      // this.identified = false;
    },
  }
};
</script>

<style lang="scss"></style>
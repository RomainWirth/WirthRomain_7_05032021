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
          <router-link to="/login" v-on:click.native="Logout()">Logout</router-link>
        </div>
      </div>
    </header>
    <section class="home">
      <h1>Bienvenue sur le forum de discussion de Groupomania</h1>
      <newSubject />
      <mainForum />
      <specificTopic v-for="topic in topics" :key="topic"
        v-bind:title="topic.title" 
        v-bind:content="topic.content" 
        v-bind:user="topic.user" 
        v-bind:date="topic.date" 
      />
    </section>
  </body>

</template>

<script>
// @ is an alias to /src
import newSubject from '@/components/newSubject.vue';
import mainForum from '@/components/mainForum.vue';
import specificTopic from '@/components/specificTopic.vue';

export default {
  name: 'home',
  components: {
    newSubject,
    mainForum,
    specificTopic
  },
  data() {
    return {
      token: localStorage.getItem("access_token"),
      user_id: localStorage.getItem("userId"),
      mainSubjects:[{

      }],
      topics:[{
        title:"title 1",
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        user:"me",
        date:"05/10/2021",
        moderation:"non modéré"
        },
        {title:"title 2",
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        user:"me",
        date:"05/10/2021",
        moderation:"non modéré"
        }
      ]
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
    },
  }
};
</script>

<style lang="scss"></style>
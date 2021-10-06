<template>
  <body>
    <header>
      <div class="image">
        <img
          class="image__logo"
          src="../assets/logo.png"
          alt="Logo Groupomania"
        />
      </div>
      <div class="nav">
        <div class="nav__navigation">
          <router-link to="/home">Home</router-link> |
          <router-link to="/profile">Profil Utilisateur</router-link> |
          <router-link to="/login" v-on:click.native="Logout()"
            >Logout</router-link
          >
        </div>
      </div>
    </header>
    <section class="home">
      <h1>Bienvenue sur le forum de discussion de Groupomania</h1>
      <newSubject />
      <parent-topic
        v-for="mainTopic in serverTopic"
        :key="mainTopic.tm_id"
        v-bind:Id="mainTopic.tm_id"
        v-bind:Title="mainTopic.tm_title"
        v-bind:Image="mainTopic.tm_picture_url"
        v-bind:Content="mainTopic.tm_content"
        v-bind:Pseudo="mainTopic.u_pseudo"
        v-bind:date="mainTopic.tm_posting_date"
        v-bind:Moderation="mainTopic.tm_moderation"
      />
      <!-- <mainForum v-for="mainTopic in mainTopics" :key="mainTopic"
        v-bind:mainTitle="mainTopic.tmTitle"
        v-bind:mainContent="mainTopic.tmContent"
        v-bind:mainPseudo="mainTopic.tmPseudo"
        v-bind:mainDate="mainTopic.tmDate"
        v-bind:mainModeration="mainTopic.tmModeration"
      /> -->
      <!-- 
        v-bind:mainImage="mainTopic.tmImage"
        v-bind:mainTmId="mainTopic.tmId"
      -->
      <!-- <specificTopic v-for="topic in topics" :key="topic"
        v-bind:title="topic.title" 
        v-bind:content="topic.content" 
        v-bind:user="topic.user" 
        v-bind:date="topic.date" 
      /> -->
    </section>
  </body>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

import newSubject from "@/components/newSubject.vue";
// import mainForum from '@/components/mainForum.vue';
// import specificTopic from '@/components/specificTopic.vue';
// import parentTopic from "@/components/parentTopic.vue";
import parentTopic from "../components/parentTopic.vue";

export default {
  name: "home",
  components: {
    parentTopic,
    newSubject,
    // mainForum,
    // specificTopic,
    // ParentTopic,
  },
  data() {
    return {
      token: localStorage.getItem("access_token"),
      user_id: localStorage.getItem("userId"),
      serverTopic: null,
      // mainTopics: [
      //   {
      //     tmId: 6,
      //     tmTitle: "Titre 1",
      //     tmContent: "Lorem Ipsum",

      //     tmImage:
      //       "https://www.ecoletremplin.ch/wp-content/uploads/2020/06/social_media_conversation_graphic.jpg",
      //     tmPseudo: "userAAA",
      //     tmDate: "06/10/2021",
      //     tmModeration: 0,
      //   },
      //   {
      //     tmId: 1,
      //     tmTitle: "Titre 2",
      //     tmContent: "Lorem Ipsum",
      //     tmImage:
      //       "https://www.ecoletremplin.ch/wp-content/uploads/2020/06/social_media_conversation_graphic.jpg",
      //     tmPseudo: "userBBB",
      //     tmDate: "06/10/2021",
      //     tmModeration: 1,
      //   },
      // ],
      // topics: [
      //   {
      //     title: "title 1",
      //     content:
      //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      //     user: "me",
      //     date: "05/10/2021",
      //     moderation: "non modéré",
      //   },
      //   {
      //     title: "title 2",
      //     content:
      //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      //     user: "me",
      //     date: "05/10/2021",
      //     moderation: "non modéré",
      //   },
      // ],
    };
  },
  async mounted() {
    const access_token =localStorage.getItem("access_token");
    console.log(access_token);
    var config = {
      method: "get",
      url: "http://localhost:3000/api/topic_messages/parent",
      headers: {Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTYzMzU0MDk5OCwiZXhwIjoxNjMzNjI3Mzk4fQ.NbzG4qDNbsmjkp9Zpc5POePoYDkl9pGhxfy89Eb64yk",
      },
    };

    const response = await axios(config);
    console.log(response);
    this.serverTopic = response.data;
      // .then(function (response) {
      //   this.serverTopic = response.data;
      //   console.log(JSON.stringify(response.data));
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
  },
  methods: {
    getParentMessages() {
      this.topics = []; // recuprer cette list apartir du backend
    },
    Logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("userId");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss"></style>
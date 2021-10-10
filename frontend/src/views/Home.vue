<template>
  <body>
    <header>
      <div class="image">
        <img class="image__logo" src="../assets/logo.png" alt="Logo Groupomania"/>
      </div>
      <div class="nav">
        <div class="nav__navigation">
          <span v-if="level === 0" style="color: green; font-weight: bold">Admin</span> | 
          <router-link to="/home">Home</router-link> |
          <router-link to="/profile">Profil Utilisateur</router-link> |
          <router-link to="/login" v-on:click:native="Logout">Logout</router-link>
        </div>
      </div>
    </header>
    <section class="home">
      <h1>Bienvenue sur le forum de discussion de Groupomania</h1>
      <newSubject />
      <parentTopic
        v-for="mainTopic in serverTopic"
        :key="mainTopic.tm_id"
        v-bind:Id="mainTopic.tm_id"
        v-bind:Title="mainTopic.tm_title"
        v-bind:Image="mainTopic.tm_picture_url"
        v-bind:Content="mainTopic.tm_content"
        v-bind:Pseudo="mainTopic.u_pseudo"
        v-bind:date="mainTopic.tm_posting_date"
        v-bind:Moderation="mainTopic.tm_moderation"
        v-bind:userId="mainTopic.tm_user_id"
      />
    </section>
  </body>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

import newSubject from "@/components/newSubject.vue";
import parentTopic from "../components/parentTopic.vue";

export default {
  name: "home",
  components: {
    newSubject,
    parentTopic,
    // mainForum,
    // specificTopic
  },
  data() {
    return {
      level: Number,
      serverTopic: null,
    };
  },
  async mounted() {
    this.level = Number(localStorage.getItem("level"));
    const access_token = localStorage.getItem("access_token");
    console.log(access_token);
    var config = {
      method: "get",
      url: "http://localhost:3000/api/topic_messages/parent",
      headers: { Authorization: "Bearer " + access_token },
    };
    const response = await axios(config);
    console.log(response);
    this.serverTopic = response.data.sort((a, b) => {
      if (new Date(a.tm_posting_date) > new Date(b.tm_posting_date)) return -1;
      if (new Date(a.tm_posting_date) < new Date(b.tm_posting_date)) return 1;
      return 0;
    });
    // .then((response) => {
    //   this.serverTopic = response.data;
    //   console.log(JSON.stringify(response.data));
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  },
  methods: {
    Logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("userId");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss"></style>
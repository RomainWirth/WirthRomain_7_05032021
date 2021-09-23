<template>
  <div class="forum">
    <h1 class="forum__title">Bienvenue sur le forum de discussion de Groupomania</h1>
    <div class="forum__new-topic">
      <div>
        <button type="submit">Nouveau</button>
      </div>
      <div class="forum__new-topic--field"> <!-- v-show @clic bouton "Nouveau" -->
        <input name="titre" cols="120" rows="1" placeholder="titre" v-model="tmTitle"> <!-- value = même titre que parent -->
        <textarea name="réponse" id="" cols="120" rows="5" placeholder="répondez ici" maxlength="600" v-model="tmContent"></textarea>
        <input type="hidden" value="" name="tm_parent" v-model="tmIdParent"> <!-- value = id du poste parent -->
        <input type="hidden" value="" name="tm_user_id" v-model="tmUserId"> <!-- value = id de l'usager identifié -->           
        <button type="submit" @click="createMessage">Poster</button> <!-- @clic -->
      </div>
    </div>
    <div class="forum__topics" v-for="topic_message in topic_messages" :key="topic_message.tm_id"> <!-- boucle v-for selon le nombre de sujets créés :  -->
      <h2 class="forum__topics--title" v-bind:href="topic.vue">{{ topic_messages.tm_title }}</h2> <!-- cliquable : donne accès au topic en question = -->
      <p class="forum__topics--content">{{ topic_messages.tm_content }}</p>
      <div class="forum__topics--details">
        <p>{{ topic_messages.tm_user_id }}</p>
        <p>{{ topic_messages.tm_posting_date }}</p>
        <p>modération : {{ tm_messages.tm_moderation }}</p>
      </div>
    </div>
    <!--
    <div class="forum__new-topic">
      <div>
        <button type="submit">Nouveau</button>
      </div>
      <div class="forum__new-topic--field">
        <textarea name="réponse" id="" cols="120" rows="5" placeholder="répondez ici" maxlength="600"></textarea>            
        <input type="hidden" value="" name="tm_parent">
        <input type="hidden" value="" name="tm_titre">
        <input type="hidden" value="" name="tm_user_id">          
        <button type="submit">Poster</button> 
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'forum',
  data() {
    return {
      tmContent: "",
      tmIdParent: "",
      tmTitle: "",
      tmUserId: ""
    };
  },
  methods: {
    // create messages
    async createMessage() {
      try {
        await axios.post("http://localhost:/5000/topic_messages", {
          tm_content: this.tmContent,
          tm_parent: this.tmIdParent,
          tm_title: this.tmTitle,
          tm_user_id: this.tmUserId
        });

      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss"></style>
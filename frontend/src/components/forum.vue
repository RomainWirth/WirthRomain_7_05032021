<template>
  <div class="forum">
    <h1 class="forum__title">Bienvenue sur le forum de discussion de Groupomania</h1>
    <div class="forum__new-topic">
      <div>
        <button type="submit">Nouveau</button>
      </div>
      <div class="forum__new-topic--field"> <!-- v-show @clic bouton "Nouveau" -->
        <textarea name="réponse" id="" cols="120" rows="5" placeholder="répondez ici" maxlength="600"></textarea>
        <input type="hidden" value="" name="tm_parent"> <!-- value = id du poste parent -->
        <input type="hidden" value="" name="tm_titre"> <!-- value = même titre que parent -->
        <input type="hidden" value="" name="tm_user_id"> <!-- value = id de l'usager identifié -->           
        <button type="submit">Poster</button>
      </div>
    </div>
    <div class="forum__topics" v-for="topic_message in topic_messages" :key="topic_message.tm_id"> <!-- boucle v-for selon le nombre de sujets créés :  -->
      <h2 class="forum__topics--title" v-bind:href="topic.vue">{{ topic_messages.tm_titre }}</h2> <!-- cliquable : donne accès au topic en question = -->
      <p class="forum__topics--content">{{ topic_messages.tm_content }}</p>
      <div class="forum__topics--details">
        <p>{{ topic_messages.tm_user_id }}</p>
        <p>{{ topic_messages.tm_posting_date }}</p>
        <p>modération : {{ tm_messages.tm_moderation }}</p>
      </div>
    </div>
    <div class="forum__new-topic">
      <div>
        <button type="submit">Nouveau</button>
      </div>
      <div class="forum__new-topic--field">
        <textarea name="réponse" id="" cols="120" rows="5" placeholder="répondez ici" maxlength="600"></textarea>            
        <input type="hidden" value="" name="tm_parent"> <!-- value = id du poste parent -->
        <input type="hidden" value="" name="tm_titre"> <!-- value = même titre que parent -->
        <input type="hidden" value="" name="tm_user_id"> <!-- value = id de l'usager identifié -->           
        <button type="submit">Poster</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const message_data = axios.get("http://localhost:/5000/topic_messages");

export default {
  name: 'forum',
  data() {
    return {
      topic_messages: [],
    };
  },
  created() {
    this.showTopicMessages();
  },
  methods: {
    // get all messages
    async showTopicMessages() {
      try {
        const response = await message_data;
        this.topic_messages = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    // 

  },
};
</script>

<style lang="scss"></style>
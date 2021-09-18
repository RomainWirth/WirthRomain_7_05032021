<template>
  <div class="forum">
    <h1 class="forum__title">Bienvenue sur le forum de discussion de Groupomania</h1>
    <div class="forum__new-topic">
      <button type="submit">Nouveau</button>
      <div class="forum__new-topic--field"> <!-- v-show @clic bouton "Nouveau" -->
        <textarea name="réponse" id="" cols="120" rows="5" placeholder="répondez ici" maxlength="600"></textarea>
        <input type="hidden" value="" name="tm_parent"> <!-- value = id du poste parent -->
        <input type="hidden" value="" name="tm_titre"> <!-- value = même titre que parent -->
        <input type="hidden" value="" name="tm_user_id"> <!-- value = id de l'usager identifié -->           
        <button type="submit">Poster</button>
      </div>
    </div>
    <div class="forum__topics" > <!-- boucle v-for selon le nombre de sujets créés : v-for="topic_message in topic_messages" :key="topic_message.tm_id" -->
      <h2 class="forum__topics--title">Titre Topic 1</h2> <!-- cliquable : donne accès au topic en question = {{ topic_messages.tm_titre }}-->
      <p class="forum__topics--content">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries, but also the leap into electronic typesetting, 
        remaining essentially unchanged. 
      </p>
      <div class="forum__topics--details">
        <p>absdefghijklmnopqrstuvwxyz</p>
        <p>10/10/2010 00:00:00</p>
        <p>modération : 0</p>
      </div>
    </div>
    <div class="forum__new-topic">
      <button type="submit">Nouveau</button>
      <div class="forum__new-topic--field">
        <textarea name="réponse" id="" cols="120" rows="5" placeholder="répondez ici" maxlength="600"></textarea>            
        <button type="submit">Poster</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
        const response = await axios.get("http://localhost:/5000/topic_messages");
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
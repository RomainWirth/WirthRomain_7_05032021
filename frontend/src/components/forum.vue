<template>
  <div class="forum">
    <h1 class="forum__title">Bienvenue sur le forum de discussion de Groupomania</h1>
    <div class="forum__new-topic">
      <button type="submit">Nouveau</button>
    </div>
    <div class="forum__topics" v-for="topic_message in topic_messages" :key="topic_message.tm_id"> <!-- boucle v-for selon le nombre de sujets créés -->
      <h2 class="forum__topics--title">{{ topic_message.tm_titre }}</h2> <!-- cliquable : donne accès au topic en question -->
      <div class="forum__topics--details">
        <p>absdefghijklmnopqrstuvwxyz</p>
        <p>10/10/2010 00:00:00</p>
      </div>
    </div>
    <div class="forum__new-topic">
      <button type="submit">Nouveau</button>
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


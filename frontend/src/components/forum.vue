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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.forum {
  border: 1px solid #CCCCCC;
  border-radius: 15px;
  background-color: #FFFFFF;
  padding: 20px;
  &__title {
    border-bottom: 1px solid #CCCCCC;
    padding: 10px;
  }
  &__topics {
    margin: 10px 0;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid #CCCCCC;
    border-bottom: 1px solid #CCCCCC;
    &--title {
      margin: 0px;
      padding: 10px 10px 5px 10px;
    }
    &--details {
      width: 50%;
      font-size: 0.75em;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      & p {
        margin: 0px;
        margin-right: 10px;
      }
    }
  }
}
</style>

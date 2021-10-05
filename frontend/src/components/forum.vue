<template>
  <div class="forum">
    <h1 class="forum__title">Bienvenue sur le forum de discussion de Groupomania</h1>
    <div class="forum__new-topic">
      <div>
        <button type="submit">Nouveau Sujet</button>
      </div>
      <div class="forum__new-topic--field"> <!-- v-show @clic bouton "Nouveau" -->
        <input name="tmTitle" cols="120" rows="1" placeholder="titre" > <!-- value = même titre que parent v-model="tmTitle" -->
        <textarea name="tmContent" id="" cols="120" rows="5" placeholder="écrivez le contenu ici" maxlength="600"></textarea> <!--  v-model="tmContent" -->
        <input type="hidden" value="" name="tmIdParent" > <!-- value = id du poste parent v-model="tmIdParent" -->
        <input type="hidden" value="" name="tmUserId" > <!-- value = id de l'usager identifié v-model="tmUserId" -->
        <p>
          <button type="submit">Ajouter un fichier</button>
          Aucun fichier
        </p>
        <button type="submit" >Poster</button> <!-- @click="createMessage" -->
      </div>
    </div>
    <div class="forum__topics" > <!-- boucle v-for selon le nombre de sujets créés : v-for="topic_content in topic_contents" :key="topic_content.tmId" -->
      <h2 class="forum__topics--title" >{{ topic_contents.tmTitle }}</h2> <!-- cliquable : donne accès au topic en question = v-bind:href="topic.vue" + {{ topic_messages.tm_title }} + parent 0 -->
    <!--  <p class="forum__topics--content">{{ topic_messages.tm_content }}</p> -->
      <div class="forum__topics--details">
        <p>{{ topic_contents.tmUserId }}</p>
        <p>{{ topic_contents.tmPistingDate }}</p>
        <p>modération : {{ topic_contents.tmModeration }}</p>
      </div>
      <button type="submit" @click="updateMessage">Modifier</button> <!-- @clic update -->
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
      topic_contents: {
        tmId: "",
        tmIdParent: "",        
        tmTitle: "",
        tmContent: "",
        tmPostingDate: "",
        tmUserId: "",
        tmPictureUrl: "",        
        tmModeration: ""
      }
    };
  },
  methods: {
    // create messages
    async createMessage() {
      try {
        await axios.post("http://localhost:3000/api/topic_messages", {
          tm_parent: this.tmIdParent,
          tm_title: this.tmTitle,
          tm_content: this.tmContent,
          tm_user_id: this.tmUserId
        });
        this.tmTitle = "";
        this.tmContent = "";
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
    // get messages
    getMessages() {
      axios.get("http://localhost:3000/api/topic_messages")
      .then(response => (
        this.tmId = response.tm_id,
        this.tmTitle = response.topic_messages.tm_title,
        this.tmContent = response.topic_messages.tm_content,
        this.tmIdParent = response.topic_messages.tm_parent,
        this.tmUserId = response.topic_messages.tm_user_id
      ))
      .catch(error => console.log(error))
    },
    // update messages
    async updateMessage() {
      try {
        await axios.put("http://localhost:3000/api/topic_messages", {

        });
        
      } catch (err) {
        console.log(err);
      }
    }
    // delete message
  },
};
</script>

<style lang="scss"></style>
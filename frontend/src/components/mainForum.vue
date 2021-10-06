<template>
  <div class="forum">
    <div class="forum__topics" > <!-- boucle v-for selon le nombre de sujets créés : v-for="getTopic in getTopics" :key="getTopic.getTmId" -->
      <input type="hidden" value="" v-model="getTmId"> <!-- valeur de l'id du message -->
      <h2 class="forum__topics--title" >titre 1{{getTmTitle}}</h2> <!-- cliquable : donne accès au topic en question = v-bind:href="topic.vue" + {{getTopic.getTmTitle}} + parent 0 -->
      <input name="modifyTmTitle" cols="120" rows="1" placeholder="titre" v-if="show"> <!-- value = même titre que parent v-model="tmTitle" -->
      <p class="forum__topics--content">Lorem Ipsum is simply dummy text of the printing and typesetting industry.{{getTopic.getTmContent}}</p>
      <textarea name="modifyTmContent" id="" cols="120" rows="5" placeholder="contenu du message à modifier" maxlength="600" v-if="show"></textarea> <!-- afficher le contenu du message à modifier -->
      <p class="forum__topics--picture">
        <img src="" alt="">
      </p>
      <div class="forum__topics--details">
        <p>pseudo utilisateur{{getTmPseudo}}</p>
        <p>date de post{{getTmPostingDate}}</p>
        <p>modération : modéré ou non{{getTmModeration}}</p> <!-- manipuler la donnée pour afficher : non modéré | accepté | refusé -->
      </div>
      <button type="submit" v-on:click="showModify()" v-if="!show">Modifier</button> <!-- @clic update @click="updateMessage()" -->
      <p v-if="show">
        <button type="submit" v-on:click="updateMassage()">Valider</button>
        <button type="submit" v-on:click="show = !show">Annuler</button>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'forum',
  props: {
    getTmTitle: String,
    content: String,
    user: String,
    date: String
  },
  data() {
    return {
      show: false,
      getTopic: {
        getTmTitle: "",
        getTmContent: "",
        getTmPicture: "",
        getTmPseudo: "",
        getTmPostingDate: "",
        getTmModeration: ""
      }
    };
  },
  methods: {
    // create messages
    showModify(){
      this.show=true;
    },
    createMessage(e) {
      e.preventDefault();
      axios.post("http://localhost:3000/api/topic_messages", {
        front_tm_title: this.newTmTitle,
        front_tm_content: this.newTmContent,
        front_tm_parent: this.newTmIdParent,
        front_tm_user_id: this.newTmUserId
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {console.log(err);});
    },
    // get messages parent 0
    getMessages() {
      axios.get("http://localhost:3000/api/topic_messages")
      .then(response => (
        // this.getTmId = response.tm_id, // voir dans la logique si utile
        this.getTmTitle = response.topic_messages.tm_title,
        this.getTmContent = response.topic_messages.tm_content,
        this.getTmPicture = response.topic_messages.tm_picture_url,
        this.tmUserId = response.topic_messages.tm_user_id,
        this.getTmPseudo = response.u_pseudo, // faire une query avec jointures pour récupérer les données du pseudo de l'utilisateur de la table users
        this.getTomPostingDate = response.tm_posting_date,
        this.tmIdParent = response.tm_parent,
        this.getTmModeration = response.tm_moderation
      ))
      .catch(error => console.log(error))
    },
    // update messages
    updateMessage() {
      axios.put("http://localhost:3000/api/topic_messages", {

      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    // delete message
    },
    deleteMessage() {

    }
  }
};
</script>

<style lang="scss"></style>
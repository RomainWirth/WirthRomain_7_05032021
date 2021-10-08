<template>
  <div class="forum">
<!-- au clic sur titre du topic : affichage de la div -->        
    <div class="forum__topics"> 
      <p class="forum__topics--content">Answer</p>
      <textarea name="réponse" id="" cols="120" rows="5" placeholder="modifiez votre réponse ici" maxlength="600" v-if="showAnswer"></textarea>
      <div class="forum__topics--picture">
        <img :src="'http://localhost:3000/'" alt="conversation" >
      </div>
      <div class="forum__topics--upload">
        <input class="forum__topics--upload" type="file" @click="updateImage()" v-if="showAnswer">
      </div>
      <div class="forum__topics--details">
        <p>abcdefghijklmnopqrstuvwxyz</p>
        <p>10/10/2010 00:00:00</p>
        <p>Modération</p>
      </div>
      <div v-if="!showAnswer"> <!-- afficher si auteur du message : comparer avec user_id -->
        <button type="submit" v-on:click="showModifyAnswer()">Modifier</button>
        <button type="submit" v-on:click="deleteAnswer()">Supprimer</button>
      </div>
      <div v-if="showAnswer">
        <button type="submit" v-on:click="updateAnswer()">Valider</button>
        <button type="submit" v-on:click="showAnswer = !showAnswer">Annuler</button>
      </div>
    </div>
<!-- au clic sur titre du topic : affichage de la div -->
    <div class="forum__topics"> 
      <button type="submit" v-on:click="showAnswerBox()" v-if="!answerBox">répondre</button>
      <form action="" v-if="answerBox">
        <textarea name="réponse" id="" cols="120" rows="5" placeholder="répondez ici" maxlength="600"></textarea>
        <input type="hidden" value="" name="tm_parent"> 
        <input type="hidden" value="" name="tm_titre"> 
        <input type="hidden" value="" name="tm_user_id">
      </form>
      <div class="topic__anwser-area--button" v-if="answerBox">
        <div class="media">
          <input type="file" @click="addImage()">
        </div>
        <div>
          <button type="submit"  v-on:click="createAnswer()">Valider</button>
          <button type="submit" v-on:click="answerBox = !answerBox">Annuler</button>
        </div>
      </div>
    </div>
    <div class="forum__topics">
      <button type="submit" v-on:click="answers = !answers">Fermer</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'topic',
  props: {
    title: String,
    content: String,
    user: String,
    date: String
  },
  data() {
    return {
      showMain: false,
      showAnswer: false,
      answerBox: false,
      validateTopic: false,
      answerContent: {
        tmId: "",
        tmIdParent: "",        
        tmTitle: "",
        tmContent: "",
        tmPostingDate: "",
        tmUserId: "",
        tmPictureUrl: "",        
        tmModeration: ""
      }
    }
  },
  methods: {
    showModifyMain(){this.showMain=true;},
    showModifyAnswer(){this.showAnswer=true;},
    showAnswerBox(){this.answerBox=true},
    showModeration(){this.validateTopic=true},

    addImadge(){

    },
    displayMessage() {
      axios.get("http://localhost:3000/api/topic_messages")
      .then(response => (
        this.answerContent.tmId = response.tm_id,
        this.answerContent.tmTitle = response.topic_messages.tm_title,
        this.answerContent.tmContent = response.topic_messages.tm_content,
        this.answerContent.tmPostingDate = response.topic_messages.tm_posting_date,
        this.answerContent.tmUserId = response.topic_messages.tm_user_id
      ))
      .catch(error => console.log(error));
    },
    updateMain() {

    },
    updateAnswer() {

    },
    createAnswer() {
      axios.post("http://localhost:3000/api/topic_messages", {
        
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {console.log(err);});
    },
  }
}
</script>

<style lang="scss"></style>
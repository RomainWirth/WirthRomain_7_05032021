<template>
  <div class="topic">
    <div class="topic__title">
      <h3 class="topic__title--title">{{title}}</h3>
      <p class="topic__title--content">
        {{content}}
      </p>
      <div class="topic__title--details">
        <p>{{user}}</p>
        <p>{{date}}</p>
        <p>modération</p>
      </div>
      <button type="submit" v-on:click="showModifyMain()" v-if="!showMain">Modifier</button>
      <div class="topic__title--modify" v-if="showMain">
        <textarea name="réponse" id="" cols="120" rows="5" placeholder="répondez ici" maxlength="600" v-model="answerContent.tmContent" v-if="showMain"></textarea>            
        <p>
          <button type="submit" v-on:click="updateMain()">Valider</button>
          <button type="submit" v-on:click="showMain = !showMain">Annuler</button>
        </p>           
      </div>
    </div>
    <div class="topic__content"> <!-- boucle v-for -->
      <p class="topic__content--answers">
        Answer
      </p>
      <div class="topic__content--details">
        <p>abcdefghijklmnopqrstuvwxyz</p>
        <p>10/10/2010 00:00:00</p>
        <button type="submit" v-on:click="showModifyAnswer()" v-if="!showAnswer">Modifier</button>
      </div>
      <div class="topic__content--modify" v-if="showAnswer">
        <textarea name="réponse" id="" cols="120" rows="5" placeholder="répondez ici" maxlength="600" ></textarea>
        <p>
          <button type="submit" v-on:click="updateAnswer()">Valider</button> <!-- fonction v-on:click="createAnswer()" -->
          <button type="submit" v-on:click="showAnswer = !showAnswer">Annuler</button>
        </p>           
      </div>
    </div>
    <div class="topic__answer-area">
      <button type="submit" v-on:click="showAnswerBox()" v-if="!answerBox">répondre</button>
      <form action="" v-if="answerBox">
        <textarea class="topic__anwser-area--field" name="réponse" id="" cols="120" rows="5" placeholder="répondez ici" maxlength="600"></textarea>
        <input type="hidden" value="" name="tm_parent"> <!-- value = id du poste parent -->
        <input type="hidden" value="" name="tm_titre"> <!-- value = même titre que parent -->
        <input type="hidden" value="" name="tm_user_id"> <!-- value = id de l'usager identifié -->
      </form>
      <div class="topic__anwser-area--button" v-if="answerBox">
        <p class="media">
          <input type="file" @click="addImage()">
        </p>
        <div>
          <button type="submit"  v-on:click="createAnswer()">Valider</button>
          <button type="submit" v-on:click="answerBox = !answerBox">Annuler</button>
        </div>
      </div>
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
    showModifyMain(){
      this.showMain=true;
    },
    showModifyAnswer(){
      this.showAnswer=true;
    },
    showAnswerBox(){
      this.answerBox=true
    },
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
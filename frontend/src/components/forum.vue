<template>
  <div class="forum">
    <h1 class="forum__title">Bienvenue sur le forum de discussion de Groupomania</h1>
    <div class="forum__new-topic">
      <div>
        <button type="submit" v-on:click="showForm()">Nouveau Sujet</button>
      </div>
      <div class="forum__new-topic--field" v-if="unhide">
        <form >
          <input name="tmTitle" cols="120" rows="1" placeholder="titre" > <!-- value = même titre que parent v-model="tmTitle" -->
          <textarea name="tmContent" id="" cols="120" rows="5" placeholder="écrivez le contenu ici" maxlength="600"></textarea> <!--  v-model="tmContent" -->
          <input type="hidden" value="" name="tmIdParent" > <!-- value = id du poste parent v-model="tmIdParent" -->
          <input type="hidden" value="" name="tmUserId" > <!-- value = id de l'usager identifié v-model="tmUserId" -->
          <p class="media">
            <input type="file" @click="addImage">
            <!-- <button  @click="addImage" >Ajouter un fichier</button>
            Aucun fichier -->
          </p>
          <button type="submit" @click="createMessage()">Poster</button> <!-- @click="createMessage()" -->
        </form>
        <button type="submit" v-on:click="unhide = !unhide">Annuler</button>
      </div>
    </div>
    <div class="forum__topics" > <!-- boucle v-for selon le nombre de sujets créés : v-for="topic_content in topic_contents" :key="topic_content.tmId" -->
      <h2 class="forum__topics--title" >titre</h2> <!-- cliquable : donne accès au topic en question = v-bind:href="topic.vue" + {{ topic_messages.tm_title }} + parent 0 -->
    <!--  <p class="forum__topics--content">{{ topic_messages.tm_content }}</p> -->
      <div class="forum__topics--details">
        <p>id utilisateur</p>
        <p>date de post</p>
        <p>modération : modéré ou non</p>
      </div>
      <button type="submit" >Modifier</button> <!-- @clic update @click="updateMessage()" -->
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
      unhide: false,
      postTopic: {
        postTmTitle: "",
        postTmContent: "",
        postTmParent: "",
        postTmUserId: "",
        postTmPictureUrl: ""        
      },
      getTopic: {
        getTmTitle: "",
      }
    };
  },
  methods: {
    addImage(){

    },
    // create messages
    showForm(){
      this.unhide=true;
    },
    createMessage(e) {
      e.preventDefault();
      
      axios.post("http://localhost:3000/api/topic_messages", {
        front_tm_title: this.postTmTitle,
        front_tm_content: this.postTmContent,
        front_tm_parent: this.postTmParent,
        front_tm_user_id: this.postTmUserId
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {console.log(err);});
    },
    // get messages
    // getMessages() {
    //   axios.get("http://localhost:3000/api/topic_messages")
    //   .then(response => (
    //     this.tmId = response.tm_id,
    //     this.tmTitle = response.topic_messages.tm_title,
    //     this.tmContent = response.topic_messages.tm_content,
    //     this.tmIdParent = response.topic_messages.tm_parent,
    //     this.tmUserId = response.topic_messages.tm_user_id
    //   ))
    //   .catch(error => console.log(error))
    // },
    // update messages
    // async updateMessage() {
    //   try {
    //     await axios.put("http://localhost:3000/api/topic_messages", {

    //     });
        
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // delete message
  },
};
</script>

<style lang="scss"></style>
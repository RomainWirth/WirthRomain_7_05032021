<template>
  <div class="forum">
    <div class="forum__topics">
      <h2 class="forum__topics--title" v-if="!show" v-on:click="showAnswers">{{ Title }}</h2>
      <input name="modifyTmTitle" cols="120" rows="1" :placeholder="Title" v-model="newTitle" v-if="show"/>
      <p class="forum__topics--content" v-if="!show">{{ Content }}</p>
      <textarea name="modifyTmContent" id="" cols="120" rows="5" :placeholder="Content" v-model="newContent" maxlength="600" v-if="show"></textarea>
      <div class="forum__topics--picture" v-if="Image && Image !== ''">
        <img class="myImg" :src="'http://localhost:3000/' + Image" alt="conversation"/>
      </div>
      <div class="forum__topics--upload">
        <input class="forum__topics--upload" type="file" @change="updateImage" v-if="show"/>
      </div>
      <div class="forum__topics--details">
        <p>{{ Pseudo }}</p>
        <p>{{ new Date(date).toString().split("+")[0] }}</p> <!-- travail sur l'affichage de la date -->
        <span v-html="getmoderation(Moderation)"></span>
        <div>
          <select name="validation" id="validation" v-if="validateTopic" v-model="moderation">
            <option value="0">Non modéré</option>
            <option value="1">Validé</option>
            <option value="2">Refusé</option>
          </select>
        </div>
      </div>
      <div>
        <button type="submit" v-on:click="showModeration()" v-if="level === 0">Modération</button>
        <div v-if="validateTopic">
          <button type="submit" v-on:click="updateModeraton">Valider</button>
          <button type="submit" v-on:click="validateTopic = !validateTopic">Annuler</button>
        </div>
      </div>
      <div v-if="connected_id === userId && !show">
        <button type="submit" v-on:click="showModify">Modifier</button>
        <button type="submit" @click="deleteMessage">Supprimer</button>
      </div>
      <div v-if="show">
        <button type="submit" v-on:click="updateTopic">Valider</button>
        <button type="submit" v-on:click="show = !show">Annuler</button>
      </div>
    </div>
    <!-- add response bloc -->
    <div class="forum__topics" v-if="answers">
      <button type="submit" v-on:click="showAnswerBox()" v-if="!answerBox">répondre</button>
      <form action="" v-if="answerBox">
        <textarea name="réponse" id="" cols="120" rows="5" placeholder="répondez ici" maxlength="600" v-model="response_content"></textarea>
      </form>
      <div class="topic__anwser-area--button" v-if="answerBox">
        <div class="media">
          <p><input type="file" @change="addImage" /></p>
        </div>
        <div>
          <button type="submit" @click="createAnswer" @mouseover="hover = true" @mouseleave="hover = false">Valider</button>
          <button type="submit" v-on:click="answerBox = !answerBox">Annuler</button>
        </div>
        <div>
          <span v-if="hover" class="error">Merci de vérifier que votre réponse contient bien un contenu ou une image avant de valider</span>
        </div>
      </div>
    </div>
    <!-- au clic sur titre du topic : affichage de la div -->
    <div class="forum__topics" v-if="answers">
      <childTopic
        v-for="mainTopic in serverTopic"
        :key="mainTopic.tm_id"
        v-bind:Id="mainTopic.tm_id"
        v-bind:Title="mainTopic.tm_title"
        v-bind:Image="mainTopic.tm_picture_url"
        v-bind:Content="mainTopic.tm_content"
        v-bind:Pseudo="mainTopic.u_pseudo"
        v-bind:date="mainTopic.tm_posting_date"
        v-bind:Moderation="mainTopic.tm_moderation"
        v-bind:userId="mainTopic.tm_user_id"
      />
    </div>
    <div class="forum__topics" v-if="answers">
      <button type="submit" v-on:click="answers = !answers">Fermer</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import childTopic from "./childTopic.vue";
// import axios from "axios";

export default {
  name: "parent-topic",
  components: {
    childTopic,
  },
  props: { // props en référence aux v-bind sur Home.vue
    Id: Number,
    Image: String,
    Title: String,
    Content: String,
    Pseudo: String,
    date: String,
    Moderation: Number,
    userId: Number,
  },
  data() {
    return {
      connected_id: Number,
      hover: false,
      // update state
      newTitle: null,
      newContent: null,
      newPic: null,
      moderation: 0,
      // response state
      response_title: this.Title,
      response_content: null,
      response_pic: null,
      // component state
      serverTopic: null,
      level: Number,
      // components affichage
      answers: false,
      show: false,
      showAnswer: false,
      answerBox: false,
      validateTopic: false,
    };
  },
  async mounted() {
    this.level = Number(localStorage.getItem("level"));
    this.connected_id = Number(localStorage.getItem("userId"));
    const access_token = localStorage.getItem("access_token");
    // console.log(access_token);
    var config = {
      method: "get",
      url: "http://localhost:3000/api/topic_messages/child/" + this.Id,
      headers: { Authorization: "Bearer " + access_token },
    };
    const response = await axios(config);
    // console.log(response);
    this.serverTopic = response.data
    // .sort((a, b) => { // classer les messages les plus récents en premier
    //   if (new Date(a.tm_posting_date) > new Date(b.tm_posting_date)) return -1;
    //   if (new Date(a.tm_posting_date) < new Date(b.tm_posting_date)) return 1;
    //   return 0;
    // });
  },
  methods: {
    // hide/unhide elements
    showAnswers() {this.answers = !this.answers;},
    showModify() {this.show = true;},
    showModifyAnswer() {this.showAnswer = true;},
    showAnswerBox() {this.answerBox = !this.answerBox;},
    showModeration() {this.validateTopic = true;},
    // création de réponse
    createAnswer(e) {
      e.preventDefault();
      const access_token = localStorage.getItem("access_token");
      const user_id = localStorage.getItem("userId");
      const data_2 = new FormData();
      data_2.append("image", this.response_pic);
      const body = {
        user_id: user_id,
        tm_parent: this.Id,
        title: this.response_title,
        content: this.response_content,
        moderation: 0,
      };
      data_2.append("topic", JSON.stringify(body));
      var config = {
        method: "post",
        url: "http://localhost:3000/api/topic_messages",
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "multipart/form-data",
        },
        data: data_2,
      };
      if (this.response_content === "") {
        this.$dialog
        .alert("Veuillez ajouter un contenu à votre message")
        .then((dialog) => {
          console.log(dialog);
        })
      } else {
        axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.$router.go();
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },
    addImage(e) {
      this.response_pic = e.target.files[0];
    },
    // update message
    updateTopic(e) {
      e.preventDefault();
      const access_token = localStorage.getItem("access_token");
      var data = new FormData();
      data.append("image", this.newPic);
      data.append(
        "topic",
        JSON.stringify({
          tm_id: this.Id,
          user_id: this.userId,
          title: this.newTitle ? this.newTitle : this.Title,
          content: this.newContent ? this.newContent : this.Content, // si newContent == null return Content else return newContent
        })
      );
      var config = {
        method: "put",
        url: "http://localhost:3000/api/topic_messages",
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };
      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.$router.go();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updateImage(e) {
      this.newPic = e.target.files[0];
    },
    // delete message
    deleteMessage() {
      const access_token = localStorage.getItem("access_token");
      var config = {
        method: "delete",
        url: "http://localhost:3000/api/topic_messages/" + this.Id,
        headers: {
          Authorization: "Bearer " + access_token,
        },
      };
      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.$router.go();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // gestion modération
    getmoderation(moderation) {
      switch (moderation) {
        case 1:
          return '<p style="color:green;">Validé</p>';
        case 0:
          return '<p style="color:orange;">Non modéré</p>';
        case 2:
          return '<p style="color:red;">Refusé</p>';
        default:
          return "not supported";
      }
    },
    // modifier la modération
    updateModeraton(e) {
      e.preventDefault();
      const access_token = localStorage.getItem("access_token");
      var data = JSON.stringify({
        tm_id: this.Id,
        tm_moderation: Number(this.moderation),
      });
      var config = {
        method: "put",
        url: "http://localhost:3000/api/topic_messages/moderation",
        headers: {Authorization: "Bearer "+access_token, "Content-Type": "application/json",},
        data: data,
      };
      axios(config)
      .then((response)=> {
        console.log(JSON.stringify(response.data));
        this.$router.go();
      })
      .catch(function (error) {
        console.log(error);
      });
    },
  },
};
</script>

<style lang="scss"></style>
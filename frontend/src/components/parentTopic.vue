<template>
  <div class="forum">
    <div class="forum__topics">
      <input type="hidden" value="" />
      <!-- valeur de l'id du message -->
      <h2 class="forum__topics--title" v-if="!show" v-on:click="showAnswers">
        {{ Title }}
      </h2>
      <!-- cliquable : donne accès au topic en question = v-bind:href="topic.vue" + {{getTopic.getTmTitle}} + parent 0 -->
      <input
        name="modifyTmTitle"
        cols="120"
        rows="1"
        :placeholder="Title"
        v-if="show"
      />
      <!-- value = même titre que parent v-model="tmTitle" -->
      <p class="forum__topics--content" v-if="!show">{{ Content }}</p>
      <textarea
        name="modifyTmContent"
        id=""
        cols="120"
        rows="5"
        :placeholder="Content"
        maxlength="600"
        v-if="show"
      ></textarea>
      <!-- afficher le contenu du message à modifier -->
      <div class="forum__topics--picture" v-if="Image && Image !== ''">
        <img
          class="myImg"
          :src="'http://localhost:3000/' + Image"
          alt="conversation"
        />
      </div>
      <div class="forum__topics--upload">
        <input
          class="forum__topics--upload"
          type="file"
          @change="updateImage"
          v-if="show"
        />
      </div>
      <div class="forum__topics--details">
        <p>{{ Pseudo }}</p>
        <p>{{ date }}</p>
        <p>{{ Moderation }}</p>
        <!-- manipuler la donnée pour afficher : non modéré | accepté | refusé -->
        <div>
          <!-- afficher si l'utilisateur est un modérateur : v-if u_level = 0 -->
          <select name="validation" id="validation" v-if="validateTopic">
            <option value="0">non modéré</option>
            <option value="1">validé</option>
            <option value="2">Refusé</option>
          </select>
        </div>
      </div>
      <div>
        <button type="submit" v-on:click="showModeration()" v-if="level === 0">
          Modération
        </button>
        <div v-if="validateTopic">
          <button type="submit" v-on:click="updateModeraton()">Valider</button>
          <button type="submit" v-on:click="validateTopic = !validateTopic">
            Annuler
          </button>
        </div>
      </div>
      <div v-if="connected_id === userId && !show">
        <!-- afficher si auteur du message : comparer avec user_id -->
        <button type="submit" v-on:click="showModify">Modifier</button>
        <button type="submit" @click="deleteMessage">Supprimer</button>
      </div>
      <div v-if="show">
        <button type="submit" v-on:click="updateMessage()">Valider</button>
        <button type="submit" v-on:click="show = !show">Annuler</button>
      </div>
    </div>
    <!-- add response bloc -->
    <div class="forum__topics" v-if="answers">
      <button type="submit" v-on:click="showAnswerBox()" v-if="!answerBox">
        répondre
      </button>
      <form action="" v-if="answerBox">
        <input
          name="tmTitle"
          cols="120"
          rows="1"
          placeholder="titre"
          v-model="response_title"
        />
        <textarea
          name="réponse"
          id=""
          cols="120"
          rows="5"
          placeholder="répondez ici"
          maxlength="600"
          v-model="response_content"
        ></textarea>
      </form>
      <div class="topic__anwser-area--button" v-if="answerBox">
        <div class="media">
          <input type="file" @click="addImage" />
        </div>
        <div>
          <button type="submit" @click="createAnswer">Valider</button>
          <button type="submit" v-on:click="answerBox = !answerBox">
            Annuler
          </button>
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
    <!-- au clic sur titre du topic : affichage de la div -->

    <div class="forum__topics" v-if="answers">
      <button type="submit" v-on:click="answers = !answers">Fermer</button>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import childTopic from "./childTopic.vue";
import axios from "axios";

export default {
  name: "parent-topic",
  components: {
    childTopic,
  },
  props: {
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
      //response state
      response_title: null,
      response_content: null,
      response_pic: null,
      //component state
      serverTopic: null,
      level: Number,
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
    console.log(access_token);
    var config = {
      method: "get",
      url: "http://localhost:3000/api/topic_messages/child/" + this.Id,
      headers: { Authorization: "Bearer " + access_token },
    };
    const response = await axios(config);
    console.log(response);
    this.serverTopic = response.data;
  },
  methods: {
    // hide/unhide elements
    showAnswers() {
      this.answers = !this.answers;
    },
    showModify() {
      this.show = true;
    },
    showModifyAnswer() {
      this.showAnswer = true;
    },
    showAnswerBox() {
      this.answerBox = !this.answerBox;
    },
    showModeration() {
      this.validateTopic = true;
    },

    updateImage() {},
    // delete message
    deleteMessage() {
         const access_token = localStorage.getItem("access_token");
      var config = {
        method: "delete",
        url: "http://localhost:3000/api/topic_messages/"+this.Id,
        headers: {
          Authorization:
            "Bearer "+access_token,
        },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updateModeration() {},
    addImage(e) {
      this.response_pic = e.target.files[0];
    },
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

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.$router.push("/home");
          this.forceUpdate();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss"></style>
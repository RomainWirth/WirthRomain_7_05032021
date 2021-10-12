<template>
  <div class="forum">
    <div class="forum__topics">
      <!-- <h2 class="forum__topics--title" v-if="!show">{{ Title }}</h2> -->
      <!-- <input name="modifyTmTitle" cols="120" rows="1" :placeholder="Title" v-model="newTitle" v-if="show"/> -->
      <p class="forum__topics--content" v-if="!show">{{ Content }}</p>
      <textarea name="modifyTmContent" id="" cols="120" rows="5" :placeholder="Content" v-model="newContent" maxlength="600" v-if="show"></textarea>
      <div class="forum__topics--picture" v-if="Image">
        <img class="myImg" :src="'http://localhost:3000/' + Image" alt="conversation"/>
      </div>
      <div class="forum__topics--upload">
        <input class="forum__topics--upload" type="file" @change="updateImage" v-if="show"/>
      </div>
      <div class="forum__topics--details">
        <p>{{ Pseudo }}</p>
        <p>{{ new Date(date).toString().split("+")[0] }}</p>
        <span v-html="getmoderation(Moderation)"></span>
        <div v-if="userlevel === 0 && validateTopic">
          <select name="validation" id="validation" v-model="moderation">
            <option value="0">non modéré</option>
            <option value="1">validé</option>
            <option value="2">Refusé</option>
          </select>
        </div>
      </div>
      <div>
        <button type="submit" v-on:click="showModeration()" v-if="userlevel === 0">Modération</button>
        <div v-if="validateTopic">
          <button type="submit" v-on:click="updateModeraton">Valider</button>
          <button type="submit" v-on:click="validateTopic = !validateTopic">Annuler</button>
        </div>
      </div>
      <div v-if="connected_id === userId && !show">
        <button type="submit" v-on:click="showModify">Modifier</button>
        <button type="submit" v-on:click="deleteMessage">Supprimer</button>
      </div>
      <div v-if="show">
        <button type="submit" v-on:click="updateTopic">Valider</button>
        <button type="submit" v-on:click="show = !show">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "child-topic",
  props: { // props en référence aux v-bind sur parentTopic.vue
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
      userlevel: Number,
      answers: false,
      show: false,
      showAnswer: false,
      answerBox: false,
      validateTopic: false,
      // close: false,
      newTitle: null,
      newContent: null,
      newPic: null,
      moderation: 0
    };
  },
  mounted() {
    this.userlevel = Number(localStorage.getItem("level"));
    this.connected_id = Number(localStorage.getItem("userId"));
  },
  methods: {
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
    // hide/unhide elements
    showAnswers() {this.answers = true;},
    showModify() {this.show = true;},
    showModifyAnswer() {this.showAnswer = true;},
    showAnswerBox() {this.answerBox = true;},
    showModeration() {this.validateTopic = true;},
    updateTopic(e) {
        e.preventDefault();
        const access_token = localStorage.getItem("access_token");
        var data = new FormData();
        data.append("image", this.newPic);
        data.append("topic",
            JSON.stringify({
                tm_id: this.Id,
                user_id: this.userId,
                title: this.newTitle ? this.newTitle : this.Title,
                content: this.newContent ? this.newContent : this.Content,
            })
        );
        var config = {
            method: "put",
            url: "http://localhost:3000/api/topic_messages",
            headers: {Authorization: "Bearer " + access_token, "Content-Type": "multipart/form-data",},
            data: data,
        };
        axios(config)
        .then( (response) => {
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
    deleteMessage() { 
        const access_token = localStorage.getItem("access_token");
        var config = {
            method: "delete",
            url: "http://localhost:3000/api/topic_messages/" + this.Id,
            headers: {Authorization: "Bearer " + access_token,},
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
            headers: {Authorization: "Bearer " + access_token, "Content-Type": "application/json",},
            data: data,
        };
        axios(config)
        .then( (response)=> {
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
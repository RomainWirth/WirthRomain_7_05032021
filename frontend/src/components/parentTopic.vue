<template>
    <div class="forum">
        <div class="forum__topics">
            <input type="hidden" value=""> <!-- valeur de l'id du message -->
            <h2 class="forum__topics--title">{{Title}}</h2> <!-- cliquable : donne accès au topic en question = v-bind:href="topic.vue" + {{getTopic.getTmTitle}} + parent 0 -->
            <input name="modifyTmTitle" cols="120" rows="1" placeholder="titre" v-if="show"> <!-- value = même titre que parent v-model="tmTitle" -->
            <p class="forum__topics--content">{{Content}}</p>
            <textarea name="modifyTmContent" id="" cols="120" rows="5" placeholder="contenu du message à modifier" maxlength="600" v-if="show"></textarea> <!-- afficher le contenu du message à modifier -->
            <p class="forum__topics--picture">
                <img :src="'http://localhost:3000/'+Image" alt="conversation">
            </p>
            <p class="forum__topics--upload">
                <input class="forum__topics--upload" type="file" @click="updateImage()" v-if="show">
            </p>
            <div class="forum__topics--details">
                <p>{{Pseudo}}</p>
                <p>{{date}}</p>
                <p>{{Moderation}}</p> <!-- manipuler la donnée pour afficher : non modéré | accepté | refusé -->
            </div>
            <p>
                <button type="submit" v-on:click="showModify()" v-if="!show">Modifier</button>
                <button type="submit" v-on:click="deleteMessage()">Supprimer</button>
            </p>
            <p v-if="show">
                <button type="submit" v-on:click="updateMessage()">Valider</button>
                <button type="submit" v-on:click="show = !show">Annuler</button>
            </p>
        </div>
        <div class="forum__topics"> <!-- au clic sur titre du topic : affichage de la div -->
            <p class="forum__topics--content">Answer</p>
            <textarea name="réponse" id="" cols="120" rows="5" placeholder="modifiez votre réponse ici" maxlength="600" v-if="showAnswer"></textarea>
            <p class="forum__topics--picture">
                <img :src="'http://localhost:3000/'+Image" alt="conversation">
            </p>
            <p class="forum__topics--upload">
                <input class="forum__topics--upload" type="file" @click="updateImage()" v-if="showAnswer">
            </p>

            <div class="forum__topics--details">
                <p>abcdefghijklmnopqrstuvwxyz</p>
                <p>10/10/2010 00:00:00</p>
                <p>Modération</p>
            </div>
            <div v-if="!showAnswer">
                <button type="submit" v-on:click="showModifyAnswer()">Modifier</button>
                <button type="submit" v-on:click="deleteAnswer()">Supprimer</button>
            </div>
            <div v-if="showAnswer">
                <button type="submit" v-on:click="updateAnswer()">Valider</button>
                <button type="submit" v-on:click="showAnswer = !showAnswer">Annuler</button>
            </div>
        </div>
        <div class="forum__topics"> <!-- au clic sur titre du topic : affichage de la div -->
            <button type="submit" v-on:click="showAnswerBox()" v-if="!answerBox">répondre</button>
            <form action="" v-if="answerBox">
                <textarea name="réponse" id="" cols="120" rows="5" placeholder="répondez ici" maxlength="600"></textarea>
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
    name: 'parent-topic',
    props: {
        Id:Number,
        Image:String,
        Title: String,
        Content: String,
        Pseudo: String,
        date: String,
        Moderation: Number
    },
    data() {
        return {
            show: false,
            showAnswer: false,
            answerBox: false,
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
        // hide/unhide elements
        showModify(){this.show=true;},
        showModifyAnswer(){this.showAnswer=true;},
        showAnswerBox(){this.answerBox=true},
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
        },
        updateImage() {

        },
        // delete message
        deleteMessage() {

        }
    }
};
</script>

<style lang="scss"></style>
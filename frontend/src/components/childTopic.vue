<template>
    <div class="forum">
        <div class="forum__topics">
            <input type="hidden" value=""> <!-- valeur de l'id du message -->
            <h2 class="forum__topics--title" v-if="!show" v-on:click="showAnswers">{{Title}}</h2> <!-- cliquable : donne accès au topic en question = v-bind:href="topic.vue" + {{getTopic.getTmTitle}} + parent 0 -->
            <input name="modifyTmTitle" cols="120" rows="1" :placeholder="Title" v-if="show"> <!-- value = même titre que parent v-model="tmTitle" -->
            <p class="forum__topics--content" v-if="!show">{{Content}}</p>
            <textarea name="modifyTmContent" id="" cols="120" rows="5" :placeholder="Content" maxlength="600" v-if="show"></textarea> <!-- afficher le contenu du message à modifier -->
            <div class="forum__topics--picture" v-if="image && image!==''">
                <img class="myImg" :src="'http://localhost:3000/'+Image" alt="conversation">
            </div>
            <div class="forum__topics--upload">
                <input class="forum__topics--upload" type="file" @change="updateImage" v-if="show">
            </div>
            <div class="forum__topics--details">
                <p>{{Pseudo}}</p>
                <p>{{date}}</p>
                <p>{{Moderation}}</p> <!-- manipuler la donnée pour afficher : non modéré | accepté | refusé -->
                <div  v-if="userlevel===0"> <!-- afficher si l'utilisateur est un modérateur : v-if u_level = 0 -->
                    <select name="validation" id="validation" >
                        <option value="0">non modéré</option>
                        <option value="1">validé</option>
                        <option value="2">Refusé</option>
                    </select>
                </div>
            </div>
            <div>                
                <button type="submit" v-on:click="showModeration()">Modération</button>
                <div v-if="validateTopic">
                    <button type="submit" v-on:click="updateModeraton()">Valider</button>
                    <button type="submit" v-on:click="validateTopic = !validateTopic">Annuler</button>
                </div>
            </div>
            <div v-if="connected_id===userId && !show"> <!-- afficher si auteur du message : comparer avec user_id -->
                <button type="submit" v-on:click="showModify" >Modifier</button>
                <button type="submit" v-on:click="deleteMessage()" >Supprimer</button>
            </div>
            <div v-if="show">
                <button type="submit" v-on:click="updateMessage()">Valider</button>
                <button type="submit" v-on:click="show = !show">Annuler</button>
            </div>
        </div>
<!-- au clic sur titre du topic : affichage de la div -->        
        
    </div>
</template>

<script>
// import axios from "axios";

export default {
    name: 'child-topic',
    props: {
        Id: Number,
        Image:String,
        Title: String,
        Content: String,
        Pseudo: String,
        date: String,
        Moderation: Number,
        userId:Number
    },
    data() {
        return {
            connected_id:Number,
            userlevel:Number,
            answers: false,
            show: false,
            showAnswer: false,
            answerBox: false,
            validateTopic: false,
            // close: false,
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
    mounted() {
        this.userlevel = localStorage.getItem('level');
        this.connected_id = Number(localStorage.getItem("userId"));
    },
    methods: {
        // hide/unhide elements
        showAnswers(){this.answers=true},
        showModify(){this.show=true;},
        showModifyAnswer(){this.showAnswer=true;},
        showAnswerBox(){this.answerBox=true},
        showModeration(){this.validateTopic=true},
        
        updateImage() {

        },
        // delete message
        deleteMessage() {

        },
        updateModeration() {

        }        
    }
};
</script>

<style lang="scss"></style>
<template>
    <div class="forum">
        <div class="forum__new-topic">
            <div>
                <button type="submit" v-on:click="showForm()">Nouveau Sujet</button>
            </div>
            <div class="forum__new-topic--field" v-if="unhide">
                <form >
                    <input name="tmTitle" cols="120" rows="1" placeholder="titre" v-model="newTmTitle"> <!-- value = même titre que parent v-model="newTmTitle" -->
                    <textarea name="tmContent" id="" cols="120" rows="5" placeholder="écrivez le contenu ici" maxlength="600" v-model="newTmContent"></textarea> <!--  v-model="newTmContent" -->
                    <input type="hidden" value="0" name="tmIdParent" v-model="newTmParent"> <!-- value = id du poste parent v-model="newTmIdParent" -->
                    <input type="hidden" value="" name="tmUserId" v-model="newTmUserId"> <!-- value = id de l'usager identifié v-model="newTmUserId" -->
                    <p class="media">
                        <input type="file" @click="addImage()">
                    </p>
                    <p>
                        <button type="submit" @click="createMessage()">Poster</button>
                        <button type="submit" v-on:click="unhide = !unhide">Annuler</button>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'newSubject',
    data () {
        return {
            unhide: false,
            newTopics: {
                newTmTitle: "",
                newTmContent: "",
                newTmParent: "",
                newTmUserId: "",
                newTmPictureUrl: ""        
            },
        }
    },
    methods: {
        showForm(){this.unhide=true},
        addImage(){

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
    }
}
</script>

<style lang=""></style>
<template>
    <div class="forum">
        <div class="forum__new-topic">
            <div>
                <button type="submit" v-on:click="showForm()">Nouveau Sujet</button>
            </div>
            <div class="forum__new-topic--field" v-if="unhide">
                <form>
                    <input name="tmTitle" cols="120" rows="1" placeholder="titre" v-model="newTmTitle"/><!-- value = même titre que parent v-model="newTmTitle" -->
                    <textarea name="tmContent" id="" cols="120" rows="5" placeholder="écrivez le contenu ici" maxlength="600" v-model="newTmContent"></textarea><!--  v-model="newTmContent" -->
                    <input type="hidden" value="0" name="tmIdParent" v-model="newTmParent"/><!-- value = id du poste parent v-model="newTmIdParent" -->
                    <input type="hidden" value="" name="tmUserId" v-model="newTmUserId" /><!-- value = id de l'usager identifié v-model="newTmUserId" -->
                    <p class="media">
                        <input type="file" @change="addImage" />
                    </p>
                    <p>
                        <button type="submit" @click="createMessage">Poster</button>
                        <button type="submit" v-on:click="unhide = !unhide">Annuler</button>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "newSubject",
    data() {
        return {
            unhide: false,
            newTmTitle: "",
            newTmContent: "",
            newTmParent: "",
            newTmUserId: "",
            newTmPictureUrl: "",      
        };
    },
    methods: {
        showForm() {this.unhide = true;},
        addImage(e) {this.newTmPictureUrl = e.target.files[0]},
        createMessage(e) {
            e.preventDefault();
            const access_token = localStorage.getItem("access_token");
            const user_id = localStorage.getItem("userId");
            const data = new FormData();
            data.append("image", this.newTmPictureUrl);
            const body = {
                user_id: user_id, 
                tm_parent: 0, 
                title: this.newTmTitle, 
                content: this.newTmContent, 
                moderation: 0
            };
            data.append("topic", JSON.stringify(body));
            var config = {
                method: "post",
                url: "http://localhost:3000/api/topic_messages",
                headers: {
                    Authorization: "Bearer " + access_token, 
                    "Content-Type":"multipart/form-data"
                },
                data: data,
            };
            if (this.newTmTitle === "" && this.newTmContent === "") {
                this.$dialog
                .alert("Veuillez ajouter un titre et un contenu à votre message")
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
    },
};
</script>

<style lang="scss"></style>
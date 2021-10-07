<template>
  <section class="profile">
    <header>
      <div class="image">
        <img class="image__logo" src="../assets/logo.png" alt="Logo Groupomania">
      </div>
      <div class="nav">
        <div class="nav__navigation" >
          <router-link to="/home">Home</router-link> |
          <router-link to="/profile">Profil Utilisateur</router-link> |
          <router-link to="/login" v-on:click.native="Logout()">Logout</router-link>
        </div>
      </div>
    </header>
    <div class="loggedin">
      <h1>PROFIL UTILISATEUR</h1>
      <section class="loggedin__content">
        <div class="loggedin__content--information">
          <h2>Infos Utilisateur</h2>
          <p>N°utilisateur : 0123456789{{userId}}</p>
          <h2>Informations :</h2>
          <div class="champs-info" v-if="!unhideFields">
            <div class="champs-info__line">
              <p class="champs-info__line--content">Pseudonyme :</p>
              <p class="champs-info__line--content">Untel{{pseudo}}</p>
            </div>
            <div class="champs-info__line">
              <p class="champs-info__line--content">email :</p>
              <p class="champs-info__line--content">Untel@domaine.fr{{email}}</p>
            </div>
            <div class="champs-info__line">
              <p class="champs-info__line--content">Mot de passe :</p>
              <p class="champs-info__line--content">crypté{{password}}</p>
            </div>
          </div>
          <div class="champs-info" v-if="unhideFields">
            <p class="champs-info__line">
              <label for="pseudo">Pseudonyme : </label> <!-- infos s'affichent directement -->
              <input type="text" name="pseudo" id="pseudo" :placeholder="pseudo"> <!-- champs de saisie s'affichent quand on clique sur modifier --> 
            </p>
            <p class="champs-info__line">
              <label for="email">Email : </label>
              <input type="text" name="email" id="email" :placeholder="email">
            </p>
            <p class="champs-info__line">
              <label for="password">Mot de passe : </label>
              <input type="text" name="password" id="password" :placeholder="password"> <!-- mot de passe crypté -->
            </p>
          </div>
          <p>niveau d'autorisation : utilisateur {{level}}</p> <!-- modifié si admin (0) ou user (1) -->
          <p>date d'enreristrement : 01/01/2001 00:00:00{{dateRegistered}}</p> <!-- affiche la date d'enregistrement -->
        </div>
        <div class="loggedin__content--buttons" v-if="!unhideFields">
          <button type="submit" v-on:click="showFields()">MODIFIER PROFIL</button> <!-- fenêtre popup pour valider ou annuler la modification -->
          <button type="submit" v-on:click="deleteProfile()">SUPPRIMER PROFIL</button> <!-- fenêtre popup pour valider ou annuler la suppression -->
        </div>
        <div class="loggedin__content--buttons" v-if="unhideFields">
          <button type="submit" v-on:click="updateProfile()">Valider Modifications</button> <!-- v-show quand @clic sur bouton modifier -->
          <button type="submit" v-on:click="unhideFields = !unhideFields">Annuler Modifications</button> <!-- v-show quand @clic sur bouton modifier -->
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Profile',
  props: {
    userId: Number,
    pseudo: String,
    email: String,
    password: String, // montrer des astérisques
    level: Number, // montrer soit "utilisateur" (= 1) soit "modérateur" (= 0)
    dateRegistered: String
  },
  data() {
    return {
      unhideFields: false,
      token: localStorage.getItem("access_token"),
      user_id: localStorage.getItem("userId"),
      infoUser: null
    }
  },
  methods: {
    showFields() {
      this.unhideFields=true;
    },
    Logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("userId");
      this.$router.push("/login");
    },
    getProfile() {
      const access_token = localStorage.getItem("access_token");
      const user_id = localStorage.getItmen("userId");
      var config = {
        method: 'get',
        url: 'http://localhost:3000/api/users/' + user_id,
        headers: { 
          'Authorization': 'Bearer ' + access_token, 
        }
      };
      axios(config)
      .then((response) => {
        this.infoUser = response.data;
        console.log(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    },
    updateProfile() {

    },
    deleteProfile() {

    }
  }
}
</script>

<style lang="scss"></style>
<template>
  <section class="profile">
    <!-- <headerNav/> -->
    <header>
      <div class="image">
        <img class="image__logo" src="../assets/logo.png" alt="Logo Groupomania"/>
      </div>
      <div class="nav">
        <div class="nav__navigation">
          <span v-if="level === 0" style="color: green; font-weight: bold">Admin</span> | 
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
          <p>N°utilisateur : {{ userId }}</p>
          <h2>Informations :</h2>
          <div class="champs-info" v-if="!unhideFields">
            <div class="champs-info__line">
              <p class="champs-info__line--content">Pseudonyme :</p>
              <p class="champs-info__line--content">{{ pseudo }}</p>
            </div>
            <div class="champs-info__line">
              <p class="champs-info__line--content">email :</p>
              <p class="champs-info__line--content">{{ email }}</p>
            </div>
            <div class="champs-info__line">
              <p class="champs-info__line--content">Mot de passe :</p>
              <p class="champs-info__line--content">********</p>
            </div>
          </div>
          <div class="champs-info" v-if="unhideFields">
            <p class="champs-info__line">
              <label for="pseudo">Pseudonyme : </label>
              <input type="text" name="pseudo" id="pseudo" :placeholder="pseudo" v-model="newPseudo"/>
              <!-- champs de saisie s'affichent quand on clique sur modifier -->
            </p>
            <p class="champs-info__line">
              <label for="email">Email : </label>
              <input type="text" name="email" id="email" :placeholder="email" v-model="newEmail"/>
            </p>
            <p class="champs-info__line">
              <label for="password">Mot de passe : </label>
              <input type="password" name="password" id="password" placeholder="********" v-model="newPassword"/>
            </p>
          </div>
          <p>
            niveau d'autorisation :&nbsp;<span v-if="level === 1">Utilisateur</span><span v-if="level === 0">Modérateur</span>
          </p>
          <p>date d'enregistrement : {{ dateRegistered.toString().split("+")[0] }}</p>
        </div>
        <div class="loggedin__content--buttons" v-if="!unhideFields">
          <button type="submit" v-on:click="showFields()" class="orange">MODIFIER PROFIL</button>
          <!-- fenêtre popup pour valider ou annuler la modification -->
          <button type="submit" v-on:click="deleteProfile" class="delete">SUPPRIMER PROFIL</button>
          <!-- fenêtre popup pour valider ou annuler la suppression -->
        </div>
        <div class="loggedin__content--buttons" v-if="unhideFields">
          <button type="submit" v-on:click="updateProfile" class="validate">Valider Modifications</button>
          <button type="submit" v-on:click="unhideFields = !unhideFields" class="delete">Annuler Modifications</button>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import axios from "axios";
// import headerNav from "@/components/headerNav.vue";

export default {
  name: "Profile",
  data() {
    return {
      unhideFields: false,
      token: localStorage.getItem("access_token"),
      user_id: localStorage.getItem("userId"),
      infoUser: null,
      userId: Number,
      pseudo: String,
      email: String,
      level: Number,
      dateRegistered: Date,
      // mise à jour state
      newPseudo: null,
      newEmail: null,
      newPassword: null,
    };
  },
  components: {
    // headerNav,
  },
  mounted() {
    const access_token = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("userId");
    this.userId = user_id;
    this.level = Number(localStorage.getItem("level"));
    var config = {
      method: "get",
      url: "http://localhost:3000/api/users/" + user_id,
      headers: {Authorization: "Bearer " + access_token,},
    };
    axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      this.pseudo = response.data.u_pseudo;
      this.email = response.data.u_email;
      this.dateRegistered = new Date(response.data.u_registration_date);
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  methods: {
    showFields() {this.unhideFields = true;},
    Logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("userId");
      this.$router.push("/");
    },
    updateProfile(e) {
      e.preventDefault();
      const access_token = localStorage.getItem("access_token");
      var data = JSON.stringify({
        u_id: this.userId,
        u_pseudo: this.newPseudo ? this.newPseudo : this.pseudo,
        u_email: this.newEmail ? this.newEmail : this.email,
        u_password: this.newPassword,
      });
      var config = {
        method: "put",
        url: "http://localhost:3000/api/users",
        headers: {Authorization: "Bearer " + access_token, "Content-Type": "application/json",},
        data: data,
      };
      axios(config)
      .then((response) => {
        this.$dialog
        .alert("Please confirm to logout")
        .then((dialog) => {
          console.log(response);
          console.log(dialog);
          localStorage.removeItem("access_token");
          localStorage.removeItem("userId");
          localStorage.removeItem("level");
          this.$router.go();
        })       
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    deleteProfile(e) {
      e.preventDefault();
      const access_token = localStorage.getItem("access_token");
      var config = {
        method: "delete",
        url: "http://localhost:3000/api/users/" + this.userId,
        headers: {Authorization: "Bearer " + access_token,},
      };
      axios(config)
      .then((response) => {
        this.$dialog
        .alert("Please confirm to logout")
        .then((dialog) => {
          console.log(response);
          console.log(dialog);
          localStorage.removeItem("access_token");
          localStorage.removeItem("userId");
          localStorage.removeItem("level");
          this.$router.go();
        })   
      })
      .catch(function (error) {
        console.log(error);
      });
    },
  },
};
</script>

<style lang="scss"></style>
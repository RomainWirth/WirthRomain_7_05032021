<template>
    <body>
        <!-- <headerIdentification/> -->
        <header>
            <div class="image">
                <img class="image__logo" src="../assets/logo.png" alt="Logo Groupomania">
            </div>
            <div class="nav">
                <div class="nav__navigation"> |
                    <router-link to="/signup">Signup</router-link> |
                    <router-link to="/">Login</router-link>
                </div>
            </div>
        </header>
        <section>
            <h1>Bienvenue sur le forum de discussion de Groupomania. <br/>Merci de vous identifier</h1>
        </section>
        <section class="login">
            <h1>Signup</h1>
            <div class="login__content">
                <form  @submit="createAccount" method="post" novalidate="true">
                    <div v-if="errors.length">
                        <p class="error">Merci de corriger les erreurs suivantes :</p>
                        <p class="error" v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>
                    <input id="pseudo" type="text" name="pseudo" v-model="input.pseudo" placeholder="Pseudonyme" />
                    <input id="email" type="email" name="email" v-model="input.email" placeholder="Email" />
                    <input id="password" type="password" name="password" v-model="input.password" placeholder="Password" />
                    <button type="submit">Signup</button>
                </form>
            </div>
        </section>
    </body>
</template>

<script>
import axios from "axios";
// import headerIdentification from "@/components/headerIdentification.vue";

export default {
    name: 'Signup',
    data() {
        return {
            errors: [],
            input: {
                pseudo: "",
                email: "",
                password: "",
            },
        };
    },
    components: {
        // headerIdentification
    },
    methods: {
        validPseudo: function(pseudo) {
            var re = /^([a-zA-Z0-9-_]{2,36})$/;
            return (
                re.test(pseudo)
            );
        },
        validEmail: function(email) {
            var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            return (
                re.test(email) &&
                email.length <= 50
            );
        },
        validPassword: function(password) {
            var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+/;
            return (
                re.test(password) &&
                password.length >= 8 &&
                password.length <= 100
            );
        },
        checkFormSignup() {
            // if (this.input.pseudo && this.input.email && this.input.password) { return true; }
            this.errors = [];
            if (!this.input.pseudo) { 
                this.errors.push("Pseudo requis"); 
            } else if (!this.validPseudo(this.input.pseudo)) {
                this.errors.push("Pseudo valide requis : entre 2 et 36 caractères de A à Z (maj et min), - , _ et nombres uniquement");
            }
            if (!this.input.email) { 
                this.errors.push('Email requis'); 
            } else if (!this.validEmail(this.input.email)) { 
                this.errors.push('Email valide requis');
            }
            if (!this.input.password) { 
                this.errors.push('Mot de passe requis'); 
            } else if (!this.validPassword(this.input.password)) {
                this.errors.push('Mot de passe : lettres minuscules')
            }
            if (!this.errors.length) { return true; }
            // e.preventDefault();
        },
        createAccount(e) {
            e.preventDefault();
            this.checkFormSignup();
            // console.log("requête vers le serveur");
            if(this.errors.length > 0 ) return;

            console.log("account created !");
            if (this.input.pseudo != "" && this.input.email != "" && this.input.password != "") {
                axios.post("http://localhost:3000/api/signup", {
                    front_pseudo: this.input.pseudo,
                    front_email: this.input.email,
                    front_password: this.input.password,
                    // u_id, u_registration_date et u_level sont automatiquement générés dans la BDD
                })
                .then((response) => (
                    this.$dialog
                    .alert("Utilisateur créé, cliquez sur continue pour vous identifier")
                    .then((dialog) => {
                        console.log(response);
                        console.log(dialog);
                        this.$router.push("/")
                    })
                ))
                .catch((error) => {
                    this.errors=[];
                    this.errors.push('Utilisateur déjà existant');
                    (console.log(error + " : Duplicate Entry"))
                });
            } else {
                console.log('pseudo, email et mot de passe requis');
            }
        }
    }
};
</script>

<style lang="scss"></style>
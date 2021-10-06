<template>
    <body>
        <header>
            <div class="image">
                <img class="image__logo" src="../assets/logo.png" alt="Logo Groupomania">
            </div>
            <div class="nav">
                <div class="nav__navigation">
                    <router-link to="/">Signup</router-link> |
                    <router-link to="/login">Login</router-link>
                </div>
            </div>
        </header>        
        <section class="login">
            <h1>Login</h1>
            <div class="login__content">
                <form @submit.prevent="connect()" @submit="checkFormLogin()">
                    <div v-if="errors.length">
                        <p class="error">Merci d'apporter les corrections suivantes :</p>
                        <p class="error" v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>
                    <input type="email" name="email" placeholder="Email" v-model="input.email"/> <!-- v-model="input.email" -->
                    <input type="password" name="password" placeholder="Password" v-model="input.password"/> <!-- v-model="input.password" -->
                    <button type="submit">Login</button> <!-- v-on:click="connect()" -->
                </form>
            </div>
        </section>
    </body>
</template>

<script>
import axios from "axios";

export default {
    name: 'Login',
    data() {
        return {
            errors: [],
            input: {
                email: "",
                password: ""
            },
        };
    },
    methods: {
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
        checkFormLogin() {
            if (this.input.email && this.input.password) { return true; }
            this.errors = [];
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
        },
        connect() { // vérifier si async await est utile ici car login essentiel pour continuer sur la suite
            if(this.input.email != "" && this.input.password != "") {
                axios.post("http://localhost:3000/api/login", {
                    front_email: this.input.email,
                    front_password: this.input.password,
                })
                .then((response) => {
                    console.log(response);
                    const token =  response.data.token;
                    // const token = (this.token == response.data.token);
                    const userId = response.data.userId;
                    localStorage.setItem("access_token", token),
                    localStorage.setItem("userId", userId),
                    // this.$emit("identified", true),
                    this.$router.go("/home");
                })
                .catch((error) => {(console.log(error + "email et mot de passe incorrects"))});
            } else {
                console.Log("email et mot de passe requis");
            }
        }
    }
};
</script>

<style lang="scss"></style>
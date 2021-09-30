<template>
    <body>
        <section class="login">
            <h1>Login</h1>
            <div class="login__content">
                <form @submit.prevent="connect" @submit="checkFormLogin">
                    <div v-if="errors.length">
                        <p class="error">Merci d'apporter les corrections suivantes :</p>
                        <p class="error" v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>
                    <input type="email" name="email" placeholder="Email" v-model="input.email"/> <!-- v-model="input.email" -->
                    <input type="password" name="password" placeholder="Password" v-model="input.password"/> <!-- v-model="input.password" -->
                    <button type="submit" v-on:click="connect">Login</button> <!-- v-on:click="connect()" -->
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
            token: localStorage.getItem("access_token") || null
        };
    },
    methods: {
        checkFormLogin: function(e) {
            if (this.input.email && this.input.password) { return true; }
            this.errors = [];
            if (!this.input.email) { this.errors.push('Email requis'); }
            if (!this.input.password) { this.errors.push('Mot de passe requis'); }
            e.preventDefault();
        },
        connect: function() { // vérifier si async await est utile ici car login essentiel pour continuer sur la suite
            if(this.input.email != "" && this.input.password != "") {
                axios.post("http://localhost:3000/api/auth", {
                    u_email: this.input.email,
                    u_password: this.input.password,
                })
                .then((response) => {
                    const token = (this.token == response.data.token);
                    const u_id = response.data.u_id;
                    localStorage.setItem("access_token", token),
                    localStorage.setItem("u_id", u_id),
                    this.$emit("identified", true),
                    console.log(response),
                    this.$router.go("/Home");
                })
                .catch((error) => (
                    console.Log(error, "email et mot de passe incorrects")
                ));
            } else {
                console.Log("email et mot de passe requis");
            }
        }
    }
};
</script>

<style lang="scss"></style>
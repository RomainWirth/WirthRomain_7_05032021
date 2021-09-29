<template>
    <body>
        <section class="login">
            <h1>Login</h1>
            <div class="login__content">
                <form @submit.prevent="connect">
                    <div v-if="errors.length">
                        <p class="error">Merci d'apporter les corrections suivantes :</p>
                        <p class="error" v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>
                    <input type="email" name="email" placeholder="Email" v-model="input.email"/> <!-- v-model="input.email" -->
                    <input type="password" name="password" placeholder="Password" v-model="input.password"/> <!-- v-model="input.password" -->
                    <button type="submit" v-on:click="connect()">Login</button> <!-- v-on:click="connect()" -->
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
                password: "",
                token: localStorage.getItem("acces_token") || null,
            }
        };
    },
    methods: {
        checkFormLogin(e) {
            if (this.email && this.password) { return true; }
            this.errors = [];
            if (!this.email) { this.errors.push('Email requis'); }
            if (!this.password) { this.errors.push('Mot de passe requis'); }
            e.preventDefault();
        },

        async connect() { // vérifier si async await est utile ici car login essentiel pour continuer sur la suite
            try {
                const response = await axios.post("http://localhost:5000/users/login");
                if(this.input.email != "" && this.input.password != "") {
                    if(this.input.email == response.u_email && this.input.password == response.u_password) {
                        this.$emit("identified", true);
                    } else {
                    console.Log("email et mot de passe incorrects");
                    }
                } else {
                    console.Log("email et mot de passe requis");
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
};
</script>

<style lang="scss"></style>
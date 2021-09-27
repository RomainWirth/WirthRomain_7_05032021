<template>
    <section class="login">
        <h1>Login</h1>
        <div class="login__content">
            <form @submit.prevent="connect()">
                <input type="email" name="email" placeholder="Email" v-model="input.email"/> <!-- v-model="input.email" -->
                <input type="password" name="password" placeholder="Password" v-model="input.password"/> <!-- v-model="input.password" -->
                <button type="submit" v-on:click="connect()">Login</button> <!-- v-on:click="connect()" -->
            </form>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: 'Login',
    data() {
        return {
            input: {
                email: "",
                password: ""
            }
        };
    },
    methods: {
        async connect() { // vérifier si async await est utile ici car login essentiel pour continuer sur la suite
            try {
                const response = await axios.post("http://localhost:5000/users");
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
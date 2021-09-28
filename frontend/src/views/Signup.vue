<template>
    <body>
        <section class="login">
            <h1>Signup</h1>
            <div class="login__content">
                <form @submit.prevent="createAccount" @submit="checkFormSignup" method="post" novalidate="true">
                    <div v-if="errors.length">
                        <p class="error">Merci de corriger les erreurs suivantes :</p>
                        <p class="error" v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>
                    <input id="pseudo" type="text" name="pseudo" v-model="input.pseudo" placeholder="Pseudonyme" />
                    <input id="email" type="email" name="email" v-model="input.email" placeholder="Email" />
                    <input id="password" type="password" name="password" v-model="input.password" placeholder="Password" />
                    <!-- voir si utile
                    <input type="hidden" name="level" v-model="moderationLevel" />
                    <input type="hidden" name="registration_date" v-model="input.registrationDate" />
                    -->
                <button type="submit" :disabled="submitStatus === 'PENDING'" v-on:click="createAccount">Signup</button>
                </form>
            </div>
        </section>
    </body>
</template>

<script>
// import { required, minLength, email, maxLength, alphaNum, } from "vuelidate/lib/validators";
import axios from "axios";

export default {
    name: 'Signup',
    data() {
        return {
            errors: [],
            input: {
                pseudo: null,
                email: null,
                password: null,
            },
            submitStatus: null
        };
    },
    methods: {
        checkFormSignup(e) {
            if (this.pseudo && this.email && this.password) { return true; }
            this.errors = [];
            if (!this.pseudo) { this.errors.push("Pseudo requis"); }
            if (!this.email) { 
                this.errors.push('Email requis'); 
            } else if (!this.validEmail(this.email)) { 
                this.errors.push('Email valide requis');
            }
            if (!this.password) { 
                this.errors.push('Mot de passe requis'); 
            } else if (!this.validPassword(this.password)) {
                this.errors.push('Mot de passe : lettres minuscules')
            }
            if (!this.errors.length) { return true; }
            e.preventDefault();
        },
        validEmail (email) {
            var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            return (
                re.test(email) &&
                email.length <= 50
            );
        },
        validPassword (password) {
            var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+/;
            return (
                re.test(password) &&
                password.length >= 8 &&
                password.length <= 100
            );
        },
        createAccount() {
            if (!this.checkFormSignup) {
                this.submitStatus = "ERROR";
            } else {
                this.submitStatus = "PENDING";
                axios.post("http://localhost:5000/users", {
                    u_pseudo: this.pseudo,
                    u_email: this.email,
                    u_password: this.password,
                })
                .then(
                    (response) => (
                        (this.submitStatus = "OK"), 
                        console.log(response),
                        this.$emit("identified", true),
                        this.$router.push("/Home")
                    )
                )
                .catch(
                    (error) => (
                        (this.submitStatus = "ERROR SERVER"), console.log(error)
                    )
                );
            }
            // this.$emit("submit", {
            //     pseudo: this.input.pseudo,
            //     email: this.input.email,
            //     password: this.input.password
            // });
        }
    }
};
</script>

<style lang="scss"></style>
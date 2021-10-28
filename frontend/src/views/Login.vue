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
            <h2>Login</h2>
            <div class="login__content">
                <form @submit="connect" method="post" novalidate="true">
                    <div v-if="errors.length">
                        <p class="error">Merci d'apporter les corrections suivantes :</p>
                        <p class="error" v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>
                    <input type="email" name="email" placeholder="Email" v-model="input.email"/> 
                    <input type="password" name="password" placeholder="Password" v-model="input.password"/> 
                    <button type="submit">Login</button> 
                </form>
            </div>
        </section>
    </body>
</template>

<script>
import axios from "axios";
// import headerIdentification from "@/components/headerIdentification.vue";

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
    components: {
        // headerIdentification
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
            // if (this.input.email && this.input.password) { return true; }
            this.errors = [];
            console.log(this.validEmail(this.input.email));
            console.log(this.validPassword(this.input.password));
            if (!this.input.email) { 
                this.errors.push('Email requis'); 
            } else if (!this.validEmail(this.input.email)) { 
                this.errors.push('Email incorrect');
            }
            if (!this.input.password) { 
                this.errors.push('Mot de passe requis'); 
            } else if (!this.validPassword(this.input.password)) {
                this.errors.push('Mot de passe incorrect')
            }
            if (!this.errors.length) { return true; }
        },
        connect(e) { 
            e.preventDefault();
            this.checkFormLogin();
            if(this.errors.length > 0 ) return;
        
            if(this.input.email != "" && this.input.password != "") {
                axios.post("http://localhost:3000/api/login", {
                    front_email: this.input.email,
                    front_password: this.input.password,
                })
                .then((response) => {
                    console.log(response);
                    const token =  response.data.token;
                    const userId = response.data.userId;
                    const level = response.data.level;
                    localStorage.setItem("access_token", token),
                    localStorage.setItem("userId", userId),
                    localStorage.setItem("level", level),
                    this.$router.go("/home");
                })
                .catch((error) => {
                    this.errors = [];
                    console.log(error);
                    this.errors.push('utilisateur inconnu : vérifiez votre email et/ou votre mot de passe');
                    (console.log(error + " : email ou mot de passe incorrects"));

                });
            } else {
                console.log("email et mot de passe requis");
            }
        }
    }
};
</script>

<style lang="scss"></style>
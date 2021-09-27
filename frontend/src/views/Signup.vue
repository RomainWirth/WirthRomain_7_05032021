<template>
    <body>
        <section class="login">
            <h1>Signup</h1>
            <div class="login__content">
                <form @submit.prevent="createAccount">
                    <input type="text" name="pseudo" v-model="input.pseudo" placeholder="Pseudonyme" />                
                    <p class="erreur" v-if="!validations.pseudo.required && submitStatus === 'ERROR'">Champ requis</p>
                    <p class="erreur" v-if="!validations.pseudo.alpha">Le pseudo ne doit contenir que des chiffres et des lettres sans caractères spéciaux</p>
                    <p class="erreur" v-if="!validations.pseudo.maxLength">Maximum {{ validations.pseudo.$params.maxLength.max }} lettres</p>
                
                    <input type="email" name="email" v-model="input.email" placeholder="Email" />
                    <p class="erreur" v-if="!validations.email.required && submitStatus === 'ERROR'">Champ requis</p>
                    <p class="erreur" v-if="!validations.email.maxLength">Maximum {{ validations.email.$params.maxLength.max }} lettres</p>
                    <p class="erreur" v-if="!validations.email.email">L'email doit être valide et sans majuscules : exemple@domaine.fr</p>
                
                    <input type="password" name="password" v-model="input.password" placeholder="Password" />                
                    <p class="error" v-if="!validations.password.required && submitStatus === 'ERROR'">Champ requis</p>
                    <p class="error" v-if="!validations.password.maxLength">Maximum {{ validations.password.$params.maxLength.max }} lettres</p>
                    <p class="error" v-if="!validations.password.minLength">Minimum {{ validations.password.$params.minLength.min }} lettres</p>
                    <p class="error" v-if="!validations.password.alphaNum">Uniquement chiffres, lettres et pas de caractères spéciaux</p>
                    <p class="error" v-if="!validations.password.strongPassword && submitStatus === 'ERROR'">Le mot de passe doit contenir des chiffres et lettres sans espace</p>
                
                    <!-- voir si utile
                    <input type="hidden" name="level" v-model="moderationLevel" />
                    <input type="hidden" name="registration_date" v-model="input.registrationDate" />
                    -->
                <button type="submit" :disabled="submitStatus === 'PENDING'">Signup</button>
                </form>
            </div>
        </section>
    </body>
</template>

<script>
import { required, minLength, email, maxLength, alphaNum, } from "vuelidate/lib/validators";
import axios from "axios";

export default {
    name: 'Signup',
    data() {
        return {
            input: {
                pseudo: "",
                email: "",
                password: "",
            },
            submitStatus: null
        };
    },
    validations: {
        pseudo: { required, alphaNum, maxLength: maxLength(30) },
        email: { required, email, maxLength: maxLength(30) },
        password: { 
            required, 
            maxLength: maxLength(30), 
            minLength: minLength(8), 
            alphaNum, 
            strongPassword(password) {
                return (
                    /[a-zA-Z]/.test(password) && // checks for a-z
                    /^\S+$/.test(password) &&
                    /[0-9]/.test(password) && // checks for 0-9
                    password.length >= 8
                );
            },
        },
    },
    methods: {
        createAccount() {
            if (this.$v.$invalid) {
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
                        this.$router.push("/Home"),
                        this.$emit("identified", true)
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
<template>
    <section class="login">
        <h1>Signup</h1>
        <div class="login__content">
            <form @submit.prevent="submit()">
                <input type="text" name="pseudo" v-model="input.email" placeholder="Pseudonyme" />
                <input type="email" name="email" v-model="input.email" placeholder="Email" />
                <input type="password" name="password" v-model="input.password" placeholder="Password" />
                <button type="submit">Signup</button>
            </form>
        </div>
    </section>
</template>

<script>
export default {
    name: 'signup',
    data() {
        return {
            input: {
                pseudo: "",
                email: "",
                password: ""
            }
        };
    },
    methods: {
        submit() {
            this.$emit("submit", {
                pseudo: this.pseudo,
                email: this.email,
                password: this.password
            });
        }
    }
};
</script>

<style lang="scss"></style>
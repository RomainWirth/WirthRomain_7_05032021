<template>
    <section class="login">
        <h1>Login</h1>
        <div class="login__content">
            <form @submit.prevent="submit()">
                <input type="email" name="email" v-model="input.email" placeholder="Email" />
                <input type="password" name="password" v-model="input.password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    </section>
</template>

<script>
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
        submit() {
            this.$emit("submit", {
                email: this.email,
                password: this.password
            });
        }
    }
};
</script>

<style lang="scss"></style>
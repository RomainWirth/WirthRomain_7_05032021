<template>
    <section class="login">
        <h1>Login</h1>
        <div class="login__content">
            <input type="text" name="username" v-model="input.username" placeholder="Username" />
            <input type="password" name="password" v-model="input.password" placeholder="Password" />
            <button type="submit">Login</button>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            input: {
                username: "",
                password: ""
            }
        }
    }
}
</script>
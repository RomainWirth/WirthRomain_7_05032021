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

<style lang="scss">
.login {
    width: 90%;
    border: 1px solid #CCCCCC;
    border-radius: 15px;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 50px;
    padding: 20px;
    &__content {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        & input {
            width: 100%;
            margin: 10px 0;
        }
    }
}
</style>
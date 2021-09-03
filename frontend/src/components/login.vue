<template>
    <div class="login">
        <h1>Login</h1>
        <div class="login__content">
            <input type="text" name="username" v-model="input.username" placeholder="Username" />
            <input type="password" name="password" v-model="input.password" placeholder="Password" />
            <button type="button" v-on:click="login()">Login</button>
        </div>
    </div>
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
        },
        methods: {
            login() {
                if(this.input.username != "" && this.input.password != "") {
                    if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "secure" });
                    } else {
                        console.log("The username and / or password is incorrect");
                    }
                } else {
                    console.log("A username and password must be present");
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .login {
        width: 90%;
        border: 1px solid #CCCCCC;
        border-radius: 15px;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 100px;
        padding: 20px;
        &__content {
            display: flex;
            justify-content: space-around;
        }
    }
</style>
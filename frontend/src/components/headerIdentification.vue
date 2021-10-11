<template>
    <header>
        <div class="image">
            <img class="image__logo" src="../assets/logo.png" alt="Logo Groupomania">
        </div>
        <div class="nav">
            <div class="nav__navigation">
                <router-link to="/signup">Signup</router-link> |
                <router-link to="/">Login</router-link>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'headerIdentification'
}
</script>

<style lang="scss"></style>
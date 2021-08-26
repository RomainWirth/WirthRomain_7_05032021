<template>
  <div id="app">
    <section class="en-tete">
      <div>
        <img alt="Vue logo" src="./assets/logo.png">
        <h1>GROUPOMANIA</h1>
      </div>
      <nav class="navigation">
        <p class="log-in">log-in</p>
        <p class="forum">forum</p>
        <p class="conversation">conversation</p>
      </nav>
    </section>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 960px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.en-tete {
  display: flex;
  justify-content: space-around;
}

.navigation {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>

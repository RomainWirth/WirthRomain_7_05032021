<template>
  <div id="app">
    <section class="en-tete">
      <div id="logo">
        <img alt="Vue logo" src="./assets/icon-left-font.png">
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
#logo {
  height: 100px;
  overflow: hidden;
}

img {
  height: 100px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 960px;
  display: flex;
  flex-direction: column;
}

.en-tete {
  display: flex;
  justify-content: space-between;
}

.navigation {
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>

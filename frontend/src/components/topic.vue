<template>
  <div class="topic">
    <h1>Topic 1</h1>
    <p>
      Affichage des messages du topic
    </p>
  </div>
</template>

<script>
export default {
  name: 'topic',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
</style>
<template>
  <div class="forum">
    <h1>{{ msg }}</h1>
    <p>
      Affichage des topics de discussion
    </p>
  </div>
</template>

<script>
export default {
  name: 'forum',
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

<template>
  <div class="topic">
    <h1 class="topic__titre">Topic 1</h1>
    <p class="topic__content">
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
.topic {
  width: 90%;
  border: 1px solid #CCCCCC;
  border-radius: 15px;
  background-color: #FFFFFF;
  margin: auto;
  padding: 20px;
  &__titre {
    border-bottom: 1px solid #CCCCCC;
    padding: 10px;
  }
  &__content {
    display: flex;
    justify-content: space-around;
  }
}
</style>
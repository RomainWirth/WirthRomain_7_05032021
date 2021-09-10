<template>
  <div class="home">
    <forum msg="Bienvenue sur le forum de discussion de Groupomania"/>
    <topic />
  </div>
</template>

<script>
// @ is an alias to /src
import forum from '@/components/forum.vue'
import topic from '@/components/topic.vue'

export default {
  name: 'Forum',
  components: {
    forum,
    topic
  }
}
</script>

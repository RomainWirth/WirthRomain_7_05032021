<template>
  <div class="home">
    <login />
    <forum msg="Bienvenue sur le forum de discussion de Groupomania"/>
    <topic />
  </div>
</template>

<script>
// @ is an alias to /src
import login from '@/views/login.vue'
import forum from '@/components/forum.vue'
import topic from '@/components/topic.vue'

export default {
  name: 'Forum',
  components: {
    login,
    forum,
    topic
  }
}
</script>

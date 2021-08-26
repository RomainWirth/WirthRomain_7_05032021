<template>
  <div class="profile">
    <div class="notloggedin"> <!-- apparant si utilisateur non logged-in -->
      <login /> 
    </div>
    <div class="loggedin">
      <h1>PROFIL UTILISATEUR</h1>
      <section class="loggedin__content">
        <div class="loggedin__content--image">
          <img src="" alt="Photo profil">
        </div>
        <div class="loggedin__content--information">
          <h2>ID Utilisateur</h2>
          <p>N°identifiant</p>
          <h2>Informations</h2>
          <p>NOM :</p>
          <p>Prénom :</p>
          <p>addresse email :</p>
          <p>rôle :</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import login from '@/views/login.vue'

export default {
  name: 'Home',
  components: {
    login
  }
}
</script>


<style lang="scss">
.loggedin {
  &__content {
    display: flex;
    justify-content: space-around;
    &--information {
      width: 50%;
      align-items: flex-start;
      border: #2c3e50 1px solid;
      border-radius: 15px;
    }
  }
}
</style>
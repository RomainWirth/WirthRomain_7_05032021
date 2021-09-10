<template>
  <div class="profile">
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
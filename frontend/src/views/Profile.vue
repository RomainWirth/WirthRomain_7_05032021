<template>
  <section class="profile">
    <div class="loggedin">
      <h1>PROFIL UTILISATEUR</h1>
      <section class="loggedin__content">
        <div class="loggedin__content--information">
          <h2>Infos Utilisateur</h2>
          <p>N°identifiant : 0123456789</p>
          <h2>Informations :</h2>
          <p>
            <label for="pseudo">Pseudonyme : </label> <!-- infos s'affichent directement -->
            <input type="text" name="pseudo" id="pseudo" placeholder="pseudo"> <!-- champs de saisie s'affichent quand on clique sur modifier --> 
            <br />
            <label for="email">Email : </label>
            <input type="text" name="email" id="email" placeholder="pseudo@domaine.fr">
            <br />
            <label for="password">Mot de passe : </label>
            <input type="text" name="password" id="password" placeholder="*********">
          </p>
          <p>niveau d'autorisation : utilisateur</p> <!-- modifié si admin (0) ou user (1) -->
          <p>date d'enreristrement : 01/01/2001 00:00:00</p> <!-- affiche la date d'enregistrement -->
        </div>
        <div class="loggedin__content--buttons">
          <button type="submit">MODIFIER PROFIL</button>
          <button type="submit">SUPPRIMER PROFIL</button>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
</script>


<style lang="scss">
.profile {
  width: 100%;
}

.loggedin {
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    &--information {
      width: 50%;
      align-items: flex-start;
      border: #2c3e50 1px solid;
      border-radius: 15px;
    }
    &--buttons {
      margin-top: 10px;
      display: flex;
      justify-content: space-around;
      & button {
        margin: 10px;
      }
    }
  }
}

label {
  width: 110px;
  display: inline-block;
  vertical-align: top;
  margin: 6px;
}

input:focus {
  background: #eaeaea;
}
 
input, textarea {
  width: 249px;
}
 
textarea {
  height: 100px;
}
</style>
<template>
  <div class="topic">
    <h1 class="topic__title">Topic 1</h1>
    <div class="topic__content"> <!-- boucle v-for -->
      <p class="topic__content--answers">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries, but also the leap into electronic typesetting, 
        remaining essentially unchanged. 
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <div class="topic__content--details">
        <p>abcdefghijklmnopqrstuvwxyz</p>
        <p>10/10/2010 00:00:00</p>
        <button type="submit">Modifier</button>
      </div>
      <div class="topic__content--modify">
        <textarea name="réponse" id="" cols="120" rows="5" placeholder="répondez ici" maxlength="600"></textarea>            
        <button type="submit">Valider</button>
      </div>
    </div>
    <div class="topic__answer-area">
      <textarea class="topic__anwser-area--field" name="réponse" id="" cols="120" rows="5" placeholder="répondez ici" maxlength="600"></textarea>
      <div class="topic__anwser-area--button">
        <p>
          <button type="submit">Ajouter un fichier</button>
          Aucun fichier
        </p>
        <button type="submit">Répondre</button>
      </div>
    </div>
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
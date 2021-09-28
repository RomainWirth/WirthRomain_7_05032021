<template>
  <div class="topic">
    <div class="topic__title">
      <h3 class="topic__title--title">{{ topic_contents.tmTitle }}Topic 1</h3>
      <p class="topic__title--content">{{ topic_contents.tmContent }}
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries, but also the leap into electronic typesetting, 
        remaining essentially unchanged.
      </p>
      <div class="topic__title--details">
        <p>{{ topic_contents.tmUserId }}abcdefghijklmnopqrstuvwxyz</p>
        <p>{{ topic_contents.tmPostingDate }}10/10/2010 00:00:00</p>
        <button type="submit">Modifier</button>
      </div>
      <div class="topic__title--modify">
        <textarea name="réponse" id="" cols="120" rows="5" placeholder="répondez ici" maxlength="600" v-model="tmContent"></textarea>            
        <button type="submit">Valider</button>
      </div>
    </div>
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
      <button type="submit">répondre</button>
      <textarea class="topic__anwser-area--field" name="réponse" id="" cols="120" rows="5" placeholder="répondez ici" maxlength="600"></textarea>
      <input type="hidden" value="" name="tm_parent"> <!-- value = id du poste parent -->
      <input type="hidden" value="" name="tm_titre"> <!-- value = même titre que parent -->
      <input type="hidden" value="" name="tm_user_id"> <!-- value = id de l'usager identifié -->
      <div class="topic__anwser-area--button">
        <div>
          <button type="submit">Ajouter un fichier</button>
          <p>Aucun fichier</p>
        </div>
        <button type="submit">Valider</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'topic',
  data() {
    return {
      topic_contents: {
        tmId: "",
        tmIdParent: "",        
        tmTitle: "",
        tmContent: "",
        tmPostingDate: "",
        tmUserId: "",
        tmPictureUrl: "",        
        tmModeration: ""
      }
    }
  },
  methods: {
    displayMessage() {
      axios.get("http://localhost:/5000/topic_messages")
        .then(response => (
          this.tmId = response.tm_id,
          this.tmTitle = response.topic_messages.tm_title,
          this.tmContent = response.topic_messages.tm_content,
          this.tmPostingDate = response.topic_messages.tm_posting_date,
          this.tmUserId = response.topic_messages.tm_user_id
        ))
        .catch(error => console.log(error))
    },
  }
}
</script>

<style lang="scss"></style>
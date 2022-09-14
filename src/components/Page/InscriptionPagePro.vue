<template>
  <div class="pro-form">
    <Transition name="fade" mode="out-in">
      <div v-if="docState === '1'" > 
        Comment se nomme la ville/village que vous représenté ?
        <input v-model="city" placeholder="ex: Nancy"/>
        Quel est le code postal ?
        <input v-model="postalcode" placeholder="ex: 54000"/>
        Quel est le nombre d'habitant ?
        <input v-model="citizenNumber" placeholder="ex: 10 000"/>
      </div>
      <div v-else-if="docState === '2'">
        Quel adresse mail voulez-vous utiliser ?
        <input v-model="email"   placeholder="ex: Nancy@nancy.fr"/>
        Quel mot de passe voulez-vous utiliser ?
        <input v-model="mdp" placeholder="°°°°°"/>
        Confirmer votre mot de passe ?
        <input v-model="mdpconfirm" placeholder="°°°°°"/>
      </div>
      <div v-else-if="docState === '3'">
        Sélectionner un document d'authentification prouvant que vous représentez bien une mairie associée à une ville ou à un village,
        <select  v-model="selected">
          <option>Document 1</option>
          <option>Document 2</option>
        </select>
      </div>
      <div v-else-if="docState === '4'">
        Termine
      </div>
    </Transition>
  </div>
  <button v-if="docState === '1'" @click="docState = '2'">Suivant</button>
  <button v-if="docState === '2'" @click="docState = '3'">Suivant</button>
  <button v-if="docState === '3'" @click="docState = '4'">Suivant</button>
  <br>
  
</template>
<script setup>
  import { ref } from 'vue'; 
  
  const docState = ref('1');
  
</script>

<script>
  export default {
    data() {
      return {
        city: '',
        postalcode: '',
        citizenNumber: '',
        email: '',
        name: '',
        mdp: '',
        mdpconfirm: '',
        document: '',
      }
    }
  }
</script>

<style>

button {
    background: white;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: black;
    border-radius: 200px;
    border: 2px solid rgb(192, 150, 40);
  }

#pro-form {
  text-align: center; 
  align-items: center;
}

input {
  width: 20%; 
  text-align: center; 
  align-items: center; 
  margin-left: 40%;
  /* background-color: red; */
}

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
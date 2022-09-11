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
  

<template>
<div>
    <Transition name="fade" mode="out-in">
      <div v-if="docState === '1'" style="text-align: center; align-items: center;"> 
        Comment se nomme la ville/village que vous représenté ?
        <input v-model="city"  style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" placeholder="ex: Nancy"/>
        Quel est le code postal ?
        <input v-model="postalcode"  style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" placeholder="ex: 54000"/>
        Quel est le nombre d'habitant ?
        <input v-model="citizenNumber"  style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" placeholder="ex: 10 000"/>
      </div>
      <div v-else-if="docState === '2'" style="text-align: center;">
        Quel adresse mail voulez-vous utiliser ?
        <input v-model="mdp"  style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" placeholder="ex: Nancy@nancy.fr"/>
        Quel mot de passe voulez-vous utiliser ?
        <input v-model="mdp"  style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" placeholder="°°°°°"/>
        Confirmer votre mot de passe ?
        <input v-model="mdpconfirm"  style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" placeholder="°°°°°"/>
      </div>
      <div v-else-if="docState === '3'" style="text-align: center;">
        Selectionner un document d'authentification prouvant que vous représentez bien une mairie associé à une ville ou à un village,
        <select style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" v-model="selected">
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

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
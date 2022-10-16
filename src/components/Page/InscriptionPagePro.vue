<template>
  <div class="pro-form">
    <Transition name="fade" mode="out-in">
      <div v-if="docState === 1" class="buttonProForm"> 
        Comment se nomme la ville/village que vous représenté ?
        <input v-model="city" placeholder="ex: Everywhere" class="textProForm"/>
        Quel est le code postal ?
        <input v-model="postalCode" placeholder="ex: 54000" class="textProForm"/>
        Quel est le nombre d'habitant ?
        <input v-model="citizenNumber" placeholder="ex: 10 000" class="textProForm"/>
      </div>
      <div v-else-if="docState === 2" class="buttonProForm">
        Quel adresse mail voulez-vous utiliser ?
        <input v-model="email"   placeholder="ex: Nancy@nancy.fr"/>
        Quel mot de passe voulez-vous utiliser ?
        <input v-model="mdp" placeholder="°°°°°"/>
        Confirmer votre mot de passe ?
        <input v-model="mdpConfirm" placeholder="°°°°°"/>
      </div>
      <div v-else-if="docState === 3" class="buttonProForm">
        Sélectionner un document d'authentification prouvant que vous représentez bien une mairie associée à une ville ou à un village,
        <select  v-model="selected">
          <option>Document 1</option>
          <option>Document 2</option>
        </select>
      </div>
      <div v-else-if="docState === 4" class="buttonProForm">
        Termine
      </div>
    </Transition>
  </div>

  <div>
    <button v-if="docState === 1" @click="docState = 2">Suivant</button>
    <button v-if="docState === 2" @click="docState = 3">Suivant</button>
    <button v-if="docState === 3" @click="docState = 4">Suivant</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        docState: 1,
        city: '',
        postalCode: '',
        citizenNumber: '',
        email: '',
        name: '',
        mdp: '',
        mdpConfirm: '',
        documentSent: '',
      }
    }
  }
</script>

<style>

.pro-form {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border: 2px solid rgb(192, 150, 40);
  border-radius: 200px;
  background-color: var(--background-color-primary);
}

.pro-form button {
    display: flex; 
    flex-direction: column;
    text-align: center; 
    align-items: center;
    background: white;
    margin: 10px auto;
    border: 0;
    color: black;
    background-color: var(--background-color-secondary);
    color: var(--text-primary-color);
    border: 2px solid rgb(192, 150, 40);
    border-radius: 20px;
}

.pro-form div {
    color: var(--text-primary-color);
    background-color: var(--background-color-secondary);
    border-radius: 10px;
    margin: 10px auto;
}

.buttonProForm {
  display: flex;
  flex-direction: column;
  text-align: center; 
  align-items: center;
  background: white;
  margin: 20px auto;
  border: 0;
  margin-top: 20px;
  color: black;
}

.textProForm {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
}

.input {
width: 20%; 
text-align: center; 
align-items: center; 
margin-left: 40%;
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
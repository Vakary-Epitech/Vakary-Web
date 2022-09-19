<template>
<div class="button-page-standard">
  <Transition name="fade" mode="out-in">
      <div v-if="docState === 1" style="text-align: center; align-items: center;"> 
        Quel nom d'utilisateur voulez-vous utiliser?
        <input v-model="name"  style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" placeholder="Nom utilisateur"/>
        Quel mail voulez-vous utiliser ?
        <input v-model="email"  style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" placeholder="Mail"/>
      </div>
      <div v-else-if="docState === 2" style="text-align: center;">
        Quel mot de passe voulez-vous utiliser ?
        <input v-model="mdp"  style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" placeholder="°°°°°"/>
        Confirmer votre mot de passe ?
        <input v-model="mdpconfirm"  style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" placeholder="°°°°°"/>
      </div>
      <div v-else-if="docState === 3" style="text-align: center;">
        Repondez a la question de votre choix
        <select style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" v-model="selected">
          <option disabled value="">Please select one</option>
          <option>Quel est le nom de votre animal de compagnie ?</option>
          <option>Quel est le nom de votre mère ?</option>
          <option>Quel est la marque de votre première voiture ?</option>
        </select>
        Quel est votre reponse ?
        <input v-model="answerquestion"  style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" placeholder="ex: Popy"/>
      </div>
      <div v-else-if="docState === '4'">
        Termine
      </div>
      </Transition>
    </div>
  <button v-if="docState === 1" @click="docState = 2">Suivant</button>
  <button v-if="docState === 2" @click="docState = 3">Suivant</button>
  <button v-if="docState === 3" @click="docState = 4">Suivant</button>
  <br>

</template>

<script>
  export default {
    data() {
      return {
        docState: 1,
        name: '',
        email: '',
        mdp: '',
        mdpconfirm: '',
        message: '',
        selectedquestion: '',
        answerquestion: '',
      }
    }
  }
</script>


<style>

.button-page-standard {
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
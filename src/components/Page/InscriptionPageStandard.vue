<template>
  <div class="button-page-standard">
    <Transition name="fade" mode="out-in">
      <div v-if="docState === 1" class="bubbleInscriptionStandard"> 
        Quel nom d'utilisateur voulez-vous utiliser?
        <input v-model="name" placeholder="ex: Didier"/>
        Quel mail voulez-vous utiliser ?
        <input v-model="email" placeholder="ex: toto@gmail.com"/>
      </div>
      <div v-else-if="docState === 2" class="bubbleInscriptionStandard">
        Quel mot de passe voulez-vous utiliser ?
        <input v-model="mdp" class=" inputInscriptionPageStandard" placeholder="°°°°°"/>
        Confirmer votre mot de passe ?
        <input v-model="mdpConfirm" placeholder="°°°°°"/>
      </div>
      <div v-else-if="docState === 3" class="bubbleInscriptionStandard">
        Repondez a la question de votre choix
        <select  r v-model="selectedQuestion">
          <option disabled value="">Please select one</option>
          <option>Quel est le nom de votre animal de compagnie ?</option>
          <option>Quel est le nom de votre mère ?</option>
          <option>Quel est la marque de votre première voiture ?</option>
        </select>
        Quel est votre reponse ?
        <input v-model="answerQuestion" placeholder="ex: Popy"/>
      </div>
      <div v-else-if="docState === '4'">
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
        name: '',
        email: '',
        mdp: '',
        mdpConfirm: '',
        message: '',
        selectedQuestion: '',
        answerQuestion: '',
      }
    }
  }
</script>


<style scoped>

.bubbleInscriptionStandard {
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

.inputInscriptionPageStandard {
  width: 20%; 
  text-align: center; 
  align-items: center; 
  margin-left: 40%;
}

.button-page-standard {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border: 2px solid rgb(192, 150, 40);
  border-radius: 200px;
}

.button-page-standard button {
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

.button-page-standard div {
    color: var(--text-primary-color);
    background-color: var(--background-color-secondary);
    border-radius: 10px;
    margin: 10px auto;
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
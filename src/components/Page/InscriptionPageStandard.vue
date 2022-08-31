  <script setup>
  import { ref } from 'vue'; 
  
  const docState = ref('1');
  
</script>

<script>
  export default {
    data() {
      return {
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
  

<template>
	<!-- <button @click="show = !show">Toggle Slide + Fade</button>
  <Transition name="slide-fade">
    <p v-if="show">hello</p>
  </Transition>
  <Transition name="slide-fade">
    <p v-if="!show">karimbenzema</p>
  </Transition>

  <div>Inscription</div>
  <button v-if="!pro" v-on:click="pro = false" style="background: #959595"> Connexion Standard</button>
  <button v-if="!pro" v-on:click="pro = true"> Connexion Professionelle</button>
  <button v-if="pro" v-on:click="pro = false" > Connexion Standard</button>
  <button v-if="pro" v-on:click="pro = true"  style="background: #959595"> Connexion Professionelle</button>
  
  <br>
  <form v-show="pro">
    <div style="text-align: center;">Cet espace est destiner est reserves aux professionelles qui souhaitent nous rejoindre pour optimiser au mieux l'expérience de nos utilisateurs. </div>
  </form>

  <form v-show="!pro">
    <div style="text-align: center;">Commencer à decouvrir des maintenant et sans limite !</div>
  </form> -->

  <!-- <div v-if="docState === 'saved'" style="text-align: center;">Cet espace est destiner est reserves aux professionelles qui souhaitent nous rejoindre pour optimiser au mieux l'expérience de nos utilisateurs. </div> -->
  <div class="btn-container">
    <Transition name="slide-right">
      <div v-if="docState === '1'" style="text-align: center; align-items: center;"> 
        Quel nom d'utilisateur voulez-vous utiliser?
        <input v-model="name"  style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" placeholder="Nom utilisateur"/>
        Quel mail voulez-vous utiliser ?
        <input v-model="email"  style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" placeholder="Mail"/>
      </div>
      <div v-else-if="docState === '2'" style="text-align: center;">
        Quel mot de passe voulez-vous utiliser ?
        <input v-model="mdp"  style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" placeholder="°°°°°"/>
        Confirmer votre mot de passe ?
        <input v-model="mdpconfirm"  style="width: 20%; text-align: center; align-items: center; margin-left: 40%;" placeholder="°°°°°"/>
      </div>
      <div v-else-if="docState === '3'" style="text-align: center;">
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
      <!-- <button v-else-if="docState === 'saved'"
        @click="docState = 'edited'">Suivant</button> 
        <button v-else-if="docState === 'edited'"
        @click="docState = 'editing'">Save</button>
        <button v-else-if="docState === 'editing'"
        @click="docState = 'saved'">Cancel</button> -->
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

.slide-right-enter-active{
  transition: 1s ease-in;
}
.slide-right-leave-active {
  transition: 1s ease-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(400px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-400px);
} 
  /* .slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
  form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
  }
  label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    letter-spacing: 1px;
    font-weight: bold;
  }
  input, select {
    background-color: withe;;
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    border-radius: 200px;
    border: 2px solid rgb(192, 150, 40);
    color: #959595;
  }
  input[type="checkbox"] {
    display: inline-block;
    width: 16px;
    margin: 0 10px 0 0;
    position: relative;
    top: 2px;
  }
  .pill {
    display: inline-block;
    margin: 20px 10px 0 0;
    padding: 6px 12px;
    background: #eee;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #777;
    cursor: pointer;
  }
  button {
    background: white;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: black;
    border-radius: 200px;
    border: 2px solid rgb(192, 150, 40);
  }
  .submit {
    text-align: center;
  }
  .error {
    color: #ff0062;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
  } */
</style>
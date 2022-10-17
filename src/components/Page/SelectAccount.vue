<template>
  <div class="selectAccount">
    <span>Inscription</span>
    <button v-if="goNextFormButtonState === 1" class="buttonSelectAccount">Connexion Standard</button>
    <button v-if="goNextFormButtonState === 1" @click="goNextFormButtonState = 2">Connexion Professionelle</button>

    <button v-if="goNextFormButtonState === 2" @click="goNextFormButtonState = 1">Connexion Standard</button>
    <button v-if="goNextFormButtonState === 2"  class="buttonSelectAccount">Connexion Professionelle</button>

    <div v-if="goNextFormButtonState === 1" class="profileImageDisplay"> 
      <img src="../../assets/StandardProfilePhoto.png">
      <span>
        Commencer à decouvrir des maintenant sans limite !
      </span>
      <button @click="(openInscriptionPageStandard)">Créer mon compte</button>
    </div>

    <div v-if="goNextFormButtonState === 2" class="profileImageDisplay"> 
      <img class="profileImageDisplay" src="../../assets/ProProfilePhoto.png">
        <span>
          Cet espace est destiner au professionel qui souhaite nous rejoindre pour optimiser au mieux l'expérience de nos utilisateurs.
        </span>
        <button @click="(openInscriptionPagePro)">Créer mon compte</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        goNextFormButtonState: 1,
    }
  },
  methods: {
    openInscriptionPageStandard() {
      this.$router.push("/inscriptionPageStandard");
    },
    openInscriptionPagePro() {
      this.$router.push("/inscriptionPagePro");
    },
  },
}
</script>
  
<style>

.profileImageDisplay {
  align-items: center; 
  text-align: center;
}

.buttonSelectAccount {
  background: #959595;
}

.selectAccount {
  background-color: var(--background-color-primary);
}

.selectAccount button{
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

.selectAccount span {
  color: var(--text-primary-color);
}

</style>
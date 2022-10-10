<template>
  <div>
    <span>Inscription</span>
    <button v-if="goNextFormButtonState === 1" class="buttonSelectAccount">Connexion Standard</button>
    <button v-if="goNextFormButtonState === 1" @click="goNextFormButtonState = 2">Connexion Professionelle</button>

    <button v-if="goNextFormButtonState === 2" @click="goNextFormButtonState = 1">Connexion Standard</button>
    <button v-if="goNextFormButtonState === 2"  class="buttonSelectAccount">Connexion Professionelle</button>

    <div v-if="goNextFormButtonState === 1" class="profileImageDisplay"> 
      <img src="../../assets/StandardProfilePhoto.png">
      Commencer à decouvrir des maintenant sans limite !
      <button @click="(openInscriptionPageStandard)">Créer mon compte</button>
    </div>

    <div v-if="goNextFormButtonState === 2" class="profileImageDisplay"> 
      <img class="profileImageDisplay" src="../../assets/ProProfilePhoto.png">
        Cet espace est destiner au professionel qui souhaite nous rejoindre pour optimiser au mieux l'expérience de nos utilisateurs.
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

</style>
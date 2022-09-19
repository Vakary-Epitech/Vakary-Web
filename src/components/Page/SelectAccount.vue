<template>
  <div>
    <span>Inscription</span><br>
    <button v-if="buttonState === 1" style="background: #959595">Connexion Standard</button>
    <button v-if="buttonState === 1" @click="buttonState = 2">Connexion Professionelle</button>

    <button v-if="buttonState === 2" @click="buttonState = 1">Connexion Standard</button>
    <button v-if="buttonState === 2"  style="background: #959595">Connexion Professionelle</button>

    <div v-if="buttonState === 1" style="text-align: center; align-items: center;"> 
      <img src="../../assets/StandardProfilePhoto.png">
      <br>
      Commencer à decouvrir des maintenant sans limite !<br>
      <button @click="(openInscriptionPageStandard)">Créer mon compte</button>
    </div>

    <div v-if="buttonState === 2" style="text-align: center; align-items: center;"> 
      <img style="align-items: center" src="../../assets/ProProfilePhoto.png">
        <br>
        Cet espace est destiner au professionel qui souhaite nous rejoindre pour optimiser au mieux l'expérience de nos utilisateurs.<br>
        <button @click="(openInscriptionPagePro)">Créer mon compte</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        buttonState: 1,
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

/* button {
    background: white;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: black;
    border-radius: 200px;
    border: 2px solid rgb(192, 150, 40);
}

.slide-fade-enter-active {
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
 */
</style>